import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

console.log("API URL:", apiUrl); // Debugging Statement

if (!apiUrl) {
  throw new Error(
    "REACT_APP_API_URL is not defined in the environment variables"
  );
}

const API_URL = `${apiUrl}/api`;

const getTodoLists = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/todo-lists`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

const createTodoList = async (name: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/todo-lists`,
    { name },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};

const deleteTodoList = async (listId: string) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/todo-lists/${listId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
};

const createTask = async (listId: string, text: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/todo-lists/${listId}/tasks`,
    { text },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return response.data;
};

const toggleTask = async (taskId: string) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(`${API_URL}/tasks/${taskId}`, null, {
    headers: {
      "x-auth-token": token,
    },
  });
  return response.data;
};

const deleteTask = async (taskId: string) => {
  const token = localStorage.getItem("token");
  await axios.delete(`${API_URL}/tasks/${taskId}`, {
    headers: {
      "x-auth-token": token,
    },
  });
};

export default {
  getTodoLists,
  createTodoList,
  deleteTodoList,
  createTask,
  toggleTask,
  deleteTask,
};
