const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true, default: 0 },
    //tong tien
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", Order);
