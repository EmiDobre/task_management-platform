package com.example.task_managementplatform.user.service;

import com.example.task_managementplatform.user.dto.CreateUserRequest;
import com.example.task_managementplatform.user.entity.Role;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
@RequiredArgsConstructor

/* Service: transforma DTO in obiect Java - User (care va deveni mai tarziu tabelul din DB)
* - face bussiness logic: regsiter user etc
* - trece apoi in Layerul Repository unde obiectele vor fi transformate in tabele sql*/
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User createUser(CreateUserRequest request) {

        // verificam daca exista deja email-ul
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new RuntimeException("Email already exists");

        }

        // cream obiectul user
        User user = new User();

        user.setEmail(request.getEmail());

        // momentan salvam parola simplu
        // mai tarziu o criptam cu BCrypt
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setFullName(request.getFullName());

        // fiecare user nou are rol USER
        user.setRole(Role.USER);

        // salvam userul in baza de date
        return userRepository.save(user);

    }

    public User getCurrentUser(){
        //lucrez cu contextul salvat in Security Holder:
        SecurityContext context = SecurityContextHolder.getContext();
        if(context.getAuthentication() == null) {
            throw new RuntimeException("No authenticated user");
        }
        // userul il gasesc dupa mailul salvat in context
        String email = context.getAuthentication().getName();

        //cautare in baza de date dupa mail:
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}