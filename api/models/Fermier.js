const mongoose = require('mongoose');

const FermierSchema = new mongoose.Schema(
    {

        products: [
            {
            productId: {
                type:String,
            }
        }

        ],
        desc: {type:String, required:true},
        name: {type:String, required:true},
        img: {type:Object, required:true},

    },
    {timestamps: true}
);

module.exports = mongoose.model("Fermier", FermierSchema);