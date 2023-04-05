
const router = require("express").Router(); 
require("dotenv").config(); // Pour charger les variables d'environnement depuis un fichier .env
const KEY = process.env.STRIPE_KEY; // Récupération de la clé d'API Stripe depuis les variables d'environnement
const stripe = require("stripe")(KEY); // Initialisation de la bibliothèque Stripe avec la clé d'API


router.post("/payment", (req, res) => {
  // Appel de la méthode Stripe "charges.create" pour créer une nouvelle charge de paiement
  stripe.charges.create(
    {
      source: req.body.tokenId, // Le token d'identification
      amount: req.body.amount, // Le montant du paiement à effectuer
      currency: "eur", // La devise de la charge de paiement
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        //  renvoie une réponse HTTP avec un code d'erreur 500 et les détails de l'erreur Stripe
        res.status(500).json(stripeErr);
      } else {
        //  renvoie une réponse HTTP avec un code 200 et les détails de la charge Stripe
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
