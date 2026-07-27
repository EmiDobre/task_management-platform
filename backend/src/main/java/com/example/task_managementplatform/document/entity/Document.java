package com.example.task_managementplatform.document.entity;

import com.example.task_managementplatform.project.entity.Project;
import com.example.task_managementplatform.user.entity.User;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")

@Getter
@Setter
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // numele fisierului
    private String name;

    // tip fisier
    private String type;

    // dimensiune
    private Long size;

    // cheia unica din MinIO
    private String objectKey;

    // data upload
    private LocalDateTime uploadDate;

    // owner document
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    // proiect
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

}