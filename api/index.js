const express= require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/User');
const authRoute = require('./routes/Auth');
const productRoute = require('./routes/Product');
const orderRoute = require('./routes/Order');
const HubRoute = require('./routes/Hub');
const FermierRoute = require('./routes/Fermier');
const stripeRoute = require("./routes/stripe");
const cors = require('cors');

dotenv.config();

  // connexion à la base de données 
    mongoose
  .connect(process.env.MONGO_URL)
  // affiche le message si la connexion est établie
  .then(() => console.log("DB Connection Successfull!"))
  // affiche un message d'erreur si la connection échoue
  .catch((err) => {
    console.log(err);
  });

  app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/hub", HubRoute);
app.use("/api/fermier", FermierRoute);
app.use("/api/checkout", stripeRoute);

  

app.listen(5000, ()=>{
    console.log("Backend server is listening on port 5000")
});
