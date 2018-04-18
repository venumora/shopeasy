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

const usersSeed = [
  {
    id: "cRHm74IBCxRTtkjeYpTeoDNMeKe2",
    name: "Venu Mora",
    role: "store"
  },
  {
    id: "fiWL4OXDA8dKYcZ8RkS0js1saV93",
    name: "Userone Venu",
    role: "customer"
  }
];

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
