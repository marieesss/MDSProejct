const router = require("express").Router();
const { restart } = require("nodemon");
const User = require("../models/user");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");

//UPDATE
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  if (req.body.password) {
    req.body.password = req.body.password
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
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});


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
            let usersQuery = query ? User.find().sort({_id: -1}).limit(5) : User.find().sort({_id: -1});
            usersQuery = usersQuery.select("-password"); // Exclure le champ "password"
            const users = await usersQuery.exec()
          res.status(200).json(users);
          }catch(err){
              res.status(500).json.apply(err)
          }
        })
//GET USER Stats

router.get("/stats", verifyTokenAdmin, async (req, res) => {
 //récupération de la date actuelle
 const date = new Date();
 // récupération de la date mais le mois dernier
 const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
 // récupération de la date deux mois avant
 const previouspreviousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 4));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: previouspreviousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
        { $sort: { _id: 1 } }
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router
