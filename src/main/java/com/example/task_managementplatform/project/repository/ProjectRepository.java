package com.example.task_managementplatform.project.repository;

import com.example.task_managementplatform.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

//Repository pentru entitatea Project unde Primary Key este Long - id ul
public interface ProjectRepository
        extends JpaRepository<Project, Long> {
    //am automat: save(proj),findById,findall si deletebyid
    Optional<Project> findByName(String name);
}