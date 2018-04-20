const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlacementSchema = new Schema({
  id: { type: String, required: true },  
  name: { type: String, required: true },
  description: { type: String, required: true },
  aisle: { type: String, required: false },
  section: { type: String, required: false },
  rack: { type: String, required: false },
  photoURL: { type: String, required: false },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  }
});

const Placement = mongoose.model("Placement", PlacementSchema);

module.exports = Placement;
