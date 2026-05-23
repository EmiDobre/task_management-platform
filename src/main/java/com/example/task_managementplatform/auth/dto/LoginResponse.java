package com.example.task_managementplatform.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
//nu are nevoie de validare ca nu vine de la user

@Getter
@AllArgsConstructor
public class LoginResponse {

    private String token;

}