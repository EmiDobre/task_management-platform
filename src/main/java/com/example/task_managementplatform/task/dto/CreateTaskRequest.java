package com.example.task_managementplatform.task.dto;

import com.example.task_managementplatform.task.entity.TaskPriority;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateTaskRequest {

    private String title;

    private String description;

    private TaskPriority priority;

    private LocalDateTime deadline;

    private Long projectId;

}