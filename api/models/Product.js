const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {type:String, required:true},
        desc:{type:String, required:true},
        img:{type:String, required:true},
        categories:{type:Array},
        price:{type:Number},
        size:{type:Number, required:true},
        fermierId:{type:String, required:true},



        
    },
    {timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);