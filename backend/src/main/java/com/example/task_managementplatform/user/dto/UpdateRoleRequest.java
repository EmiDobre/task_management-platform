package com.example.task_managementplatform.user.dto;
import com.example.task_managementplatform.user.entity.Role;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.*;
@Getter
@Setter
public class UpdateRoleRequest {

    @NotNull(message = "Role is required")
    private Role role;
}
