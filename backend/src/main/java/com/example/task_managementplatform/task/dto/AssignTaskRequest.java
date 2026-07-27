package com.example.task_managementplatform.task.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class AssignTaskRequest {

    @NotNull(message = "User id is required")
    private Long userId;

}