package com.example.task_managementplatform.project.service;

import com.example.task_managementplatform.project.dto.AddMemberRequest;
import com.example.task_managementplatform.project.dto.CreateProjectRequest;
import com.example.task_managementplatform.project.dto.UpdateProjectRequest;
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

    //Metoode Helper:
    private User getCurrentUser() {

        // luam contextul de securitate
        SecurityContext context = SecurityContextHolder.getContext();

        // verificam autentificarea
        if(context.getAuthentication() == null) {
            throw new RuntimeException("No authenticated user");
        }

        // luam emailul userului logat
        String email = context.getAuthentication().getName();

        // cautam userul in baza de date
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

    }

    private boolean isOwner( Project project, User user) {

        return project.getOwner().getEmail().equals(user.getEmail());

    }

    private boolean isMember(Project project, User user) {

        return project.getMembers().stream().anyMatch(member ->
                        member.getEmail().equals(user.getEmail()));
    }

    //3.1. creare proiect
    public Project createProject( CreateProjectRequest request) {

        // cautam ownerul in baza de date
        User owner = getCurrentUser();

        //verificare daca proiectul deja exista:
        if(projectRepository.findByName(request.getName()).isPresent()) {
            throw new RuntimeException("Project name already exists");
        }


        // cream proiectul
        Project project = new Project();

        project.setName(request.getName());

        project.setDescription(request.getDescription());

        project.setCreatedAt(LocalDateTime.now());

        project.setOwner(owner);

        // ownerul devine automat membru
        project.setMembers(new ArrayList<>());
        project.getMembers().add(owner);

        project.setStatus(ProjectStatus.ACTIVE);

        return projectRepository.save(project);

    }

    //3.2: listare proiecte
    public List<Project> getAllProjects() {

        return projectRepository.findAll();

    }

    //3.3: adaugare membru in proiect doar daca userul logat este owner
    //      si doar daca proiectul nu este arhivat
    public Project addMember( Long projectId, AddMemberRequest request ) {

        // cautam proiectul
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        //stare proiect
        if(project.getStatus() == ProjectStatus.ARCHIVED) {
            throw new RuntimeException("Archived projects cannot be modified");
        }

        //userul logat
        User currentUser = getCurrentUser();

        //verificare user logat = owner
        if(!isOwner(project, currentUser)) {
            throw new RuntimeException("Only the project owner can add members");
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

    //3.4: dezactivare/soft delete proiect
    public Project deactivateProject(Long projectId) {

        // cautam proiectul
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        // luam userul logat
        User currentUser = getCurrentUser();

        //doar ownerul poate dezactiva
        if(!isOwner(project, currentUser)) {
            throw new RuntimeException("Only the project owner can archive project");
        }

        // soft delete
        project.setStatus(ProjectStatus.ARCHIVED);

        // salvam modificarile
        return projectRepository.save(project);

    }

    public Project updateProject( Long projectId, UpdateProjectRequest request) {

        // cautam proiectul
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        // stare proiect
        if(project.getStatus() == ProjectStatus.ARCHIVED) {
            throw new RuntimeException("Archived projects cannot be modified");
        }

        // user logat:
        User currentUser = getCurrentUser();

        // verificam daca este owner
        boolean owner = isOwner(project,currentUser);

        // verificam daca este membru
        boolean member = isMember(project, currentUser);

        // daca nu este nici owner nici membru
        if(!owner && !member) {
            throw new RuntimeException("You are not part of this project");
        }

        // doar ownerul poate modifica nume si descriere
        if(owner) {

            if(request.getName() != null) {
                project.setName(request.getName());
            }

            if(request.getDescription() != null) {
                project.setDescription(
                        request.getDescription()
                );
            }

        }

        // ownerul si membrii pot modifica statusul
        if(request.getStatus() != null) project.setStatus(request.getStatus());

        return projectRepository.save(project);

    }

}
