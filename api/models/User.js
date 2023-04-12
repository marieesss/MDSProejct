const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {type:String, required:true},
        email:{type:String, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
        password:{type:String, required:true},
        isAdmin:{type:Boolean, default:false},
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);