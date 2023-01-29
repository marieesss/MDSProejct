const router = require("express").Router();
const { restart } = require("nodemon");
const Cart = require("../models/Cart");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyToken ,async (req, res) => {
    const newCart= new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(500).json(err);
    }

})

//UPDATE

router.put("/:id", verifyTokenAuth, async (req, res) => {
  
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE 

  router.delete("/:id", verifyTokenAdmin, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        restart.status(200).json("Cart has been delected")
    }catch(err){
        res.status(500).json.apply(err)
    }
  })


    //GET USER CART

    router.get("/find/:userId", verifyTokenAuth, async (req, res)=>{
        try{
            const cart = await Cart.findById({userId: req.params.userId,});
            res.status(200).json(cart);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })


         //GET All CART

router.get("/", verifyTokenAdmin, async (req, res) => {
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router