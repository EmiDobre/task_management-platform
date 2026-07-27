package com.example.task_managementplatform.task.repository;

import com.example.task_managementplatform.task.entity.Task;
import com.example.task_managementplatform.task.entity.TaskPriority;
import com.example.task_managementplatform.task.entity.TaskStatus;

import com.example.task_managementplatform.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository
        extends JpaRepository<Task, Long> {

    // filtrare dupa status
    List<Task> findByStatus(TaskStatus status);

    // filtrare dupa prioritate
    List<Task> findByPriority(TaskPriority priority);

    //pentru a putea gasi dupa user:
    List<Task> findByAssignedUser(User user);

}