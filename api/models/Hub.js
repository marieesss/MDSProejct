const mongoose = require('mongoose');

const HubSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        adress: {type:String, required:true},
        OrderId: {type:String, required:true,unique:true},

    
    },
    {timestamps: true}
);

module.exports = mongoose.model("Hub", HubSchema);