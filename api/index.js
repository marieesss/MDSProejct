const express= require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/User');
const authRoute = require('./routes/Auth');
const productRoute = require('./routes/Product');

dotenv.config();


    mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

  

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Backend server is listening on port 3000")
});
