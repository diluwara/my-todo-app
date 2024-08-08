/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTable("users", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("username", 50).unique().notNullable();
      table.string("password", 255).notNullable();
      table.string("email", 100);
    })
    .createTable("todo_lists", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("name", 100).notNullable();
      table
        .uuid("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    })
    .createTable("tasks", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("text", 255).notNullable();
      table.boolean("completed").defaultTo(false);
      table
        .uuid("todo_list_id")
        .references("id")
        .inTable("todo_lists")
        .onDelete("CASCADE");
    });

  // Insert custom data
  await knex("users").insert([
    {
      username: "diluwara",
      password: "$2b$10$MInSNmaGO44SEuPsob4x/ejTu0XXsH7mUWDeAgmsmgBlCi3VRrhQi",
      email: "diluwarakhatun56@gmail.com",
    },
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("tasks")
    .dropTable("todo_lists")
    .dropTable("users");
};