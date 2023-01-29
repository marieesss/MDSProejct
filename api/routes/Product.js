const router = require("express").Router();
const { restart } = require("nodemon");
const Product = require("../models/Product");
const User = require("../models/Product");
const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyTokenAdmin ,async (req, res) => {
    const newProduct= new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
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

  router.delete("/:id", verifyTokenAdmin, async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        restart.status(200).json("Product has been delected")
    }catch(err){
        res.status(500).json.apply(err)
    }
  })


    //GET 

    router.delete("/find/:id", async (req, res)=>{
        try{
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })


         //GET All Product

    router.get("/", async (req, res)=>{
        const qNew = req.query.new;
        const qCategorie = req.query.category;
        try{
            let products;
            //On récupère les 5 produits les plus récents
            if(qNew){
                 products = query?await Product.find().sort({_id: -1}).limit(5):await User.find();
            //On récupère les produits qui correspondent à une catégorie
            }else if (qCategorie){
                products = await Product.find({categories:{
                    $in: [qCategorie],
                }})
            //S'il n'y a pas les conditions précédentes on récupère tout les produits
            }else {
                products= await Product.find();
            }
           
             res.status(200).json(users);
        }catch(err){
            res.status(500).json.apply(err)
        }
      })

module.exports = router