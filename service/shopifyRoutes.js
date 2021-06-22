const router = require('express').Router();
const getProducts = require("./shopifyController.js");


router.get('/products', getProducts);

module.exports = router;