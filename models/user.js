const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "store"]    
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store"
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
