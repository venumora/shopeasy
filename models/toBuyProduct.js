const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductPlacementSchema = new Schema({
  name: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  }
});

const ProductPlacement = mongoose.model("ProductPlacement", ProductPlacementSchema);

module.exports = ProductPlacement;
