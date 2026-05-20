package com.example.task_managementplatform.user.dto;
import com.example.task_managementplatform.user.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateRoleRequest {
    private Role role;
}
