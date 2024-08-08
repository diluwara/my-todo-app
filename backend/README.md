# Daily Activity Tracker - Backend

This is the backend server for the Daily Activity Tracker application, built with Node.js, Express, and PostgreSQL. The server handles user authentication, manages todo lists and tasks, and provides a RESTful API for the frontend to interact with.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Configuration](#database-configuration)
- [Database Migration](#database-migration)
- [API Endpoints](#api-endpoints)
- [Running the Server](#running-the-server)
- [Rollback Migrations](#rollback-migrations)
- [Testing](#testing)
- [License](#license)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/diluwara/my-todo-app.git
   cd my-todo-app 
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up your environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```bash
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     ```

## Environment Variables

- **DATABASE_URL**: The connection string for your PostgreSQL database.
- **JWT_SECRET**: Secret key used to sign JWT tokens.

## Database Configuration

Before running the migrations, update the `knexfile.js` to include your PostgreSQL connection details.

```javascript
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: '127.0.0.1',
      user: 'your_database_user',
      password: 'your_database_password',
      database: 'your_database_name'
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },
};
```

Replace `your_database_user`, `your_database_password`, and `your_database_name` with your actual PostgreSQL database credentials.

## Database Migration

To set up the database schema, run the following command:

```bash
npx knex migrate:latest
```

This will create the necessary tables in your PostgreSQL database.

## Rollback Migrations

If you need to undo the most recent migration, use:

```bash
npx knex migrate:rollback
```

To rollback all migrations, use:

```bash
npx knex migrate:rollback --all
```

## API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  - Request body:
    ```json
    {
      "username": "your_username",
      "password": "your_password",
      "email": "your_email"
    }
    ```
  - Response:
    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "id": "user_id",
        "username": "your_username"
      }
    }
    ```

- **Login**: `POST /api/auth/login`
  - Request body:
    ```json
    {
      "username": "your_username",
      "password": "your_password"
    }
    ```
  - Response:
    ```json
    {
      "token": "your_jwt_token",
      "user": {
        "id": "user_id",
        "username": "your_username"
      }
    }
    ```

### Todo Lists and Tasks

- **Create Todo List**: `POST /api/todo-lists`
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Request body:
    ```json
    {
      "name": "List Name"
    }
    ```
  - Response:
    ```json
    {
      "id": "list_id",
      "name": "List Name",
      "user_id": "user_id"
    }
    ```

- **Get All Todo Lists**: `GET /api/todo-lists`
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Response:
    ```json
    [
      {
        "id": "list_id",
        "name": "List Name",
        "tasks": [
          {
            "id": "task_id_1",
            "text": "Task 1",
            "completed": false
          },
          {
            "id": "task_id_2",
            "text": "Task 2",
            "completed": true
          }
        ]
      }
    ]
    ```

- **Create Task**: `POST /api/todo-lists/:listId/tasks`
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Request body:
    ```json
    {
      "text": "Task description"
    }
    ```
  - Response:
    ```json
    {
      "id": "task_id",
      "text": "Task description",
      "completed": false,
      "todo_list_id": "list_id"
    }
    ```

- **Delete Task**: `DELETE /api/tasks/:taskId`
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Response:
    ```json
    {
      "msg": "Task deleted"
    }
    ```

- **Delete Todo List**: `DELETE /api/todo-lists/:listId`
  - Headers: `{ "x-auth-token": "your_jwt_token" }`
  - Response:
    ```json
    {
      "msg": "Todo list deleted"
    }
    ```

## Running the Server

To start the server, use the following command:

```bash
npm start
```

For development, you can use:

```bash
npm run dev
```

This will start the server with `nodemon`, which will automatically restart the server whenever you make changes to the code.

## Testing

You can use Postman or any other API testing tool to test the endpoints. Make sure your server is running and that you're sending the correct headers, particularly the `x-auth-token` for protected routes.

## License

This project is licensed under the MIT License.