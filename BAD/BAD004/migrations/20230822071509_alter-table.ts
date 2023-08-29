import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("file", (table) => {
    table.unique("category");
    table.unique("owner");
  });
}

export async function down(knex: Knex): Promise<void> {}
