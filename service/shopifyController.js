const express = require('express');

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
}

module.exports = getProducts
