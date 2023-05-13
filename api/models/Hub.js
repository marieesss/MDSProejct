const mongoose = require('mongoose');

const HubSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        adress: {type:String, required:true},
        ville: {type:String, required:true},
        code: {type:String, required:true},
        latitude:{type:String, required:true},
        longitude:{type:String, required:true},

    
    },
    {timestamps: true}
);

module.exports = mongoose.model("Hub", HubSchema);