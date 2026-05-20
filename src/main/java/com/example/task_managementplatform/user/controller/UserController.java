package com.example.task_managementplatform.user.controller;

import com.example.task_managementplatform.user.dto.*;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.access.prepost.PreAuthorize;
import java.util.List;

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

    //2.3: ADMIN operatii - listare useri GET /api/users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {

        return userService.getAllUsers();

    }

    //2.3: ADMIN - update rol user: PUT /api/users/{id}/role
    @PutMapping("/{id}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUserRole(@PathVariable Long id, @RequestBody UpdateRoleRequest request){

        return userService.updateUserRole(id, request);

    }

    //2.3: ADMIN - dezactiveaza userul PUT /api/users/{id}/deactivate
    @PutMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public User deactivateUser( @PathVariable Long id) {

        return userService.deactivateUser(id);

    }

}