const e = require("express");

exports.up = function (knex) {
  return knex.schema
    .createTable("product", (table) => {
      table.integer("id").primary();
      table.string("title").notNullable();
      table
        .enum("status", ["active", "archived", "draft"])
        .defaultTo("active")
        .notNullable();
    })
    .createTable("productVariant", (table) => {
      table.integer("id").primary();
      table.integer("productId");
      table.foreign("productId").references("product.id");
      table.string("barcode");
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("productVariant")
    .dropTableIfExists("product");
};
