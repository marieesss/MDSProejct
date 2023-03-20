const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    hub: { type: String},
    status: { type: String, default: "en attente de paiement" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);