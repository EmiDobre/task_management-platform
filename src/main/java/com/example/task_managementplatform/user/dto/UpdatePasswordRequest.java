package com.example.task_managementplatform.user.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
//pt a putea schimba parola: confirm parola curenta
@Getter
@Setter
public class UpdatePasswordRequest {

    @NotBlank(message = "Old password is required")
    private String currentPassword;

    @NotBlank(message = "New password is required")
    @Size(min = 4,
            message = "Password must have at least 4 characters")
    private String newPassword;

}
