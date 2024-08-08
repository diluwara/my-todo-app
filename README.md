# ToDoList App

This project is a full-stack web application built with React (frontend) and Node.js/Express (backend), using PostgreSQL as the database. The project is containerized using Docker and can be easily set up with Docker Compose.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
  - [4. PostgreSQL and pgAdmin Setup](#4-postgresql-and-pgadmin-setup)
  - [5. Run the Application with Docker Compose](#5-run-the-application-with-docker-compose)
- [Usage](#usage)
- [Common Issues](#common-issues)
- [License](#license)

## Project Structure

```
/project-root
├── backend
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── src
├── frontend
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── src
├── docker-compose.yml
└── README.md
```

## Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Docker](https://www.docker.com/) (v20 or higher)
- [Docker Compose](https://docs.docker.com/compose/) (v1.27 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v13 or higher)
- [pgAdmin](https://www.pgadmin.org/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/diluwara/my-todo-app.git
cd my-todo-app
```

### 2. Backend Setup

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file and configure the environment variables according to your local setup. Make sure to configure the PostgreSQL connection details.

4. Install the backend dependencies:

   ```bash
   npm install
   ```

### 3. Frontend Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file and set the `REACT_APP_API_URL` to point to your backend API. This should be something like `http://localhost:5000`.

4. Install the frontend dependencies:

   ```bash
   npm install
   ```

### 4. PostgreSQL and pgAdmin Setup

1. **Set up PostgreSQL**:

   - Ensure PostgreSQL is installed and running on your local machine.
   - Create a new database for the project.

2. **Configure pgAdmin**:

   - Open pgAdmin and connect to your PostgreSQL server.
   - Create a new server in pgAdmin with the same connection details as your `.env` file.

3. **Migrate the database** (if using a migration tool like Knex or Sequelize):

   ```bash
   # Inside the backend directory
   npx knex migrate:latest
   ```

### 5. OR Run the Application with Docker Compose

1. Navigate to the root of the project:

   ```bash
   cd ..
   ```

2. Run Docker Compose:

   ```bash
   docker-compose up --build -d
   ```

3. Docker Compose will build and start the containers for the backend, frontend, PostgreSQL, and pgAdmin.

4. Open your browser and navigate to:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api`
   - pgAdmin: `http://localhost:5050`

## Usage

- **Frontend**: Interact with the application through the React frontend.
- **Backend**: The backend API handles authentication, CRUD operations, and other business logic.
- **Database**: Manage your PostgreSQL database through pgAdmin.

## Common Issues

1. **.env Variables Not Loaded**:
   - Ensure that the `.env` files are correctly copied from `.env.example` and configured.

2. **Port Conflicts**:
   - Ensure that the ports defined in the `docker-compose.yml` file are not in use by other applications.

3. **Database Connection Issues**:
   - Verify that the PostgreSQL service is running and the connection details in `.env` are correct.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.