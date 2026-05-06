package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAllByOrderByDueDateAsc();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setDueDate(taskDetails.getDueDate());
        task.setCompleted(taskDetails.isCompleted());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public Task toggleTaskCompletion(Long id, LocalDate date) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));

        if (date == null) {
            date = LocalDate.now();
        }

        if (task.getCompletionHistory().contains(date)) {
            task.getCompletionHistory().remove(date);
        } else {
            task.getCompletionHistory().add(date);
        }

        // Update boolean for backward compatibility (true if completed today)
        task.setCompleted(task.getCompletionHistory().contains(LocalDate.now()));

        return taskRepository.save(task);
    }

    public Map<String, Object> getStats() {
        List<Task> allTasks = taskRepository.findAll();
        long total = allTasks.size();
        long completed = allTasks.stream().filter(Task::isCompleted).count();

        // Simple daily stats (tasks completed today)
        long completedToday = allTasks.stream()
                .filter(t -> t.isCompleted() && t.getDueDate() != null && t.getDueDate().equals(LocalDate.now()))
                .count(); // actually we should check completion date ideally, but for now using due date
                          // or we need a completedAt field.
        // Let's stick to simple "completed count" for now.

        Map<String, Object> stats = new HashMap<>();
        stats.put("total", total);
        stats.put("completed", completed);
        stats.put("pending", total - completed);

        return stats;
    }
}
