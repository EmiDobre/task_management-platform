package com.example.task_managementplatform.user.dto;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
// dto - obj java pt requestul json care vrea s amodifice numele userului curent logat
@Getter
@Setter
public class UpdateEmailRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

}
