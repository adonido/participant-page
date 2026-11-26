# Participant Bank Management System

A web-based Participant Bank Management System built with Angular 22 and Spring Boot. The application provides participant bank management, authentication, and logo upload capabilities.

## Features

- **Authentication:** Login using the backend authentication API and Keycloak JWT access tokens.
- **Protected Routes:** Angular authentication guard protects participant pages.
- **Participant Management:** Register, view, edit, and delete participants.
- **Logo Management:** Upload and display participant logos.
- **HTTP Interceptor:** Automatically attaches authentication tokens to API requests and handles HTTP errors.
- **Notifications:** Displays success and error notifications.
- **Loading Indicators:** Provides loading feedback during API operations.
- **Environment Configuration:** Centralized backend API URL configuration.

## Technology Stack

### Frontend
- Angular 22
- TypeScript
- HTML and CSS
- RxJS
- npm

### Backend
- Java / Spring Boot
- Gradle
- PostgreSQL
- Keycloak authentication
- Swagger / OpenAPI

## Project Structure

```text
eyosi/
├── public/
├── src/
│   └── app/
│       ├── edit-participant/
│       ├── environments/
│       ├── guards/
│       ├── interceptors/
│       ├── login/
│       ├── participant/
│       ├── participant-form/
│       ├── services/
│       └── shared/
├── angular.json
├── package.json
└── README.md
```

## Prerequisites

Install the following before running the application:

- Node.js and npm
- Angular CLI
- Java Development Kit (JDK)
- PostgreSQL
- Git

The backend project also includes the Gradle wrapper, so a separate Gradle installation is not required.

## Frontend Setup

### 1. Clone the repository

```bash
git clone <repository-url>
```

Navigate to the frontend project:

```bash
cd eyosi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API URL

Open:

`src/app/environments/environment.ts`

Configure the backend API URL:

```typescript
export const environment = {
  apiUrl: 'http://localhost:9081/api/v1'
};
```

### 4. Run the frontend

```bash
npm start
```

Open the application:

http://localhost:4200/

## Backend Setup

The backend project is maintained separately in the `participant-bank-backend` repository.

### 1. Navigate to the backend project

```bash
cd participant-bank-backend
```

### 2. Configure PostgreSQL

Ensure PostgreSQL is running and configure the database connection in the backend application properties.

The development database configuration uses:

```text
Database: acs_participant_db
Host: localhost
Port: 5432
```

### 3. Run the backend

On Windows PowerShell:

```powershell
.\gradlew.bat build
```

Start the backend using the development profile:

```powershell
.\gradlew.bat bootRun --args='--spring.profiles.active=dev'
```

The backend runs on:

http://localhost:9081

### 4. API Documentation

Swagger UI:

http://localhost:9081/swagger-ui.html

OpenAPI specification:

http://localhost:9081/v3/api-docs

## Authentication

The frontend communicates with the backend authentication endpoint:

```text
POST /api/v1/auth/login
```

After successful authentication, the frontend stores the access token in browser session storage.

The HTTP interceptor attaches the Bearer access token to protected API requests.

The application automatically logs out and redirects to the login page when a protected request receives a 401 Unauthorized response.

Authentication requires the backend and its configured Keycloak server to be available.

## Building the Frontend

To create a production build:

```bash
npm run build
```

The generated files are stored in:

```text
dist/
```

## Running Tests

Run the frontend unit tests:

```bash
npm test
```

## Additional Development Commands

Start the development server:

```bash
npm start
```

Build while watching for changes:

```bash
npm run watch
```

Run the Angular CLI:

```bash
npx ng
```

## Git Branches

The final frontend development branch for Task 12 is:

```text
task/12-environments-tests
```

The backend branch used for authenticated participant management is:

```text
branch3-auth-with-logo
```

## Important Notes

- Start PostgreSQL before starting the backend.
- Start the backend before using frontend API features.
- Ensure the configured Keycloak server is reachable for authentication.
- Do not commit passwords, access tokens, or other private credentials to Git.
