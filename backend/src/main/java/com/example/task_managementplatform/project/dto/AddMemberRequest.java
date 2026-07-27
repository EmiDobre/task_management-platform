package com.example.task_managementplatform.project.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;

@Getter
@Setter
public class AddMemberRequest {

    @NotNull(message = "User id is required")
    private Long userId;

}