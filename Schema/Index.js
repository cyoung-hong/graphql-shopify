const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLList,
} = graphql;

// GraphQL
const ProductType = require("./TypeDefs/ProductType.js");
const ProductVariantType = require("./TypeDefs/ProductVariantType.js");

// PostgresQL Models
const Product = require("../db/models/product.js");
const ProductVariant = require("../db/models/productVariant.js");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      description: "All products in the database.",
      resolve: async () => {
        return await Product.query();
      },
    },
    product: {
      type: ProductType,
      description: "Get product by ID",
      args: { 
        id: { type: GraphQLID } 
      },
      resolve: async (parent, args) => {
        const {id} = args;
        const product = await Product.query().findById(id);
        return product;
      },
    },
    variants: {
      type: new GraphQLList(ProductVariantType),
      description: "All variants in the database.",
      resolve: async () => {
        return await ProductVariant.query();
      },
    },
    variant: {
      type: ProductVariantType,
      description: "Get product by the product variant's ID",
      args: {
        id: {type: GraphQLID}
      },
      resolve: async (parent, args) => {
        const {id} = args;
        return await ProductVariant.query().findById(id);;
      }
    }
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
