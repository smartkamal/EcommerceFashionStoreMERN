const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//require routes
const userRoutes = require('./routes/users');
const productRoutes = require("./routes/product");
//app
const app  = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log("DB connected"));


//route middleware
app.use(userRoutes);
app.use(productRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});