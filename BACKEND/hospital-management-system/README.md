# Hospital Management System API

This is the backend API for a Hospital Management System, built with Java and Spring Boot. It provides user authentication and management features, including registration with OTP verification and JWT-based authentication.

## Prerequisites

*   Java 21
*   Maven
*   PostgreSQL

## Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd hospital-management-system
    ```

2.  **Configure the database:**
    Open `src/main/resources/application.properties` and update the following properties with your PostgreSQL database details:
    ```properties
    spring.datasource.url=jdbc:postgresql://localhost:5432/hms
    spring.datasource.username=postgres
    spring.datasource.password=adnan
    ```

3.  **Configure email for OTP:**
    In the same `application.properties` file, configure your email account for sending OTPs. It is recommended to use a Gmail account with an "App Password".
    ```properties
    spring.mail.host=smtp.gmail.com
    spring.mail.port=587
    spring.mail.username=your-email@gmail.com
    spring.mail.password=your-app-password
    ```

4.  **Configure JWT Secret:**
    In `application.properties`, set a secret for JWT signing:
    ```properties
    jwt.secret=your-jwt-secret
    ```

5.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```
    The application will start on port 8000 (or the port configured in `application.properties`).

## Features

*   User registration with email and password.
*   OTP generation and sending to the user's email for account verification.
*   User login with email and password.
*   JWT (JSON Web Token) generation upon successful login and OTP verification.
*   Secure API endpoints that require a valid JWT for access.
*   User management (update, delete, get user details).

## API Endpoints

### Authentication

#### 1. Register User

*   **Method:** `POST`
*   **URL:** `/api/users/register`
*   **Description:** Registers a new user and sends an OTP to their email for verification.
*   **Request Body:**
    ```json
    {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123",
        "role": "USER"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "role": "USER",
        "token": null
    }
    ```
*   **Error Response (400 Bad Request):**
    ```
    "Email already exists"
    ```

#### 2. Verify OTP

*   **Method:** `POST`
*   **URL:** `/api/users/verify-otp`
*   **Description:** Verifies the OTP sent to the user's email and activates the user account.
*   **Request Params:**
    *   `email`: The user's email address.
    *   `otp`: The OTP received in the email.
*   **Success Response (200 OK):**
    ```json
    {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "role": "USER",
        "token": "jwt-token-here"
    }
    ```
*   **Error Response (400 Bad Request):**
    ```
    "Invalid OTP"
    ```

#### 3. Resend OTP

*   **Method:** `POST`
*   **URL:** `/api/users/resend-otp`
*   **Description:** Resends the OTP to the user's email address.
*   **Request Params:**
    *   `email`: The user's email address.
*   **Success Response (200 OK):**
    ```
    "OTP resent successfully"
    ```
*   **Error Response (400 Bad Request):**
    ```
    "User not found"
    ```

#### 4. Login User

*   **Method:** `POST`
*   **URL:** `/api/users/login`
*   **Description:** Authenticates a user and returns a JWT.
*   **Request Body:**
    ```json
    {
        "email": "test@example.com",
        "password": "password123"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "role": "USER",
        "token": "jwt-token-here"
    }
    ```
*   **Error Response (401 Unauthorized):**
    ```
    "Invalid credentials"
    ```

### User Management

*All user management endpoints require a valid JWT in the `Authorization` header as a Bearer token.*

#### 5. Get All Users

*   **Method:** `GET`
*   **URL:** `/api/users`
*   **Description:** Retrieves a list of all users.
*   **Success Response (200 OK):**
    ```json
    [
        {
            "id": 1,
            "username": "testuser",
            "email": "test@example.com",
            "role": "USER",
            "token": null
        }
    ]
    ```

#### 6. Get User by ID

*   **Method:** `GET`
*   **URL:** `/api/users/{id}`
*   **Description:** Retrieves a single user by their ID.
*   **Success Response (200 OK):**
    ```json
    {
        "id": 1,
        "username": "testuser",
        "email": "test@example.com",
        "role": "USER",
        "token": null
    }
    ```
*   **Error Response (404 Not Found):** If the user with the given ID is not found.

#### 7. Update User

*   **Method:** `PUT`
*   **URL:** `/api/users/{id}`
*   **Description:** Updates a user's information.
*   **Request Body:**
    ```json
    {
        "username": "updateduser",
        "email": "updated@example.com",
        "password": "newpassword123",
        "role": "ADMIN"
    }
    ```
*   **Success Response (200 OK):**
    ```json
    {
        "id": 1,
        "username": "updateduser",
        "email": "updated@example.com",
        "role": "ADMIN",
        "token": null
    }
    ```
*   **Error Response (404 Not Found):** If the user with the given ID is not found.

#### 8. Delete User

*   **Method:** `DELETE`
*   **URL:** `/api/users/{id}`
*   **Description:** Deletes a user by their ID.
*   **Success Response (204 No Content):**
*   **Error Response (404 Not Found):** If the user with the given ID is not found.
