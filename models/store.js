const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StoreSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  logoUrl: {
    type: String,
    required: true
  },
  locationId: {
    type: String,
    required: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  placements: [{
    type: Schema.Types.ObjectId,
    ref: "Placement"
  }]
});

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;
