const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const Product = require("./db/models/product.js");
const ProductVariant = require("./db/models/productVariant.js");
const schema = require("./Schema/Index.js");
const setup = require("./db/setup.js");

const db = setup();
const app = express();

const productData = require("./jsonSamples/ShopifyProduct.json");
const productVariantData = require("./jsonSamples/ShopifyProductVariant.json");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.json());
app.listen(8080, () => console.log("server is running on port 8080"));

app.get("/product/getProducts", async (req, res, next) => {
  try {
    // Shopify API CALLS
    // Product, as if making an actual get request
    // const products = await fetch.get(`${process.env.SHOPIFY_API}/dev/admin/2021-04?api_key=${process.env.API_KEY}/products`);

    // Product Variant, as if making an actual get request
    // products.forEach(async (e) => {
    //   const variants = await fetch(
    //     `${process.env.SHOPIFY_API}/dev/admin/2021-04?api_key=${process.env.API_KEY}/products/${e.id}/variants.json`
    //   );
    //   variants.forEach(async (v) => {
    //     const existing = await ProductVariant.query().findById(e.id);
    //     if (!existing) {
    //       const savedProductVariant = await ProductVariant.query().insert({
    //         id: e.id,
    //         productId: e.productId,
    //         barcode: e.barcode,
    //       });
    //     } else {
    //       console.log(existing);
    //     }
    //   });
    // });

    // Using JSON files as dummy data
    const { products } = productData;
    const { variants } = productVariantData;

    products.forEach(async (e) => {
      const existing = await Product.query().findById(e.id);
      console.log(JSON.stringify(existing));
      if (!existing) {
        const savedProduct = await Product.query().insert({
          id: e.id,
          title: e.title,
          status: e.status,
        });
        console.log(savedProduct);
      } else {
        console.log(existing);
      }
    });

    variants.forEach(async (e) => {
      const existing = await ProductVariant.query().findById(e.id);
      console.log(JSON.stringify(existing));
      if (!existing) {
        const savedProductVariant = await ProductVariant.query().insert({
          id: e.id,
          product_id: e.product_id,
          barcode: e.barcode,
        });
        console.log(savedProductVariant);
      } else {
        console.log(existing);
      }
    });

    res.send("Success");
  } catch (err) {
    res.status(500).json(err);
  }
});
