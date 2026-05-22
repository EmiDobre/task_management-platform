package com.example.task_managementplatform.task.entity;

import com.example.task_managementplatform.project.entity.Project;
import com.example.task_managementplatform.user.entity.User;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")

@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // titlu task
    private String title;

    // descriere task
    private String description;

    // prioritate
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    // status
    @Enumerated(EnumType.STRING)
    private TaskStatus status;

    // deadline
    private LocalDateTime deadline;

    // creator task
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    // user asignat
    @ManyToOne
    @JoinColumn(name = "assigned_user_id")
    private User assignedUser;

    // proiectul din care face parte
    @JsonIgnore //pt recursivitate
    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    // timestamps
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}