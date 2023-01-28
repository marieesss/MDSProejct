const router = require("express").Router();
const User= require("../models/user");
const CryptoJS = require("crypto-js");
// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "Secret Passphrase"
    ).toString(),
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
    
      res.status(401).json("Wrong User Name");  
 
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
  );
  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
           originalPassword !== req.body.password
              res.status(401).json("Wrong Password");
              const {password, ...others} = user;
         
            res.status(200).json(user);
        

  }catch(err){
      res.status(500).json(err);
  }

});


module.exports = router
