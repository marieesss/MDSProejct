const router = require("express").Router();
const { restart } = require("nodemon");
const Product = require("../models/Product");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyTokenAdmin ,async (req, res) => {
  // récupération des données de la requête
    const newProduct= new Product(req.body);
    try{
  // enregistrement à la base de donnée
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }catch(err){
        res.status(500).json(err);
    }

})


//UPDATE
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

  //DELETE 

  router.delete("/:id", verifyTokenAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


    //GET 

    router.get("/find/:id", async (req, res)=>{
        try{
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })


         //GET All Product

         router.get("/", async (req, res) => {
          const qNew = req.query.new;
          const qCategory = req.query.category;
          const qFermier= req.query.fermier;
          try {
            let products;
        
            if (qNew) {
              products = await Product.find().sort({ createdAt: -1 }).limit(1);
            } else if (qCategory) {
              products = await Product.find({
                categories: {
                  $in: [qCategory],
                },
              }).sort({ createdAt: -1 });
            } else if (qFermier) {
              products = await Product.find({
                fermierId: {
                  $in: [qFermier],
                },
              }).sort({ createdAt: -1 });
            } else {
              products = await Product.find().sort({ createdAt: -1 });
            }
        
            res.status(200).json(products);
          } catch (err) {
            res.status(500).json(err);
          }
        });

        
           //GET All products with farmers
           router.get("/all", async (req, res) => {
            try {
              const products = await Product.aggregate([
                {
                  $addFields: {
                    fermier_id: { $toObjectId: "$fermierId" },
                  },
                },
                {
                  $lookup: {
                    from: "fermiers",
                    localField: "fermier_id",
                    foreignField: "_id",
                    as: "fermier",
                  },
                },
              ]).exec();
              res.status(200).json(products);
            } catch (err) {
              res.status(500).json(err);
            }
          });

module.exports = router