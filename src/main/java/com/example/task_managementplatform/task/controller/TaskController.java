package com.example.task_managementplatform.task.controller;

import com.example.task_managementplatform.task.dto.CreateTaskRequest;
import com.example.task_managementplatform.task.dto.UpdateTaskRequest;
import com.example.task_managementplatform.task.entity.Task;
import com.example.task_managementplatform.task.service.TaskService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")

@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;


    @PostMapping //4.1 creare POST /api/tasks
    public Task createTask(@RequestBody CreateTaskRequest request) {

        return taskService.createTask(request);

    }

    @PutMapping("/{id}") //4.1 editare POST /api/tasks/{id}
    public Task updateTask(@PathVariable Long id, @RequestBody UpdateTaskRequest request) {

        return taskService.updateTask(id, request);

    }

    @DeleteMapping("/{id}") //4.1 stergere DELETE /api/tasks/{id}
    public void deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

    }

}