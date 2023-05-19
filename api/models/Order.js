const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String},
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
    hubId: { type: String, required:true},
    status: { type: String, default: "en attente de paiement" },
    stripeStatus: {type: String},
    billingAdress : {
      adress : {
        city : {type:String},
        country : {type:String},
        adress : {type:String},
        postal_code : {type:String}
      }
    },
    receipt_url: {type:String}
  },
  
  { timestamps: true }
);

OrderSchema.index({ userId: 1 }, { unique: false });

module.exports = mongoose.model("Order", OrderSchema);