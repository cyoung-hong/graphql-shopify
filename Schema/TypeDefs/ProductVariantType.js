const graphql = require("graphql");
const { GraphQLInt, GraphQLString, GraphQLObjectType } = graphql;

const ProductVariantType = new GraphQLObjectType({
  name: "ProductVariant",
  description: "A different version of the product.",
  fields: () => ({
    id: { type: GraphQLInt, description: "The unique numeric identifier for the product variant." },
    productId: {type: GraphQLInt, description: "The identifier of the parent product."},
    barcode: { type: GraphQLString, description: "The barcode, UPC, or ISBN number for the product."},
  }),
});

module.exports = ProductVariantType;