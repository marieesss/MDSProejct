const router = require("express").Router();
const User= require("../models/User");
const CryptoJS = require("crypto-js");
const jwt =require("jsonwebtoken");

// Inscription
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    //hash le mot de passe
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
      // Rechercher l'utilisateur dans la base de données par nom d'utilisateur
      const user = await User.findOne({ email: req.body.email });

      // Vérifier si l'utilisateur existe
      if (!user) {
          // Si l'utilisateur n'existe pas, renvoyer une réponse avec un code de statut 401 (non autorisé)
          return res.status(401).json("Wrong credentials");
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
          return res.status(401).json("Wrong credentials!");
      }

      // Générer un jeton d'accès avec une durée de validité de 3 jours
      const accessToken = jwt.sign(
          {
              id: user._id,
              isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          { expiresIn: "3d" }
      );

      // Supprimer le mot de passe du résultat de la 
      //requête et envoyer une réponse avec le reste 
      //des informations utilisateur et le jeton d'accès
      const { password, ...others } = user._doc;
      res.status(200).json({ ...others, accessToken });
  } catch (err) {
      // Erreur
      res.status(500).json(err);
  }
});

module.exports = router
