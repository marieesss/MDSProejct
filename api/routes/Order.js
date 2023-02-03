const router = require("express").Router();
const { restart } = require("nodemon");
const Order = require("../models/Order");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyToken ,async (req, res) => {
    const newOrder= new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(500).json(err);
    }

})

//UPDATE

router.put("/:id", verifyTokenAuth, async (req, res) => {
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE 

  router.delete("/:id", verifyTokenAdmin, async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        restart.status(200).json("Order has been delected")
    }catch(err){
        res.status(500).json.apply(err)
    }
  })


    //GET USER Order

    router.get("/find/:userId", verifyTokenAuth, async (req, res)=>{
        try{
            const Order = await Order.findById({userId: req.params.userId,});
            res.status(200).json(Order);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })


         //GET All Order

router.get("/", verifyTokenAdmin, async (req, res) => {
    try{
        const Orders = await Order.find();
        res.status(200).json(Orders);

    }catch(err){
        res.status(500).json(err);
    }
})

//GET MONTHLY STATS

router.get("/stats", verifyTokenAdmin, async (req, res) => {
    const date= new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() -1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() -1));
        try{
            const stats = await Order.aggregate([
                {$match: {createdAt: {$gte: previousMonth}}}, 
                {$projet:{
                month:{$month: "$createdAT"},
                sales:"$amount"
            },
        $group:{
            _id:"$month",
            total:{$sum:"$sales"}
        }
        }
            ]);
            res.status(200).json(stats);

        }catch(err){
            res.status(500).json(err);
        }
})

module.exports = router