package com.example.task_managementplatform.document.service;

import com.example.task_managementplatform.document.entity.Document;
import com.example.task_managementplatform.document.repository.DocumentRepository;

import com.example.task_managementplatform.project.entity.Project;
import com.example.task_managementplatform.project.repository.ProjectRepository;

import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;

import com.example.task_managementplatform.exception.*;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import io.minio.GetObjectArgs;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final MinioClient minioClient;

    // helper: user logat
    private User getCurrentUser() {

        // luam contextul de securitate
        SecurityContext context = SecurityContextHolder.getContext();

        // verificam autentificarea
        if(context.getAuthentication() == null) {
            throw new ForbiddenException("No authenticated user");
        }

        // luam emailul userului logat
        String email = context.getAuthentication().getName();

        // cautam userul in baza de date
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    }

    // upload document
    public Document uploadDocument(MultipartFile file, Long projectId) {

        User owner = getCurrentUser();

        Project project = projectRepository
                .findById(projectId).orElseThrow(() ->
                        new ResourceNotFoundException("Project not found"));

        Document document = new Document();

        document.setName(file.getOriginalFilename());

        document.setType(file.getContentType());

        document.setSize(file.getSize());

        // cheie unica pt MinIO
        document.setObjectKey(
                UUID.randomUUID()
                        + "_"
                        + file.getOriginalFilename()
        );

        document.setUploadDate(LocalDateTime.now());

        document.setOwner(owner);

        document.setProject(project);

        //upload fisier real in MinIO
        try {

            minioClient.putObject(

                    PutObjectArgs.builder()

                            // bucket MinIO
                            .bucket("documents")

                            // nume unic fisier
                            .object(document.getObjectKey())

                            // fisier real
                            .stream(file.getInputStream(), file.getSize(), -1)

                            // content type
                            .contentType(file.getContentType())

                            .build()

            );

        } catch (Exception e) {

            log.error("Failed to upload file", e);
            throw new RuntimeException("Failed to upload file");

        }
        //logging:
        log.info("Document uploaded: {} by user {}", document.getName(), owner.getEmail());

        //salvare metadate in DB
        return documentRepository.save(document);

    }

    // listare toate documentele disponibile
    public List<Document> getProjectDocuments(Long projectId) {

        Project project = projectRepository
                .findById(projectId).orElseThrow(() ->
                        new ResourceNotFoundException("Project not found"));

        return documentRepository
                .findByProject(project);

    }

    // delete document
    public void deleteDocument(Long documentId) {

        Document document = documentRepository
                .findById(documentId).orElseThrow(() ->
                        new ResourceNotFoundException("Document not found"));

        //stergere fisier din minio:
        try {

            minioClient.removeObject(
                    RemoveObjectArgs.builder()
                            .bucket("documents")
                            .object(document.getObjectKey())
                            .build()
            );

        } catch (Exception e) {

            log.error("Failed to delete file", e);
            throw new RuntimeException("Failed to delete file");

        }
        //log important:
        log.warn("Document deleted: {}", document.getName());

        //stergere metadate DB
        documentRepository.delete(document);

    }

    // download DB->objectKey->minio->fisier real->bytes in response postman
    public byte[] downloadDocument(Long documentId) {

        Document document = documentRepository
                .findById(documentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Document not found")
                );

        try (

                var stream = minioClient.getObject(
                        GetObjectArgs.builder()
                                .bucket("documents")
                                .object(document.getObjectKey())
                                .build()
                )

        ) {

            //log important
            log.info("Document downloaded: {}", document.getName());
            return stream.readAllBytes();

        } catch (Exception e) {

            log.error("Failed to download file", e);
            throw new RuntimeException("Failed to download file");

        }

    }

}