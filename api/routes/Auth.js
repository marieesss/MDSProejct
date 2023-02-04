const router = require("express").Router();
const User= require("../models/user");
const CryptoJS = require("crypto-js");
const jwt =require("jsonwebtoken");
// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password:
      req.body.password,
    
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Login

router.post('/login', async (req, res) => {
  try{
    const user = await User.findOne(
      {
          email: req.body.email
      }
  );
    
  !user && res.status(401).json("Wrong User Name");
 
    const hashedPassword =
      user.password;
  const originalPassword = hashedPassword;
      if(originalPassword !== req.body.password){
         res.status(401).json("Wrong Password");
      }else{
         const accessToken =jwt.sign({
                id: user.id, 
                isAdmin : user.isAdmin
              }, process.env.JWT_SEC,
              {expiresIn : "3d"});
              const {password, ...others} = user._doc;
            
         
            res.status(200).json({...others, accessToken});
      }
             
        

  }catch(err){
      res.status(500).json(err);
  }

});


module.exports = router
