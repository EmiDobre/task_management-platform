package com.example.task_managementplatform.project.repository;

import com.example.task_managementplatform.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

//Repository pentru entitatea Project unde Primary Key este Long - id ul
public interface ProjectRepository
        extends JpaRepository<Project, Long> {
    //am automat: save(proj),findById,findall si deletebyid
}