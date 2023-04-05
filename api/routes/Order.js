const router = require("express").Router();
const { restart } = require("nodemon");
const Order = require("../models/Order");
const User = require("../models/user");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyToken, async (req, res) => {
    const newOrder= new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyToken, async (req, res) => {
  
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

  router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

    //GET USER Order

    router.get("/find/:userId", verifyToken, async (req, res) => {
        try {
          const orders = await Order.find({ userId: req.params.userId });
          res.status(200).json(orders);
        } catch (err) {
          res.status(500).json(err);
        }
      });


         //GET All Order

         router.get("/", verifyTokenAdmin, async (req, res) => {
          try {
            const orders = await Order.find().sort({createdAt:-1}) ;
            res.status(200).json(orders);
          } catch (err) {
            res.status(500).json(err);
          }
        });

           //GET Order Admin
           router.get("/admin", verifyTokenAdmin, async (req, res) => {
            try {
              const orders = await Order.aggregate([
                {
                  $addFields: {
                    user_id: { $toObjectId: "$userId" },
                  },
                },
                {
                  $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user",
                  },
                },
              ]).exec();
              res.status(200).json(orders);
            } catch (err) {
              res.status(500).json(err);
            }
          });

          //GET Order Admin limit 3
router.get("/adminhomepage", verifyTokenAdmin, async (req, res) => {
  try {
    const orders = await Order.aggregate([
      {
        $addFields: {
          user_id: { $toObjectId: "$userId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $limit: 3 // Limite les résultats à 3
      }
    ]).exec();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


    //Recupérer les utilisateurs et les produits de chaque commande
    router.get("/adminall", verifyTokenAdmin, async (req, res) => {
    try {
     // utilisation de aggegate pour regrouper ou transformer les données
      const orders = await Order.aggregate([
        {
    
          // Ajout d'un champ "productId" dans chaque document de la collection "Order"
          $addFields: {
            productId: {
              // Utilisation $map pour transformer chaque élément du tableau "products" en un objet "productId"
              $map: {
                input: "$products",
                in: {
                  // Conversion de products.productId en ObjectID
                  productId: { $toObjectId: "$$this.productId" },
                }
              }
            },
            user_id: { $toObjectId: "$userId" },
          }
        },
         // Jointure en utilisant les identifiants de produits stockés dans le champ "productId.productId"
          {
            $lookup: {
              from: "products", // Nom de la collection avec laquelle on effectue la jointure
              localField: "productId.productId", // Champ dans le document "Order" qui correspond à l'_id de la collection "Products"
              foreignField: "_id", // Champ dans la collection "Products" qui correspond à l'_id dans le document "Order"
              as: "products" // Nom du champ qui stocke les résultats de la jointure
            }
          },
          {
            $lookup: {
              from: "users",
              localField: "user_id",
              foreignField: "_id",
              as: "user",
            },
          },
      
      ]).exec();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });
          
          
        

//GET MONTHLY STATS

router.get("/stats", verifyTokenAuth, async (req, res) => {
  //récupération de la date actuelle
    const date = new Date();
    // récupération de la date mais le mois dernier
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    // récupération de la date deux mois avant
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    const previouspreviousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 2));
  
    try {
      const income = await Order.aggregate([
        //filtre les commandes plus récents que previousMonth
        { $match: { createdAt: { $gte: previouspreviousMonth } } },
        // récupère que les mois des commandes passées 
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        // groupe les commandes par leur mois et fais la somme du revenu de toute les commandes 
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
        { $sort: { _id: 1 } }
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router