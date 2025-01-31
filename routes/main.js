const router = require("express").Router();
const faker = require("faker");
const Product = require("../models/product");
const Review = require("../models/review");

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

router.get("/products", (request, response, next) => {
  const perPage = 9;

  const page = request.query.page || 1;

  Product.find({})
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.count().exec((err, count) => {
        if (err) return next(err)

        response.send(products)
      })
    })
});

// returns a specific product by its ID
// [CHECK!]
router.get("/products/:product", (request, response) => {
  // console.log("REQUEST PARAMS>>", request.params)
  let prodId = request.params.product

  console.log("PRODUCT ID>>", prodId)

  Product.find({_id: prodId})
  .then((prod) => {
    response.send(prod)
  })
  .catch((err) => {
    console.error("Error fetching product", err);
    response.status(500).send("Internal Server Error")
  })
})

// returns the reviews of a specific product
// [CHECK!]
router.get("/products/:product/reviews", (request, response, next) => {
  let prodId = request.params.product

  Product.find({ _id: prodId})
  .then((product) => {
    response.send(product[0].reviews)
  })
})

// creates a new product to the DB
// [CHECK!]
router.post("/products", (request, response, next) => {
  let params = request.body

  let product = new Product()

  product.category = params.category
  product.name = params.name
  product.price = params.price
  product.image = params.image

  // product.save((err) => {
  //   if (err) throw err
  // })

  console.log("NEW PRODUCT>>", product)
  response.end()
})

// creates a new review in the DB by adding it to the correct product's reviews array
//needs to find the matching product and save the new review to that product's review array
router.post("/products/:product/reviews", (request, response, next) => {

  console.log("REQUEST BODY>>", request.body)

  
  let review = new Review({
    username: request.body.userName,
    text: request.body.text,
    product: request.body.product
  })

  console.log("REVIEW PRODUCT ID>>", review.product)
  
  // Product.find({_id:review.product})
  // .then((prod) => {
  //   console.log("PRODUCT FOUND>>", prod)
  //   prod.reviews.push(review)
  // })
  // .catch((err) => {
  //   if(err) throw err
  // })

  // Product.find({_id:review.product})
  // .exec((err, product) => {
  //   console.log( "PRODUCTS RESULT>>", product)
  //   console.log("NEW REVIEW>>", review)
  //   product.reviews = review

  //   product.save((err) => {
  //     if(err) throw err
  //   })
  // })

  let query = review.product

  Product.findOneAndUpdate(query, {reviews: [review]})
  

  // const filter = review.product

  // Product.findOneAndUpdate(filter, review)
  // // .then((prod) => {
  // //   console.log(prod)
  // // })

  // console.log("NEW REVIEW>>", review)
  // // review.save((err) => {
  // //   if(err) throw err
  // // })
  response.end()
})

module.exports = router;