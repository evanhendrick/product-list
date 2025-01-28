const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//connection string copied from MongoDB Compass
// mongodb://localhost:27017/

//this is an asynchronous function and returns a promise. It takes a minute to respond
//needed 127.0.0.1 to fix connection issue
// and needed to specify which DB we were connecting to in order to write to it (i.e. /myapp)
mongoose.connect("mongodb://127.0.0.1:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Successfully connected to the Mongo database.")
})
.catch((err) => {
  console.log(err)
})

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const mainRoutes = require("./routes/main");

app.use(mainRoutes);

app.listen(8000, () => {
  console.log("Node.js listening on port " + 8000);
});

//1/23/25: we are not making our connection properly
//1. connect on atlas DB 2. run node server.js 3. try to figure out what the issue is with connecting to your DB