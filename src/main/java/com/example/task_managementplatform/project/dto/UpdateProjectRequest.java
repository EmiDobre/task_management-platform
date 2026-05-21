package com.example.task_managementplatform.project.dto;

import com.example.task_managementplatform.project.entity.ProjectStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProjectRequest {

    private String name;

    private String description;

    private ProjectStatus status;

}