package com.example.task_managementplatform.document.repository;

import com.example.task_managementplatform.document.entity.Document;
import com.example.task_managementplatform.project.entity.Project;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository
        extends JpaRepository<Document, Long> {

    List<Document> findByProject(Project project);

}