const db = require("../config/db");

const createTask = async (text, todoListId) => {
  const result = await db.query(
    "INSERT INTO tasks (text, todo_list_id) VALUES ($1, $2) RETURNING *",
    [text, todoListId]
  );
  return result.rows[0];
};

const deleteTask = async (taskId) => {
  await db.query("DELETE FROM tasks WHERE id = $1", [taskId]);
};

const toggleTask = async (taskId) => {
  const result = await db.query(
    "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
    [taskId]
  );
  return result.rows[0];
};

module.exports = {
  createTask,
  deleteTask,
  toggleTask,
};
