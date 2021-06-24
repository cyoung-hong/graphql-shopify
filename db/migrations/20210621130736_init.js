const e = require("express");

exports.up = function (knex) {
  return knex.schema
    .createTable("shopifyProduct", (table) => {
      table.integer("id").primary();
      table.string("title").notNullable();
      table.string("bodyHtml", 500);
      table.string("vendor");
      table.string("productType");
      table.datetime("createdAt").defaultTo(knex.fn.now());
      table.string("handle");
      table.datetime("updatedAt").defaultTo(knex.fn.now());
      table.datetime("publishedAt").defaultTo(knex.fn.now());
      table
        .enum("status", ["active", "archived", "draft"])
        .defaultTo("active")
        .notNullable();
      table.string("templateSuffix");
      table.string("publishedScope"); // Add constraint between two values, "web" and "global"
      table.string("tags");
      table.string("adminGraphqlApiId");
    })
    .createTable("shopifyOption", (table) => {
      table.increments();
      table.integer("productId");
      table.foreign("productId").references("shopifyProduct.id");
      table.string("name").notNullable();
    })
    .createTable("shopifyImage", (table) => {
      table.integer("id").primary();
      table.integer("productId");
      table.foreign("productId").references("shopifyProduct.id");
      table.integer("position");
      table.datetime("createdAt");
      table.datetime("updatedAt");
      table.string("alt");
      table.integer("width");
      table.integer("height");
      table.string("src");
      table.string("adminGraphqlApiId");
    })
    .createTable("shopifyProductVariant", (table) => {
      table.integer("id").primary();
      table.integer("productId");
      table.foreign("productId").references("shopifyProduct.id");
      table.string("title");
      table.string("price");
      table.string("sku");
      table.integer("position");
      table.string("inventoryPolicy");
      table.string("compareAtPrice");
      table.string("fulfillmentService");
      table.string("inventoryManagement");
      table.datetime("createdAt").defaultTo(knex.fn.now());
      table.datetime("updatedAt").defaultTo(knex.fn.now());
      table.boolean("taxable");
      table.string("barcode");
      table.integer("grams");
      table.integer("imageId")
      table.foreign("imageId").references("shopifyImage.id");
      table.decimal("weight", 8, 2);
      table.string("weightUnit");
      table.bigInteger("inventoryItemId");
      table.integer("inventoryQuantity");
      table.integer("oldInventoryQuantity");
      table.boolean("requiresShipping");
      table.string("adminGraphqlApiId");
    })
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
    .dropTableIfExists("shopifyProductVariant")
    .dropTableIfExists("shopifyImage")
    .dropTableIfExists("shopifyOption")
    .dropTableIfExists("shopifyProduct")
    .dropTableIfExists("productVariant")
    .dropTableIfExists("product");
};
