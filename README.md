# Task Manager Project

## Prerequisites
- **Java JDK 21+** (for Spring Boot)
- **Node.js** & **npm** (for React)
- **PostgreSQL** (Database)

## Backend Setup (Spring Boot)

1.  **Database Configuration**
    - Ensure PostgreSQL is running on port `5432`.
    - Create a database named `taskdb`.
    - Default credentials used in `application.properties`:
        - Username: `postgres`
        - Password: `password`
    - Update `backend/src/main/resources/application.properties` if your credentials differ.

2.  **Run Backend**
    - Open a terminal in the `backend` directory.
    - Run:
        ```bash
        mvn spring-boot:run
        ```
    - The server will start on `http://localhost:8080`.

## Frontend Setup (React + Vite)

1.  **Install Dependencies**
    - Open a terminal in the `frontend` directory.
    - Run:
        ```bash
        npm install
        ```

2.  **Run Frontend**
    - Start the development server:
        ```bash
        npm run dev
        ```
    - Access the application at the URL shown in the terminal (usually `http://localhost:5173`).
