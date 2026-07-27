# Task Management Platform

A backend REST API for managing users, projects, tasks and documents inside collaborative teams.

The application was built using Spring Boot and follows a layered backend architecture with JWT authentication, PostgreSQL persistence, MinIO object storage and Docker containerization.

The backend uses:
- Spring Boot for REST API development
- PostgreSQL for persistent data storage
- MinIO for object/file storage
- Docker & Docker Compose for infrastructure containerization
- Flyway for database migrations and schema versioning

The platform supports project collaboration, task assignment, document management and role-based authorization.


## 1. Features

- Authentication & Security
- User Management
- Project Management
- Task Management
- Document Management


## 2. Technologies Used

| Category | Technologies |
|---|---|
| Backend | Java 17, Spring Boot |
| Security | Spring Security, JWT Authentication |
| Persistence | Spring Data JPA, Hibernate, PostgreSQL |
| Database Versioning | Flyway |
| Storage | MinIO Object Storage |
| API | REST API, JSON Requests/Responses, HTTP Status Codes |
| DevOps / Infrastructure | Docker, Docker Compose, Gradle |


## 3. Design Decisions

- Layered backend architecture
- DTO-based request handling
- Separation of business logic
- Stateless JWT authentication
- External object storage using MinIO
- Validation using Jakarta Validation
- Global exception handling
- Database versioning with Flyway


## 4. Application Architecture

The application follows a layered backend architecture built around Spring Boot.

Every incoming HTTP request passes through multiple layers before reaching the database or object storage system.
```text
Client
   ↓
Tomcat Embedded Server
   ↓
Spring Security Filter Chain
   ↓
JWT Authentication Filter
   ↓
Controller Layer
   ↓
DTO Validation
   ↓
Service Layer
   ↓
Repository Layer
   ↓
PostgreSQL / MinIO
   ↓
HTTP Response
```


### <u>Tomcat Server</u>

The application runs on the embedded Tomcat server provided by Spring Boot.
Tomcat receives incoming HTTP requests and forwards them into the Spring application context.


### <u>Security Layer</u>

Before reaching the application logic, requests pass through the Spring Security filter chain.

A custom JWT authentication filter validates the JWT token from the Authorization header, extracts the authenticated user and stores the authentication inside the Spring Security Context.

Protected endpoints require authentication and role-based authorization.

### <u>Controller Layer</u>

Controllers expose REST API endpoints and handle HTTP requests/responses.

This layer acts as the entry point of the application and maps Postman/API requests to backend actions.

Controllers receive DTO objects from requests and forward them to the service layer.

### <u>DTO Layer</u>

DTOs (Data Transfer Objects) are used for request and response handling.

They separate the external API contract from the internal database entities and are also used for request validation.

### <u>Service Layer</u>

The service layer contains the business logic of the application.

This is where:
- permissions are verified
- entities are created or updated
- project/task/document logic is executed
- JWT/business validations are applied

### <u>Repository Layer</u>

Repositories communicate with PostgreSQL using Spring Data JPA and Hibernate.

This layer abstracts database operations and automatically generates SQL queries through JPA.

### <u>Database Layer</u>

PostgreSQL stores:
- users
- projects
- tasks
- document metadata

Flyway is used for database migrations and schema versioning.

### <u>Storage Layer</u>

Uploaded files are NOT stored directly inside PostgreSQL.

Files are uploaded into MinIO object storage while only their metadata is stored in the database.

The backend communicates with MinIO through the MinIO Java SDK.


## 5. Business Logic

### Authentication & Authorization

Users authenticate using JWT tokens.

After a successful login, the backend generates a signed JWT token that must be included in future requests through the Authorization header.

The application supports two roles:
- ADMIN
- USER

Spring Security and custom authorization checks protect restricted endpoints.

---

### User Management

Users can:
- register accounts
- authenticate
- update personal information
- view projects where they are members

Administrators can:
- list all users
- modify user roles
- deactivate users

---

### Project Management

Projects contain:
- owner
- members
- tasks
- uploaded documents
- status information

The application allows:
- project creation
- member management
- project updates
- project listing
- soft delete/deactivation

---

### Task Management

Tasks belong to projects and contain:
- title
- description
- priority
- status
- assigned user
- creator
- deadline
- timestamps

The application supports:
- task creation
- task editing
- task deletion
- task assignment
- filtering by priority/status

---

### Document Management

Documents are uploaded into project workspaces.

The backend stores:
- document metadata in PostgreSQL
- physical files inside MinIO

Supported operations:
- upload documents
- download documents
- list project documents
- delete documents

---

### Validation & Exception Handling

Request DTOs are validated using Jakarta Validation annotations.

The application uses a global exception handler to return consistent HTTP responses and status codes for:
- validation errors
- forbidden actions
- missing resources
- invalid requests

---

### Audit & Logging

The backend logs:
- authentication attempts
- critical delete operations
- document uploads/downloads
- infrastructure errors
  

## 6. Project Structure

```text
src/main/java/com/example/task_managementplatform
├── auth
│   ├── controller
│   ├── dto
│   └── service
│
├── config
│   └── MinioConfig
│
├── document
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── exception
│   ├── BadRequestException
│   ├── ForbiddenException
│   ├── ResourceNotFoundException
│   └── GlobalExceptionHandler
│
├── project
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── security
│   ├── JwtAuthenticationFilter
│   ├── JwtService
│   ├── PasswordConfig
│   └── SecurityConfig
│
├── task
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
├── user
│   ├── controller
│   ├── dto
│   ├── entity
│   ├── repository
│   └── service
│
└── web
```


## 7. Running the Application

####  1. Start Docker Containers

docker compose up -d

####  2. Run Spring Boot Application

Run:
TaskManagementPlatformApplication

####  3. Access MinIO Console

http://localhost:9001

Username:
minioadmin

Password:
minioadmin

## 8. API Endpoints

### Authentication

```http
POST http://localhost:8080/api/auth/login
→ Authenticate user and generate JWT token
```

---

### Users

```http
POST   http://localhost:8080/api/users
→ Register new user

GET    http://localhost:8080/api/users/me
→ View current user profile

PUT    http://localhost:8080/api/users/me/profile
→ Update profile information

PUT    http://localhost:8080/api/users/me/email
→ Update user email

PUT    http://localhost:8080/api/users/me/password
→ Update user password

GET    http://localhost:8080/api/users
→ List all users (ADMIN)

PUT    http://localhost:8080/api/users/{id}/role
→ Update user role (ADMIN)

PUT    http://localhost:8080/api/users/{id}/deactivate
→ Deactivate user (ADMIN)

PUT    http://localhost:8080/api/users/{id}/activate
→ Activate user (ADMIN)

GET    http://localhost:8080/api/users/me/projects
→ View user projects

GET    http://localhost:8080/api/users/me/tasks
→ View assigned tasks
```

---

### Projects

```http
POST   http://localhost:8080/api/projects
→ Create new project

GET    http://localhost:8080/api/projects
→ List all projects

PUT    http://localhost:8080/api/projects/{id}/members
→ Add member to project

PUT    http://localhost:8080/api/projects/{id}/deactivate
→ Deactivate project

PUT    http://localhost:8080/api/projects/{id}
→ Update project information
```

---

### Tasks

```http
POST   http://localhost:8080/api/tasks
→ Create new task

PUT    http://localhost:8080/api/tasks/{id}
→ Update task

DELETE http://localhost:8080/api/tasks/{id}
→ Delete task

PUT    http://localhost:8080/api/tasks/{id}/assign
→ Assign user to task

GET    http://localhost:8080/api/tasks/status/{status}
→ Filter tasks by status

GET    http://localhost:8080/api/tasks/priority/{priority}
→ Filter tasks by priority
```

---

### Documents

```http
POST   http://localhost:8080/api/documents/upload
→ Upload document into project

GET    http://localhost:8080/api/documents/project/{projectId}
→ List project documents

GET    http://localhost:8080/api/documents/{documentId}/download
→ Download document from MinIO

DELETE http://localhost:8080/api/documents/{documentId}
→ Delete document
```

## 9. Postman Collection

A Postman collection containing all API requests is included in the repository.


