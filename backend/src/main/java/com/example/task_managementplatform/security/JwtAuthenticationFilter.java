package com.example.task_managementplatform.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;

import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // luam headerul Authorization
        String authHeader = request.getHeader("Authorization");

        // daca nu exista Bearer token continuam requestul
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);

            return;

        }

        // extragem tokenul
        String jwt = authHeader.substring(7);

        // validam tokenul
        boolean valid = jwtService.isTokenValid(jwt);

        if (valid) {

            // extragem emailul din token
            String email = jwtService.extractEmail(jwt);
            //injectam userul din DB:
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // cream obiectul de autentificare:
            SimpleGrantedAuthority authority =
                    new SimpleGrantedAuthority(
                            "ROLE_" + user.getRole().name()
                    );

            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            List.of(authority)
                    );

            // marcam requestul ca autentificat
            authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                            .buildDetails(request)
            );

            // salvam userul in Spring Security Context - se stie cine e logat acum
            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authToken);

            //TODO sterge - doar pt verificare
            System.out.println("JWT VALID");
            System.out.println(email);

        }

        // continuam requestul
        filterChain.doFilter(request, response);

    }

}