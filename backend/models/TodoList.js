const db = require("../config/db");

const createTodoList = async (name, userId) => {
  const result = await db.query(
    "INSERT INTO todo_lists (name, user_id) VALUES ($1, $2) RETURNING *",
    [name, userId]
  );
  return result.rows[0];
};

const getTodoListsByUserId = async (userId) => {
  const result = await db.query(
    `SELECT 
       todo_lists.id as list_id, 
       todo_lists.name as list_name, 
       tasks.id as task_id, 
       tasks.text as task_text, 
       tasks.completed 
     FROM 
       todo_lists 
     LEFT JOIN 
       tasks 
     ON 
       todo_lists.id = tasks.todo_list_id 
     WHERE 
       todo_lists.user_id = $1`,
    [userId]
  );


  const todoLists = {};
  result.rows.forEach((row) => {
    if (!todoLists[row.list_id]) {
      todoLists[row.list_id] = {
        id: row.list_id,
        name: row.list_name,
        tasks: [],
      };
    }
    if (row.task_id) {
      todoLists[row.list_id].tasks.push({
        id: row.task_id,
        text: row.task_text,
        completed: row.completed,
      });
    }
  });

  return Object.values(todoLists);
};

const deleteTodoList = async (listId) => {
  await db.query("DELETE FROM todo_lists WHERE id = $1", [listId]);
};

module.exports = {
  createTodoList,
  getTodoListsByUserId,
  deleteTodoList,
};
