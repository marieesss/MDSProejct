const router = require("express").Router();
const User= require("../models/User");
const CryptoJS = require("crypto-js");
const jwt =require("jsonwebtoken");

// Inscription
router.post("/register", async (req, res) => {
  // Création d'un nouvel utilisateur avec les données du corps de la requête
  const newUser = new User({
    username: req.body.username, // Nom d'utilisateur
    email: req.body.email, // Adresse e-mail
    password: CryptoJS.AES.encrypt( // Cryptage du mot de passe
      req.body.password, // Mot de passe à crypter
      process.env.PASS_SEC // Clé de chiffrement
    ).toString(),
  });

  try {
    // Enregistrement du nouvel utilisateur dans la base de données
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Réponse avec l'utilisateur enregistré
  } catch (err) {
    res.status(500).json(err); // Erreur interne du serveur en cas d'échec de l'enregistrement
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
