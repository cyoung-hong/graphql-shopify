const graphql = require("graphql");
const { GraphQLInt, GraphQLString, GraphQLObjectType, GraphQLList, GraphQLNonNull } = graphql;

// GraphQL Type
const ProductVariantType = require("./ProductVariantType.js");

// Postgres Models
const Product = require("../../db/models/product.js");
const ProductVariant = require("../../db/models/productVariant.js");

const ProductStatusEnumType = require("../EnumTypes/ProductStatusEnumType.js");

const ProductType = new GraphQLObjectType({
  name: "Product",
  description: "Shopify's product resource",
  fields: () => ({
    id: {
      type: GraphQLInt,
      description:
        "An unsigned 64-bit integer that's used as a unique identifier for the product. Each id is unique across the Shopify system. No two products will have the same id, even if they're from different shops.",
    },
    title: { type: GraphQLString, description: "The name of the product." },
    status: { type: new GraphQLNonNull(ProductStatusEnumType), description: "The status of the product. Valid values: active, archived, draft." },
    variants: {
      type: new GraphQLList(ProductVariantType),
      description: "An array of product variants, each representing a different version of the product.",
      resolve: async (parent, args) => {
        return await Product.relatedQuery("productVariant").for(parent.id);
      },
    },
  }),
});

module.exports = ProductType;
