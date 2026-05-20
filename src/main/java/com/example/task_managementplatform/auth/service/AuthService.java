package com.example.task_managementplatform.auth.service;

import com.example.task_managementplatform.auth.dto.LoginRequest;
import com.example.task_managementplatform.auth.dto.LoginResponse;
import com.example.task_managementplatform.security.JwtService;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {

        // caut user dupa mail:
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        //userul se poate loga doar daca nu este dezactivat de admin
        if(!user.isActive()) {

            throw new RuntimeException("User is deactivated");

        }

        //verific hahs(parola request) = parola hashuita reala a userului
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {
            throw new RuntimeException("Invalid email or password");
        }

        //returnare token generat de jwt
        String token = jwtService.generateToken(user.getEmail());
        return new LoginResponse(token);

    }
}
