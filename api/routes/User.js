const router = require("express").Router();
const { restart } = require("nodemon");
const User = require("../models/user");
const Order = require("../models/Order");
const CryptoJS = require("crypto-js");


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

//User can modify his profile

router.put("/updatebyuser/:userId", verifyToken,verifyTokenAuth, async (req, res) => {
  console.log("salut")
  try {

     // Rechercher l'utilisateur dans la base de données par nom d'utilisateur
     const user = await User.findOne({ email: req.body.email });

     // Vérifier si l'utilisateur existe
     if (!user) {
         // Si l'utilisateur n'existe pas, renvoyer une réponse avec un code de statut 401 (non autorisé)
         return res.status(404).json({message : "Votre email originel est mauvais"});
     }

     // Décrypter le mot de passe stocké dans la base de données
     const hashedPassword = CryptoJS.AES.decrypt(
         user.password,
         process.env.PASS_SEC
     );
     const Oripassword = hashedPassword.toString(CryptoJS.enc.Utf8);

     // Vérifier si le mot de passe soumis par l'utilisateur est correct
     if (Oripassword !== req.body.password) {
         // Si le mot de passe est incorrect, renvoyer une réponse avec un code de statut 401 (non autorisé)
         return res.status(401).json({message : "Mauvais mot de passe"});
     }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.newemail,
        },
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
    await Order.deleteMany({ userId: userIdToDelete })
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
