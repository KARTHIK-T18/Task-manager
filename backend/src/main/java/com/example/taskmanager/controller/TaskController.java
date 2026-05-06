package com.example.taskmanager.controller;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite frontend
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        return taskService.updateTask(id, task);
    }

    @PatchMapping("/{id}/toggle")
    public Task toggleTask(@PathVariable Long id, @RequestParam(required = false) LocalDate date) {
        return taskService.toggleTaskCompletion(id, date);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        return taskService.getStats();
    }
}
