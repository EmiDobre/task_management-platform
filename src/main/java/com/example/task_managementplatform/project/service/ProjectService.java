package com.example.task_managementplatform.project.service;

import com.example.task_managementplatform.project.dto.CreateProjectRequest;
import com.example.task_managementplatform.project.entity.Project;
import com.example.task_managementplatform.project.entity.ProjectStatus;
import com.example.task_managementplatform.project.repository.ProjectRepository;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public Project createProject( CreateProjectRequest request) {

        //verificare existenta autentificare:
        SecurityContext context = SecurityContextHolder.getContext();

        if(context.getAuthentication() == null) {

            throw new RuntimeException("No authenticated user");

        }

        // luam emailul userului logat
        String email = context.getAuthentication().getName();

        // cautam ownerul in baza de date
        User owner = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // cream proiectul
        Project project = new Project();

        project.setName(request.getName());

        project.setDescription(request.getDescription());

        project.setCreatedAt(LocalDateTime.now());

        // owner proiect
        project.setOwner(owner);

        // ownerul devine automat membru
        project.setMembers(new ArrayList<>());

        project.getMembers().add(owner);

        // status initial
        project.setStatus(ProjectStatus.ACTIVE);

        // salvam proiectul
        return projectRepository.save(project);

    }

}
