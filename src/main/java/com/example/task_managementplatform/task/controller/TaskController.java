package com.example.task_managementplatform.task.controller;

import com.example.task_managementplatform.task.dto.AssignTaskRequest;
import com.example.task_managementplatform.task.dto.CreateTaskRequest;
import com.example.task_managementplatform.task.dto.UpdateTaskRequest;
import com.example.task_managementplatform.task.entity.Task;
import com.example.task_managementplatform.task.entity.TaskPriority;
import com.example.task_managementplatform.task.entity.TaskStatus;
import com.example.task_managementplatform.task.service.TaskService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")

@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    //4.1 creare POST /api/tasks
    @PostMapping
    public Task createTask(@RequestBody CreateTaskRequest request) {

        return taskService.createTask(request);

    }

    //4.1 editare POST /api/tasks/{id}
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody UpdateTaskRequest request) {

        return taskService.updateTask(id, request);

    }

    //4.1 stergere DELETE /api/tasks/{id task}
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

    }

    //4.2 asignare la user: PUT /api/tasks/{id task}/assign
    //id proiect e cunoscut deja la creare task
    @PutMapping("/{id}/assign")
    public Task assignUser(@PathVariable Long id, @RequestBody AssignTaskRequest request) {

        return taskService.assignUser(id, request);

    }

    //4.3 filtre GET /api/tasks/status/{status}
    @GetMapping("/status/{status}")
    public List<Task> getTasksByStatus(@PathVariable TaskStatus status) {

        return taskService.getTasksByStatus(status);

    }

    //4.3 GET /api/tasks/priority/{prioritate}
    @GetMapping("/priority/{priority}")
    public List<Task> getTasksByPriority(@PathVariable TaskPriority priority) {

        return taskService.getTasksByPriority(priority);

    }


}