const router = require("express").Router();
const Hub = require("../models/Hub");
const { Client } = require('@googlemaps/google-maps-services-js');

const {
    verifyToken,
    verifyTokenAuth,
    verifyTokenAdmin,
  } = require("./verifyToken");


// CREATE 

router.post("/", verifyTokenAdmin ,async (req, res) => {

  const adress = req.body.adress;
  const ville = req.body.ville;
  const code = req.body.code;
  console.log(adress)

 // Validation de l'adresse à l'aide de l'API Google Maps
 const client = new Client({});
 try {
   const response = await client.geocode({
     params: {
       address: adress+ville+code,
       key: 'AIzaSyDTRP1jLzuSp6a14xmfO27IfovPFGyZ4Qs',
     },
   });

   // Vérification qu'au moins un résultat a été renvoyé
   if (response.data.results.length > 0) {
     // Récupération des données de géolocalisation de l'adresse
     const location = response.data.results[0].geometry.location;

     // Création d'une nouvelle adresse à partir des données de géolocalisation
     const hub = new Hub({
       name : req.body.name,
       adress: adress,
       ville: ville,
       code:code,
       latitude: location.lat,
       longitude: location.lng,
     });

     // Sauvegarde de l'adresse dans la base de données
     await hub.save();

     res.status(201).json({ message: 'Adresse ajoutée avec succès' });
   } else {
     res.status(400).json({ message: 'Adresse invalide' });
     console.log("merde")
   }
 } catch (error) {
   console.log(error);
   res.status(500).json({ message: 'Erreur serveur' });
 }

})


router.post('/add-address', async (req, res) => {
  // Récupération de l'adresse du corps de la requête
  const address = req.body.address;

  // Validation de l'adresse à l'aide de l'API Google Maps
  const client = new Client({});
  try {
    const response = await client.geocode({
      params: {
        address: address,
        key: 'VOTRE_CLE_API_GOOGLE_MAPS',
      },
    });

    console.log(response)

    // Vérification qu'au moins un résultat a été renvoyé
    if (response.data.results.length > 0) {
      // Récupération des données de géolocalisation de l'adresse
      const location = response.data.results[0].geometry.location;

      // Création d'une nouvelle adresse à partir des données de géolocalisation
      const newAddress = new Address({
        address: address,
        latitude: location.lat,
        longitude: location.lng,
      });

      // Sauvegarde de l'adresse dans la base de données
      await newAddress.save();

      res.status(201).json({ message: 'Adresse ajoutée avec succès' });
    } else {
      res.status(400).json({ message: 'Adresse invalide' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

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

router.get("/", async (req, res) => {
    try{
        const hubs = await Hub.find();
        res.status(200).json(hubs);

    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router