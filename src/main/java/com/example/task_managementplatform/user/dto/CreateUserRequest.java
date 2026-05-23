package com.example.task_managementplatform.user.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
/*DTO - doar variabile gettere settere pentru requestul de la client; folosit de controller */
@Getter
@Setter
public class CreateUserRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 4,
            message = "Password must have at least 4 characters")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullName;

}