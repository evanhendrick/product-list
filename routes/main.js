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
    product.reviews = [];

    product.save((err) => {
      if (err) throw err;
    });
  }
  res.send("Fake data generated.");
});

router.get("/products", async (request, response, next) => {
  const perPage = 9;
  const page = request.query.page || 1;

  const category = request.query.category;
  const priceHigh = request.query.priceHigh;
  const priceLow = request.query.priceLow;
  const string = request.query.string;

  if (category && priceHigh && string) {
    let products = await Product.find({
      $and: [
        { category: category },
        { name: { $regex: string, $options: "i" } },
      ],
    })
      .sort({ price: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage);
 
    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (category && priceLow && string) {
    let products = await Product.find({
      $and: [
        { category: category },
        { name: { $regex: string, $options: "i" } },
      ],
    })
      .sort({ price: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (category && priceHigh) {
    let products = await Product.find({ category: category })
      .sort({ price: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (category && priceLow) {
    let products = await Product.find({ category: category })
      .sort({ price: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage);
    
    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (category && string) {
    let products = await Product.find({
      $and: [
        { category: category },
        { name: { $regex: string, $options: "i" } },
      ],
    })
      .skip(perPage * page - perPage)
      .limit(perPage);

    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (string && priceHigh) {
    let products = await Product.find({
      name: { $regex: string, $options: "i" },
    })
      .sort({ price: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (string && priceLow) {
    let products = await Product.find({
      name: { $regex: string, $options: "i" },
    })
      .sort({ price: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (priceHigh && priceLow) {
    //extra barrier in case
    response
      .status(400)
      .send("Error Code 400: Bad request! Conflicting filters set.");
  } else if (string) {
    console.log(string);
    let products = await Product.find({
      name: { $regex: string, $options: "i" },
    })
      .skip(perPage * page - perPage)
      .limit(perPage);
    let numOfProducts = products.length;

    let allCategories = await Product.find()

    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (category) {
    let products = await Product.find({ category: category })
      .skip(perPage * page - perPage)
      .limit(perPage);

      // get number of returned products
    let numOfProducts = products.length;

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (priceHigh) {
    let products = await Product.find()
      .sort({ price: -1 })
      .skip(perPage * page - perPage)
      .limit(perPage);
    // .exec((err, products) => {
    //   response.send(products)
    // })
    let numOfProducts = await Product.countDocuments();

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })
    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else if (priceLow) {
    let products = await Product.find()
      .sort({ price: 1 })
      .skip(perPage * page - perPage)
      .limit(perPage);

    let numOfProducts = await Product.countDocuments();

    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })

    categories.sort()

    response.json({
      products,
      numOfProducts,
      categories
    });
  } else {
    // get products
    let products = await Product.find({})
      .skip(perPage * page - perPage)
      .limit(perPage);

    //get total number of products
    let numOfProducts = await Product.countDocuments();

    // get total list of categories >> filter and sort
    let allCategories = await Product.find()
    let unfilteredCategories = allCategories.map((prod) => {
      return prod.category
    })
    const categories = unfilteredCategories.filter((value, index) => {
      return unfilteredCategories.indexOf(value) === index
    })

    categories.sort()

    console.log("categories from API",  categories)

    response.json({
      products,
      numOfProducts,
      categories
    });
  }
});

router.get("/products/:product", (request, response) => {
  let prodId = request.params.product;

  Product.find({ _id: prodId })
    .then((prod) => {
      response.send(prod);
    })
    .catch((err) => {
      console.error("Error fetching product", err);
      response.status(500).send("Internal Server Error");
    });
});

router.get("/products/:product/reviews", (request, response, next) => {
  let prodId = request.params.product;

  Product.find({ _id: prodId }).then((product) => {
    response.send(product[0].reviews);
  });
});

router.post("/products", (request, response, next) => {
  let params = request.body;

  let product = new Product();

  product.category = params.category;
  product.name = params.name;
  product.price = params.price;
  product.image = params.image;

  //forgot to do product.save()

  response.send("New product added!");
});

// router.post("/products/:product/reviews", async (request, response, next) => {

//   console.log("REQUEST BODY>>", request.body)

//   let review = new Review({
//     username: request.body.userName,
//     text: request.body.text,
//     product: request.body.product
//   })

//   console.log("REVIEW PRODUCT ID>>", review.product)

//   console.log("NEW REVIEW>>", review)
//   await review.save((err) => {
//     if(err) throw err
//   })

//   let newProduct = Product.findOne({ _id: request.body.product })
//   // .exec((err, prod) =>{
//   //   prod.reviews.push(review._id)
//   // })

//   newProduct.reviews.push(review._id)
//   console.log("NEW PRODUCT", newProduct)

//   await newProduct.save((err) => {
//     if(err) throw err
//   })

//   response.end()
// })

//goal of endpoint is to find the product, create the new review, and save the review to that found product's reviews array

router.post("/products/:product/reviews", async (request, response) => {
  const params = request.params;
  const reqBody = request.body;
  // console.log("REQUEST BODY>>", reqBody)

  // we need to instantiate a new review object>> as in a reference to the review object model!
  let review = new Review();

  review.username = request.body.userName;
  review.text = request.body.text;
  review.product = request.body.product;

  review.save();

  console.log("NEW REVIEW>>", review);

  let productFound = Product.find({ _id: request.body.product }).then(
    (product) => {
      console.log("PRODUCT FOUND>>", product);
      // product[0].reviews.push(review)
      return product;
    }
  );
  // await productFound[0].reviews.push(review)

  console.log("PRODUCT FOUND REVIEW >>", productFound);
  // await productFound[0].save()

  response.send("New review created!");
});

//'DELETE' ENDPOINTS
// Model.deleteOne()
router.delete("/products/:product", (request, response) => {
  const prodId = request.params.product;

  // console.log("Product id >>", prodId)

  // if(!prodId){
  //   response.send("To remove a product, you must enter a valid ID.")
  // }

  Product.deleteOne({ _id: prodId })
    .then(() => {
      response.send("Product removed");
    })
    .catch((err) => {
      console.log(err);
      response
        .status(400)
        .send(
          "Error: Bad request! Please ensure proper data is sent with the request."
        );
    });
});

router.delete("/reviews/:review", (request, response) => {
  const reviewId = request.params.review;

  console.log("REVIEW ID>> ", reviewId);
  // const review = Review.findById({_id: reviewId})
  if (!request.params.review) {
    response.status(404).send("Error! Review not found");
  } else {
    // const reviewId = request.params.review

    Review.findByIdAndDelete(reviewId)
      .then(() => {
        response.send("This review has been removed");
      })
      .catch((err) => {
        console.log(err);
        response
          .status(400)
          .send(
            "Error: Bad request! Please ensure proper data is sent with request."
          );
      });
  }
});

module.exports = router;
