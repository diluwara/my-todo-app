const db = require('../config/db');

const createUser = async (username, hashedPassword, email) => {
  const result = await db.query(
    'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username',
    [username, hashedPassword, email]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername,
};
