const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Products collection and inserts the products below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/shopeasy",
  {
    useMongoClient: true
  }
);

const productSeed = [];

db.Product
  .remove({})
  .then(() => db.Product.collection.insertMany(productSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
