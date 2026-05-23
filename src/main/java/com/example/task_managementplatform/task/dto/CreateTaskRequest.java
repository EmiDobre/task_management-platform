package com.example.task_managementplatform.task.dto;

import com.example.task_managementplatform.task.entity.TaskPriority;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Getter
@Setter
public class CreateTaskRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Priority is required")
    private TaskPriority priority;

    @NotNull(message = "Deadline is required")
    private LocalDateTime deadline;

    @NotNull(message = "Project id is required")
    private Long projectId;

}