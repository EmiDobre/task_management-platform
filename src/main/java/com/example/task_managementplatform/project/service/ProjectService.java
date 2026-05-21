package com.example.task_managementplatform.project.service;

import com.example.task_managementplatform.project.dto.AddMemberRequest;
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
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    //3.1. creare proiect
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

        //verificare daca proiectul deja exista:
        if(projectRepository.findByName(request.getName()).isPresent()) {

            throw new RuntimeException("Project name already exists");

        }

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

    //3.2: listare proiecte
    public List<Project> getAllProjects() {

        return projectRepository.findAll();

    }

    //3.3: adaugare membru in proiect doar daca userul logat este owner
    public Project addMember( Long projectId, AddMemberRequest request ) {

        // cautam proiectul
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        //cautam owner proiect si verific daca e logat
        SecurityContext context = SecurityContextHolder.getContext();
        if(context.getAuthentication() == null) {
            throw new RuntimeException("No authenticated user");
        }

        String email = context.getAuthentication().getName();
        if(!project.getOwner().getEmail().equals(email)) {

            throw new RuntimeException(
                    "Only the project owner can add members"
            );

        }

        // cautam userul de pus in proiect
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // adaugam membrul
        project.getMembers().add(user);

        // salvam modificarile
        return projectRepository.save(project);

    }

}
