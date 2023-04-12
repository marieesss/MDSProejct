const mongoose = require('mongoose');

const FermierSchema = new mongoose.Schema(
    {
        desc: {type:String, required:true},
        name: {type:String, required:true},
        img: {type:Object, required:true},

    },
    {timestamps: true}
);

module.exports = mongoose.model("Fermier", FermierSchema);