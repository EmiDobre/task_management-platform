package com.example.task_managementplatform.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;


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

            // cream obiectul de autentificare
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            Collections.emptyList()
                    );

            // salvam userul in Spring Security Context - se stie cine e logat acum
            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authToken);

        }

        // continuam requestul
        filterChain.doFilter(request, response);

    }

}