const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // Récupération de l'en-tête d'authentification
  const authHeader = req.headers.token;
  
  // Vérification de la présence d'un jeton d'authentification
  if (authHeader) {
    // Extraction du jeton à partir de la chaîne d'en-tête
    const token = authHeader.split(" ")[1];
    
    // Vérification de la validité du jeton avec la méthode jwt.verify
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      // Si le jeton est invalide, renvoie une erreur 403 avec un message approprié
      if (err) res.status(403).json("Token is not valid!");
      
      // Si le jeton est valide, ajoute l'utilisateur associé au jeton à l'objet requête
      // et passe au middleware suivant en appelant la fonction de rappel next
      req.user = user;
      next();
    });
  } else {
    // Si aucun jeton d'authentification n'est trouvé, renvoie une erreur 401 avec un message approprié
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    const authHeader = req.headers.userid;
    const userid = authHeader.split(" ")[1];
    if (req.user.id === userid || req.user.isAdmin) {
      console.log("youpi")
      next();

    } else {
      console.log(req.user.id)
      console.log(userid)
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};


const verifyTokenAdmin = (req, res, next) => {
  // appelle la fonction verifyToken pour vérifier la validité du token
  // et pour voir l'objet du token
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      //si l'utilisateur est admin on passe au middleware suivant
      next();
    } else {
      //si l'utilisateur n'est pas admin la requête n'abouti pas
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAuth,
  verifyTokenAdmin,
  verifyTokenUser
};