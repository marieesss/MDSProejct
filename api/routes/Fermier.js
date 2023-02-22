const router = require("express").Router();
const { restart } = require("nodemon");
const Fermier = require("../models/Fermier");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyTokenAdmin ,async (req, res) => {
    const newFermier= new Fermier(req.body);

    try{
        const savedFermier = await newFermier.save();
        res.status(200).json(savedFermier);
    }catch(err){
        res.status(500).json(err);
    }

})

//UPDATE

router.put("/:id", verifyTokenAdmin, async (req, res) => {
  
    try {
      const updateFermier = await Fermier.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateFermier);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE 

  router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
      await Fermier.findByIdAndDelete(req.params.id);
      res.status(200).json("Fermier has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

    //GET Fermier

    router.get("/find/:id",async (req, res)=>{
        try{
            const fermier = await Fermier.findById(req.params.id);
            res.status(200).json(fermier);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })




         //GET All Fermiers

router.get("/", async (req, res) => {
    try{
        const fermiers = await Fermier.find();
        res.status(200).json(fermiers);

    }catch(err){
        res.status(500).json(err);
    }
})

  
module.exports = router