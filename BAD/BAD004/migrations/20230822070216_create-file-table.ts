import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("file", (table) => {
    table.increments().primary();
    table.string("name", 255).notNullable();
    table.string("content", 255).nullable();
    table.integer("is_file").notNullable();
    table.string("category", 255).notNullable();
    table.string("owner", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("file");
}
