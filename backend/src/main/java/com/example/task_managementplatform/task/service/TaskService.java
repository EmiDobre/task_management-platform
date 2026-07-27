package com.example.task_managementplatform.task.service;

import com.example.task_managementplatform.project.entity.Project;
import com.example.task_managementplatform.project.entity.ProjectStatus;
import com.example.task_managementplatform.project.repository.ProjectRepository;
import com.example.task_managementplatform.task.dto.AssignTaskRequest;
import com.example.task_managementplatform.task.dto.CreateTaskRequest;
import com.example.task_managementplatform.task.dto.UpdateTaskRequest;
import com.example.task_managementplatform.task.entity.Task;
import com.example.task_managementplatform.task.entity.TaskPriority;
import com.example.task_managementplatform.task.entity.TaskStatus;
import com.example.task_managementplatform.task.repository.TaskRepository;
import com.example.task_managementplatform.user.entity.User;
import com.example.task_managementplatform.user.repository.UserRepository;
import com.example.task_managementplatform.exception.*;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

@Slf4j
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
            throw new ForbiddenException("No authenticated user");
        }

        String email = context.getAuthentication().getName();

        return userRepository.findByEmail(email).orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

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
                        new ResourceNotFoundException("Project not found"));

        // proiect arhivat
        if(project.getStatus() == ProjectStatus.ARCHIVED) {
            throw new BadRequestException( "Cannot create tasks in archived projects");
        }

        // creatorul trebuie sa fie membru
        boolean member = isMember(project, creator);

        if(!member) {
            throw new ForbiddenException("You are not part of this project");
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
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        // user logat
        User currentUser = getCurrentUser();

        // proiect task
        Project project = task.getProject();

        // proiect arhivat
        if(project.getStatus() == ProjectStatus.ARCHIVED) {
            throw new BadRequestException("Archived projects cannot be modified");
        }

        // userul trebuie sa fie membru
        if(!isMember(project, currentUser)) {
            throw new ForbiddenException("You are not part of this project");
        }

        // creator task
        boolean isCreator = isCreator(task, currentUser);

        // assigned user
        boolean isAssignedUser = isAssignedUser(task, currentUser);

        // daca nu e nici creator nici assigned
        if(!isCreator && !isAssignedUser) {
            throw new ForbiddenException("You cannot modify this task");
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
                        new ResourceNotFoundException("Task not found"));

        // user logat
        User currentUser = getCurrentUser();

        // doar creatorul poate sterge
        if(!isCreator(task, currentUser)) {

            throw new ForbiddenException("Only the creator can delete this task");

        }

        //log important
        log.warn("Task deleted: {}", task.getTitle());
        taskRepository.delete(task);

    }

    //4.2 asignare task la userul cerut
    public Task assignUser(Long taskId, AssignTaskRequest request) {

        // cautam taskul
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Task not found"));

        // user logat
        User currentUser = getCurrentUser();

        // doar creatorul poate asigna
        if(!isCreator(task, currentUser)) {

            throw new ForbiddenException("Only creator can assign users");

        }

        // userul asignat
        User assignedUser = userRepository
                .findById(request.getUserId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        // userul asignat trebuie sa fie mai intai membru in proiect
        if(!isMember(task.getProject(), assignedUser)) {
            throw new ForbiddenException("User is not part of the project");
        }

        // asignam userul
        task.setAssignedUser(assignedUser);

        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);

    }

    //4.3 filtre taskuri
    public List<Task> getTasksByStatus(TaskStatus status) {

        return taskRepository.findByStatus(status);

    }

    public List<Task> getTasksByPriority(TaskPriority priority) {

        return taskRepository.findByPriority(priority);

    }
}