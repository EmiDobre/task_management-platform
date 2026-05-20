package com.example.task_managementplatform.user.controller;

import com.example.task_managementplatform.user.dto.CreateUserRequest;
import com.example.task_managementplatform.user.dto.UpdateEmailRequest;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import com.example.task_managementplatform.user.dto.UpdateProfileRequest;
import com.example.task_managementplatform.user.dto.UpdatePasswordRequest;

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

    //2.1. view profil: GET  /api/users/me
    @GetMapping("/me")
    public User getCurrentUser(){

        return userService.getCurrentUser();

    }

    //2.2. update nume: PUT /api/users/me/profile
    @PutMapping ("/me/profile")
    public User updateProfile(@RequestBody UpdateProfileRequest request) {

        return  userService.updateProfile(request);

    }

    //2.2 update mail: PUT /api/users/me/email
    @PutMapping("/me/email")
    public User updateEmail(@RequestBody UpdateEmailRequest request) {

        return userService.updateEmail(request);

    }

    //2.2 update parola: PUT /api/users/me/password
    @PutMapping("/me/password")
    public User updatePassword( @RequestBody UpdatePasswordRequest request) {

        return userService.updatePassword(request);

    }
}