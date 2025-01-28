const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
// const Test = require("../models/Test")
const Coffee = require('../models/coffee')

router.get("/generate-fake-data", (req, res, next) => {
  for (let i = 0; i < 90; i++) {
    let product = new Product();

    product.category = faker.commerce.department();
    product.name = faker.commerce.productName();
    product.price = faker.commerce.price();
    product.image = "https://via.placeholder.com/250?text=Product+Image";

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.end();
});

router.get("/products", (request, response) => {
  Product.find({})
    .then((products) => {
      response.json(products);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
      response.status(500).send("Internal Server Error");
    });
    response.end("new response")
});

module.exports = router;