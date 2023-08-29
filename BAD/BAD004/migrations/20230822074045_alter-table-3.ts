import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("file", (table) => {
    table.foreign("category").references("category.name");
    table.foreign("owner").references("user.username");
  });
}

export async function down(knex: Knex): Promise<void> {}
