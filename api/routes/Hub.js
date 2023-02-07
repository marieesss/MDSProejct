const router = require("express").Router();
const Hub = require("../models/Hub");
const Order = require("../models/Order");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyTokenAdmin ,async (req, res) => {
    const newHub= new Hub(req.body);

    try{
        const savedHub = await newHub.save();
        res.status(200).json(savedHub);
    }catch(err){
        res.status(500).json(err);
    }

})

//UPDATE

router.put("/:id", verifyTokenAdmin, async (req, res) => {
  
    try {
      const updatedHub = await Hub.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedHub);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE 

  router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
      await Hub.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

    //GET HUB

    router.get("/find/:OrderId", verifyTokenAuth, async (req, res) => {
        try {
          const hub = await Hub.find({ OrderId: req.params.OrderId });
          res.status(200).json(hub);
        } catch (err) {
          res.status(500).json(err);
        }
      });

         //GET All Hubs

router.get("/", verifyTokenAdmin, async (req, res) => {
    try{
        const hubs = await Hub.find();
        res.status(200).json(hubs);

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router