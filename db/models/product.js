const { Model } = require("objection");

class Product extends Model {
  static get tableName() {
    return "product";
  }

  static get relationMappings() {
    const productVariant = require("./productVariant.js");

    return {
      productVariant: {
        relation: Model.HasManyRelation,
        modelClass: productVariant,
        join: {
          from: "product.id",
          to: "productVariant.productId",
        },
      },
    };
  }
}

module.exports = Product;
