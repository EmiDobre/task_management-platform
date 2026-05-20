package com.example.task_managementplatform.user.dto;
import lombok.Getter;
import lombok.Setter;
// dto - obj java pt requestul json care vrea s amodifice numele userului curent logat
@Getter
@Setter
public class UpdateProfileRequest {
    private String fullName;
}
