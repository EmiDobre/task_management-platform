package com.example.task_managementplatform.user.dto;

import lombok.Getter;
import lombok.Setter;
/*DTO - doar variabile gettere settere pentru requestul de la client; folosit de controller */
@Getter
@Setter
public class CreateUserRequest {

    private String email;

    private String password;

    private String fullName;

}