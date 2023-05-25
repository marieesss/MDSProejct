const express= require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/User');
const authRoute = require('./routes/Auth');
const productRoute = require('./routes/Product');
const cartRoute = require('./routes/Cart');
const orderRoute = require('./routes/Order');
const HubRoute = require('./routes/Hub');
const FermierRoute = require('./routes/Fermier');
const stripeRoute = require("./routes/stripe");
const cors = require('cors');

dotenv.config();


    mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

  app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/hub", HubRoute);
app.use("/api/fermier", FermierRoute);
app.use("/api/checkout", stripeRoute);

  

app.listen(80, ()=>{
    console.log("Backend server is listening on port 80")
});
