const router = require("express").Router();
const { restart } = require("nodemon");
const User = require("../models/user");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


//UPDATE

router.put("/:id", verifyTokenAuth, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE 

  router.delete("/:id", verifyTokenAuth, async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        restart.status(200).json("User has been delected")
    }catch(err){
        res.status(500).json.apply(err)
    }
  })


    //GET 

    router.get("/find/:id", verifyTokenAdmin, async (req, res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {password, ...others} = user._doc;
            
         
            res.status(200).json(others);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })


         //GET All users

    router.get("/", verifyTokenAdmin, async (req, res)=>{
        const query = req.query.new;
        try{
            const users = query?await User.find().sort({_id: -1}).limit(5):await User.find();
        res.status(200).json(users);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })

//GET USER ROUTES 

router.get("/stats", verifyTokenAdmin, async (req, res) => {
    const date= new Date();
    const lasterYear = new Date(date.setFullYear(date.getFullYear()-1));
    try{
        const data = await User.aggregate([
            {$match: {createdAt: {$gte: lasterYear}} },
            {$project: {month:{$month : "$createdAt"}}},
            {$groupe :{
                _id: "$month",
                total: {$sum:1}
            }}
        ])
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err);
    }


})

module.exports = router
