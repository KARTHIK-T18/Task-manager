# Hands-on Coding Cheat Sheet

If an interviewer asks you to "write a quick API" or "create a component", use these simplified snippets based on your actual project.

## 1. Backend: The Spring Boot "Controller"
**Scenario:** "Write a REST API endpoint to get all tasks."

```java
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173") // Don't forget this!
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET /api/tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // POST /api/tasks
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }
}
```

## 2. Backend: The "Entity" (Data Model)
**Scenario:** "Define the Task data model."

```java
@Entity
@Data // Lombok: Generates getters, setters, toString
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private boolean completed;
    private LocalDate dueDate;
}
```

## 3. Backend: The "Service" (Logic)
**Scenario:** "Write the logic to toggle a task's completion status."

```java
@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public Task toggleTask(Long id) {
        Task task = taskRepository.findById(id).orElseThrow();
        task.setCompleted(!task.isCompleted()); // Flip the boolean
        return taskRepository.save(task);
    }
}
```

## 4. Frontend: The API Call (Axios)
**Scenario:** "How do you fetch data from the backend?"

```javascript
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

// 1. Get all tasks
export const fetchTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// 2. Create a task
export const createTask = async (taskData) => {
    const response = await axios.post(API_URL, taskData);
    return response.data;
};
```

## 5. Frontend: The React Component
**Scenario:** "Create a simple list to display tasks."

```jsx
import { useState, useEffect } from 'react';
import { fetchTasks } from './api'; // Assuming the function above

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const data = await fetchTasks();
        setTasks(data);
    };

    return (
        <div>
            <h2>My Tasks</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.completed ? "Done" : "Pending"}
                    </li>
                ))}
            </ul>
        </div>
    );
};
```
