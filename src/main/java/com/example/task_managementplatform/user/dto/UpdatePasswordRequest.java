package com.example.task_managementplatform.user.dto;

import lombok.Getter;
import lombok.Setter;
//pt a putea schimba parola: confirm parola curenta
@Getter
@Setter
public class UpdatePasswordRequest {

    private String currentPassword;

    private String newPassword;

}
