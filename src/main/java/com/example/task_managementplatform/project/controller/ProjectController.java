package com.example.task_managementplatform.project.controller;

import com.example.task_managementplatform.project.dto.CreateProjectRequest;
import com.example.task_managementplatform.project.entity.Project;
import com.example.task_managementplatform.project.service.ProjectService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")

@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    // 3.1. creare proiect: POST /api/projects
    @PostMapping
    public Project createProject( @RequestBody CreateProjectRequest request ) {

        return projectService.createProject(request);

    }

    // 3.2. listare proitecte: GET /api/projects
    @GetMapping
    public List<Project> getAllProjects() {

        return projectService.getAllProjects();

    }

}