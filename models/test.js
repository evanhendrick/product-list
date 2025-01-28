const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  text: String,
  number: Number,
  id: Number
});

module.exports = mongoose.model("Test", TestSchema)