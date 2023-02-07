const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId: {type:String, required:true, unique:true},
        products: [
            {
            productId: {
                type:String,
            },
            quantity:{
               type: Number,
               default:1, 
            }
        }

        ],
        amount: {type:Number, required:true},
        adress: {type:Object, required:true},
        Hub: {type:String, required:true},
        status: {type:String, default:"en Attente"},



        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", OrderSchema);