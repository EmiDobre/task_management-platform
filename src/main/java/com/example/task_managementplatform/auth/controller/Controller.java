package com.example.task_managementplatform.auth.controller;

import com.example.task_managementplatform.auth.dto.LoginRequest;
import com.example.task_managementplatform.auth.dto.LoginResponse;
import com.example.task_managementplatform.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class Controller {
    private final AuthService authService;

    // logare: POST /api/auth/login
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return  authService.login(request);
    }
}
