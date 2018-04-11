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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Store = mongoose.model("Store", StoreSchema);
module.exports = Store;
