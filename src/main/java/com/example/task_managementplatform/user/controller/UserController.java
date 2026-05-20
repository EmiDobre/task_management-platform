package com.example.task_managementplatform.user.controller;

import com.example.task_managementplatform.user.dto.CreateUserRequest;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor

/* Controllerul face requestul din JSON - DTO definit drept clasa si decide ce tip de actiune urmeaza */
public class UserController {

    private final UserService userService;

    //1. register: POST /api/users
    @PostMapping
    public User createUser(@RequestBody CreateUserRequest request) {

        return userService.createUser(request);

    }

    //2. view profil: GET  /api/users/me
    @GetMapping("/me")
    public User getCurrentUser(){
        return userService.getCurrentUser();
    }

}