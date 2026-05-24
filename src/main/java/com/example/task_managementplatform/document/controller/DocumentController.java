package com.example.task_managementplatform.document.controller;

import com.example.task_managementplatform.document.entity.Document;
import com.example.task_managementplatform.document.service.DocumentService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/documents")

@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    // upload: POST /api/documents/upload specificat cu form-data body request!
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public Document uploadDocument(

            @RequestParam("file")
            MultipartFile file,

            @RequestParam("projectId")
            Long projectId

    ) {

        return documentService.uploadDocument(
                file,
                projectId
        );

    }

    // listare documente proiect: GET /api/projects/{id}/documents
    @GetMapping("/project/{projectId}")
    public List<Document> getProjectDocuments(@PathVariable Long projectId) {

        return documentService
                .getProjectDocuments(projectId);

    }

    // stergere document: DELETE /api/documents/{id}
    @DeleteMapping("/{documentId}")
    public void deleteDocument(@PathVariable Long documentId) {

        documentService.deleteDocument(documentId);

    }

    //download document existent din minio prin acces db
    @GetMapping("/{documentId}/download")
    public byte[] downloadDocument(@PathVariable Long documentId) {

        return documentService.downloadDocument(documentId);

    }

}