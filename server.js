const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const Product = require("./db/models/product.js");
const schema = require("./Schema/Index.js");
const setup = require('./db/setup.js');
const shopifyRoutes = require('./service/shopifyRoutes.js');

const db = setup();
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.json());
app.listen(8080, () => console.log("server is running on port 8080"));

app.use('/api/shopify', shopifyRoutes);

// TODO possibly remove
app.get("/product/test", async (req, res, next) => {
  const products = await Product.query();
  // const product = await Product.query().findById(632910392);
  res.json(products);
});

app.get("/product/related", async (req, res, next) => {
  const pwv = await Product.relatedQuery('productVariant').for(921728736);
  res.json(pwv);
});

app.get("/product/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    const product = await Product.query().findById(id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

app.post("/product/add", async (req, res, next) => {
  try {
    const {
      productId,
      productTitle,
      productStatus,
      variantId,
      variantBarcode,
    } = req.body;
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});


