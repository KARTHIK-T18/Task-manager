# Task Manager Project - Interview Preparation Guide

This guide covers potential interview questions specific to your Full Stack Task Manager project (Spring Boot + React).

## 1. Project Overview (The "Elevator Pitch")
**Question:** "Tell me about this project."
**Answer:**
"I built a full-stack Task Management application designed to help users track daily tasks and visualize their productivity.
- **Backend:** Built with **Java 17** and **Spring Boot 3**, using **Spring Data JPA** for persistence and **PostgreSQL** as the database.
- **Frontend:** Developed with **React** (via **Vite**) for a fast, responsive UI, utilizing **Tailwind CSS** for styling and **Chart.js** for visualizing performance metrics.
- **Key Features:** It supports CRUD operations for tasks, a unique 'daily toggle' feature to track streaks, and provides statistical insights into completion rates over time."

---

## 2. Architecture & Tech Stack

**Q: Why did you choose Spring Boot over other Java frameworks?**
- **A:** Spring Boot simplifies configuration with its "convention over configuration" approach. Features like the embedded Tomcat server and starter dependencies (`spring-boot-starter-web`, `spring-boot-starter-data-jpa`) allowed me to focus on business logic rather than boilerplate setup.

**Q: Why did you use Vite instead of Create React App (CRA)?**
- **A:** Vite provides significantly faster build times and hot module replacement (HMR) compared to the Webpack-based CRA. It uses native ES modules during development, making the dev experience much smoother.

**Q: How do the Frontend and Backend communicate?**
- **A:** They communicate via RESTful APIs. I used **Axios** on the frontend to make HTTP requests (GET, POST, PUT, DELETE) to the Spring Boot backend running on port 8080.

**Q: Did you face any CORS (Cross-Origin Resource Sharing) issues?**
- **A:** Yes, since the frontend runs on port `5173` and the backend on `8080`, the browser blocks requests by default. I solved this by adding the `@CrossOrigin(origins = "http://localhost:5173")` annotation to my `TaskController` in Spring Boot to explicitly allow requests from the frontend.

---

## 3. Backend (Spring Boot & Java)

**Q: Explain the layered architecture in your backend.**
- **A:** I followed a standard 3-layer architecture:
  1.  **Controller Layer (`TaskController`):** Handles incoming HTTP requests and responses.
  2.  **Service Layer (`TaskService`):** Contains business logic (stats calculation, validation).
  3.  **Repository Layer (`TaskRepository`):** Extends `JpaRepository` to interact with the PostgreSQL database.

**Q: How are you handling the database entities?**
- **A:** I used the `@Entity` annotation on my `Task` class. I also used **Lombok** (`@Data`, `@NoArgsConstructor`) to automatically generate getters, setters, and constructors, keeping the code clean.

**Q: I see you have a `Set<LocalDate> completionHistory`. How is that stored in the database?**
- **A:** I used the `@ElementCollection` annotation. This tells JPA to create a separate side table (likely named `task_completion_history` or similar) to store the collection of dates related to the main Task table. It creates a one-to-many relationship managed entirely by JPA.

**Q: Why use `LocalDate` instead of `Date` or `LocalDateTime` for the due date?**
- **A:** `LocalDate` (from `java.time`) is best for calendar dates where time processing isn't needed (like a deadline). It avoids timezone confusion that often comes with the legacy `java.util.Date`.

---

## 4. Frontend (React)

**Q: How do you manage state in your React application?**
- **A:** I mainly use the `useState` hook for local component state (like the list of tasks or form inputs) and `useEffect` to trigger side effects, such as fetching data from the API when the component mounts.

**Q: Why use Axios instead of the built-in `fetch` API?**
- **A:** Axios provides a cleaner syntax, implementation of automatic JSON transformation, and better error handling out of the box. I also created a central `api.js` instance with a `baseURL`, which avoids hardcoding the server URL in every component.

**Q: How are the charts implemented?**
- **A:** I used `Chart.js` with the `react-chartjs-2` wrapper. The backend calculates the stats (e.g., completion percentage), sends the data via a `/stats` endpoint, and the frontend renders it into bar or line charts.

---

## 5. Database (PostgreSQL)

**Q: Why PostgreSQL?**
- **A:** It’s a robust, open-source object-relational database. It handles complex queries well and is highly reliable for production environments compared to lighter databases like MySQL or SQLite.

**Q: What happens if you delete a task? Does the history get deleted too?**
- **A:** Yes, because the `completionHistory` is an `@ElementCollection` owned by the `Task` entity, deleting the parent Task triggers a cascade delete, removing all associated records in the history table automatically.

---

## 6. Behavioral & Future Improvements

**Q: What was the most challenging part of this project?**
- **A:** *[Pick one based on your experience, for example:]* "Implementing the logic for the daily stats was tricky. I had to ensure that when a user toggles a task as 'done', it not only updates the boolean flag but also correctly adds or removes the current date from the history set to ensure the charts remain accurate."

**Q: If you had more time, what would you add?**
- **A:**
  1.  **Authentication:** Add Spring Security and JWT to allow multiple users to log in and have their own private task lists.
  2.  **Categories/Tags:** Allow tasks to be grouped by properties like 'Work', 'Personal', etc.
  3.  **Deployment:** Dockerize the application and deploy it to a cloud provider like AWS or Render.

---

## 7. Standard Infosys Interview Questions

These are commonly asked questions in Infosys interviews, categorized by topic.

### A. HR & Behavioral
*   **Tell me about yourself.** (Start with your name, background, technical skills, and mention this project as a key achievement).
*   **Why do you want to join Infosys?** (Mention their training program, global presence, or values).
*   **What satisfy you more, money or work?**
*   **What are your strengths and weaknesses?** (Be honest but frame weaknesses as areas you are actively improving).
*   **Are you willing to relocate or work in shifts?** (Usually expected to say Yes).
*   **Where do you see yourself in 5 years?**
*   **Who is the current CEO of Infosys?** (Salil Parekh - *verify this before interview*).

### B. General Technical (Freshers Focus)
*   **Four Pillars of OOPs:** Encapsulation, Abstraction, Inheritance, Polymorphism.
*   **C++ vs Java:** Pointers (C++ has them, Java doesn't explicitly), Multiple Inheritance (C++ supports, Java uses Interfaces), Platform Dependency (C++ is platform dependent, Java is independent).
*   **DBMS:**
    *   What is Normalization?
    *   Difference between `DELETE`, `TRUNCATE`, and `DROP`.
    *   SQL Joins (Inner, Left, Right, Full).
*   **SDLC:** Agile vs Waterfall model.

### C. Java Core (Mid-Level)
*   **Difference between `==` and `.equals()`?** (`==` checks reference, `.equals()` checks content).
*   **String vs StringBuilder vs StringBuffer.** (String is immutable; others are mutable. StringBuffer is synchronized/thread-safe).
*   **Collections Framework:** List vs Set vs Map. Difference between `ArrayList` and `LinkedList`.
*   **Exception Handling:** Checked vs Unchecked exceptions. `final` vs `finally` vs `finalize`.
*   **Multithreading:** Difference between `Thread` class and `Runnable` interface.

### D. Spring Boot (Project Related)
*   **What is Spring Boot and how is it different from Spring?** (Auto-configuration, Standalone).
*   **Explain `@SpringBootApplication`.** (Combines `@Configuration`, `@EnableAutoConfiguration`, `@ComponentScan`).
*   **What is Dependency Injection?**
*   **Difference between `@Controller` and `@RestController`.**
*   **How to handle properties/configuration?** (`application.properties` or `.yml`).

### E. React (Project Related)
*   **What is the Virtual DOM?**
*   **Lifecycle methods of a Component.** (Mounting, Updating, Unmounting).
*   **Difference between State and Props.**
*   **What are Hooks?** (Explain `useState`, `useEffect` as used in your project).
*   **What is JSX?**
