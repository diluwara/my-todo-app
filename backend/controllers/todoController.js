const TodoList = require("../models/TodoList");
const Task = require("../models/Task");

const createTodoList = async (req, res) => {
  const { name } = req.body;
  try {
    const todoList = await TodoList.createTodoList(name, req.user.id);
    res.json(todoList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.getTodoListsByUserId(req.user.id);
    res.json(todoLists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteTodoList = async (req, res) => {
  const { listId } = req.params;
  try {
    await TodoList.deleteTodoList(listId);
    res.json({ msg: "Todo list deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const createTask = async (req, res) => {
  const { text } = req.body;
  const { listId } = req.params;
  try {
    const task = await Task.createTask(text, listId);
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.deleteTask(taskId);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const toggleTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.toggleTask(taskId);
    res.json({ msg: "Task Updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  createTodoList,
  getTodoLists,
  deleteTodoList,
  createTask,
  deleteTask,
  toggleTask,
};
