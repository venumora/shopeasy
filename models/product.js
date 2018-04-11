const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  },
  price: { type: Number, required: false },
  keywords: { type: Array, required: false },  
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
