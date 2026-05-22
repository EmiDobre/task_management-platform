package com.example.task_managementplatform.task.service;

import com.example.task_managementplatform.project.entity.Project;
import com.example.task_managementplatform.project.entity.ProjectStatus;
import com.example.task_managementplatform.project.repository.ProjectRepository;
import com.example.task_managementplatform.task.dto.CreateTaskRequest;
import com.example.task_managementplatform.task.dto.UpdateTaskRequest;
import com.example.task_managementplatform.task.entity.Task;
import com.example.task_managementplatform.task.entity.TaskPriority;
import com.example.task_managementplatform.task.entity.TaskStatus;
import com.example.task_managementplatform.task.repository.TaskRepository;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    // helpere: userul logat
    private User getCurrentUser() {

        SecurityContext context = SecurityContextHolder.getContext();

        if(context.getAuthentication() == null) {
            throw new RuntimeException("No authenticated user");
        }

        String email = context.getAuthentication().getName();

        return userRepository.findByEmail(email).orElseThrow(() ->
                        new RuntimeException("User not found"));

    }

    private boolean isMember(Project project, User user) {

        return project.getMembers()
                .stream()
                .anyMatch(member ->
                        member.getEmail()
                                .equals(user.getEmail()));

    }

    private boolean isCreator(Task task, User user) {

        return task.getCreator()
                .getEmail()
                .equals(user.getEmail());

    }

    private boolean isAssignedUser(Task task, User user) {

        return task.getAssignedUser() != null
                &&
                task.getAssignedUser()
                        .getEmail()
                        .equals(user.getEmail());

    }

    //4.1 creare task
    public Task createTask(CreateTaskRequest request) {

        // user logat
        User creator = getCurrentUser();

        // cautam proiectul
        Project project = projectRepository
                .findById(request.getProjectId())
                .orElseThrow(() ->
                        new RuntimeException("Project not found"));

        // proiect arhivat
        if(project.getStatus() == ProjectStatus.ARCHIVED) {
            throw new RuntimeException( "Cannot create tasks in archived projects");
        }

        // creatorul trebuie sa fie membru
        boolean member = isMember(project, creator);

        if(!member) {
            throw new RuntimeException("You are not part of this project");
        }

        // creare task
        Task task = new Task();

        task.setTitle(request.getTitle());

        task.setDescription(request.getDescription());

        task.setPriority(request.getPriority());

        task.setDeadline(request.getDeadline());

        task.setProject(project);

        task.setCreator(creator);

        task.setStatus(TaskStatus.TODO);

        task.setCreatedAt(LocalDateTime.now());

        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);

    }

    //4.1 editare task/update
    public Task updateTask(Long taskId, UpdateTaskRequest request) {

        // cautam taskul
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task not found"
                        ));

        // user logat
        User currentUser = getCurrentUser();

        // proiect task
        Project project = task.getProject();

        // proiect arhivat
        if(project.getStatus() == ProjectStatus.ARCHIVED) {
            throw new RuntimeException("Archived projects cannot be modified");
        }

        // userul trebuie sa fie membru
        if(!isMember(project, currentUser)) {
            throw new RuntimeException("You are not part of this project");
        }

        // creator task
        boolean isCreator = isCreator(task, currentUser);

        // assigned user
        boolean isAssignedUser = isAssignedUser(task, currentUser);

        // daca nu e nici creator nici assigned
        if(!isCreator && !isAssignedUser) {
            throw new RuntimeException("You cannot modify this task");
        }

        // doar creatorul poate modifica
        // title/description/priority/deadline
        if(isCreator) {

            if(request.getTitle() != null) {

                task.setTitle(request.getTitle());

            }

            if(request.getDescription() != null) {

                task.setDescription(request.getDescription());

            }

            if(request.getPriority() != null) {

                task.setPriority(request.getPriority());

            }

            if(request.getDeadline() != null) {

                task.setDeadline(request.getDeadline());

            }

        }

        // assigned user poate modifica statusul
        if(isAssignedUser && request.getStatus() != null) {

            task.setStatus(request.getStatus());

        }

        // update timestamp
        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);

    }

    public void deleteTask(Long taskId) {

        // cautam taskul
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Task not found"
                        ));

        // user logat
        User currentUser = getCurrentUser();

        // doar creatorul poate sterge
        if(!isCreator(task, currentUser)) {

            throw new RuntimeException("Only the creator can delete this task");

        }

        taskRepository.delete(task);

    }
}