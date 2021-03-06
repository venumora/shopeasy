const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  placements: [{
    type: Schema.Types.ObjectId,
    ref: "Placement"
  }],
  price: { type: Number, required: false },
  keywords: { type: Array, required: false },  
  photoURL: { type: String, required: false },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  } 
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
