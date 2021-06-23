const express = require("express");
const Product = require("../db/models/product.js");

const getProducts = async (req, res) => {
  try {
    // const products = await fetch.get(
    //   `${process.env.SHOPIFY_API}/dev/admin/2021-04?api_key=${process.env.API_KEY}/products`
    // );
    res.send("Got products");
    // if(!products) {
    //     return res.status(404).json({message: "Nothing found."});
    // }
    // return res.status(201).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  // Check is user is authenticated
  // Check if user made request already
  try {
    /*
     {
        id,
        title,
        status,
      }
    */
    const {id, title, status} = req.body;

    // Check if there is a request that matches these two fields
    const foundProduct = await Product.query().find({
      "id": id
    });

    if (foundProduct) {
      return res.status(409).json({ error: "Product already exists." });
    }

    const newProduct = new Product({  
      id,
      title,
      status,
    });

    newProduct
      .save()
      .then((savedProduct) => {
        res.status(201).json({ savedProduct });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
};

module.exports = getProducts;
