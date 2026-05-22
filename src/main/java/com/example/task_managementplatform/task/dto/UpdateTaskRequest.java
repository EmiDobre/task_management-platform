package com.example.task_managementplatform.task.dto;

import com.example.task_managementplatform.task.entity.TaskPriority;
import com.example.task_managementplatform.task.entity.TaskStatus;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateTaskRequest {

    private String title;

    private String description;

    private TaskPriority priority;

    private TaskStatus status;

    private LocalDateTime deadline;

}