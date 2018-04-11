const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductPlacementSchema = new Schema({
  name: { type: String, required: true },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  placement: [{
    type: Schema.Types.ObjectId,
    ref: "Placement"
  }]
});

const ProductPlacement = mongoose.model("ProductPlacement", ProductPlacementSchema);

module.exports = ProductPlacement;
