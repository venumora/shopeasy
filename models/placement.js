const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlacementSchema = new Schema({
  id: { type: String, required: true },  
  name: { type: String, required: true },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  },
  description: { type: String, required: true },
  aisle: { type: String, required: false },
  section: { type: String, required: false },
  rack: { type: String, required: false },
  mapUrl: { type: String, required: false } 
});

const Placement = mongoose.model("Placement", PlacementSchema);

module.exports = Placement;
