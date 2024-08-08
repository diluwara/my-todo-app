const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  createTodoList,
  getTodoLists,
  deleteTodoList,
  createTask,
  deleteTask,
  toggleTask,
} = require("../controllers/todoController");
const router = express.Router();

router.post("/todo-lists", auth, createTodoList);
router.get("/todo-lists", auth, getTodoLists);
router.delete("/todo-lists/:listId", auth, deleteTodoList);
router.post("/todo-lists/:listId/tasks", auth, createTask);
router.delete("/tasks/:taskId", auth, deleteTask);
router.patch("/tasks/:taskId", auth, toggleTask);

module.exports = router;
