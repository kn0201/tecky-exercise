import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("user", (table) => {
    table.unique("username");
  });
  await knex.schema.alterTable("category", (table) => {
    table.unique("name");
  });
}

export async function down(knex: Knex): Promise<void> {}
