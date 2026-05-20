package com.example.task_managementplatform.user.service;

import com.example.task_managementplatform.user.dto.CreateUserRequest;
import com.example.task_managementplatform.user.entity.Role;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;

//securitate:
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.context.SecurityContextHolder;

//user management:
import com.example.task_managementplatform.user.dto.UpdateProfileRequest;
import com.example.task_managementplatform.user.dto.UpdateEmailRequest;
import com.example.task_managementplatform.user.dto.UpdatePasswordRequest;

@Service
@RequiredArgsConstructor

/* Service: transforma DTO in obiect Java - User (care va deveni mai tarziu tabelul din DB)
* - face bussiness logic: regsiter user etc
* - trece apoi in Layerul Repository unde obiectele vor fi transformate in tabele sql*/
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    //1. register:
    public User createUser(CreateUserRequest request) {

        // verificam daca exista deja email-ul
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new RuntimeException("Email already exists");

        }

        // cream obiectul user
        User user = new User();

        user.setEmail(request.getEmail());

        // salvare parola encodata
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setFullName(request.getFullName());

        // fiecare user nou are rol USER daca nu e schimbat de admin
        // exista un admin default
        if(request.getEmail().equals("admin@test.com")) {

            user.setRole(Role.ADMIN);

        } else {

            user.setRole(Role.USER);

        }

        // salvam userul in baza de date
        return userRepository.save(user);

    }

    //2.1. view user curent
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

    //2.2.update date personale: nume
    public User updateProfile(UpdateProfileRequest request) {
        User user = getCurrentUser();
        user.setFullName(request.getFullName());
        return userRepository.save(user);
    }

    //2.2 update date personale: mail -> jwt nu va mai fi ok -> isi va da update
    public User updateEmail(UpdateEmailRequest request) {
        User user = getCurrentUser();

        //vf daca emailul exista deja: nu pot avea 2 useri diferiti cu acelasi mail
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {

            throw new RuntimeException("Email already exists");

        }
        user.setEmail(request.getEmail());
        return userRepository.save(user);
    }

    //2.2 update date personale: parola
    public User updatePassword(UpdatePasswordRequest request) {
        User user = getCurrentUser();

        // verificam parola curenta
        boolean matches = passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword()
        );

        if(!matches) {

            throw new RuntimeException("Current password is incorrect");

        }
        //TODO sterge - doar pt vf
        System.out.println(matches);
        System.out.println(user.getPassword());

        // hash-uim parola noua
        String encodedPassword = passwordEncoder
                .encode(request.getNewPassword());

        // actualizam parola
        user.setPassword(encodedPassword);

        // salvam modificarile
        return userRepository.save(user);
    }

}