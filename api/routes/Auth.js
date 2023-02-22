const router = require("express").Router();
const User= require("../models/user");
const CryptoJS = require("crypto-js");
const jwt =require("jsonwebtoken");
// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    //hash le mot de passe
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
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
    //cherche le mail dans la base de donnée
    const user = await User.findOne(
      {
          email: req.body.email
      }
  );
    
  !user && res.status(401).json("Wrong User Name");
  // décrypte le mot de mot de passe
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
  );
  // compare le mot de passe décrypté et le mot de passe entré
  const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if(originalPassword !== req.body.password){
         return res.status(401).json("Wrong Password");
      }else{
        // crée un token en fonction de son statut Admin ou non
         const accessToken =jwt.sign({
                id: user.id, 
                isAdmin : user.isAdmin
              }, process.env.JWT_SEC,
              // le token expire au bout de 3 jours
              {expiresIn : "3d"});
              const {password, ...others} = user._doc;
            
         
            return res.status(200).json({...others, accessToken});
      }
             
        

  }catch(err){
      return res.json(err);
      
  }

});


module.exports = router
