const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {type:String},
        email:{
            type:String, 
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email invalide'],
            required:true},
        password:{
            type:String, 
            required:true},
        isAdmin:{type:Boolean, default:false},
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);