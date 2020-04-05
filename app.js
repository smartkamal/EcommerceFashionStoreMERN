const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//require routes
const userRoutes = require('./routes/users');
const productRoutes = require("./routes/product");
const braintreeRoutes = require('./routes/braintree');


//app
const app  = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log("Database connected"));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


//routes

app.use("/api",userRoutes);
app.use("/api",productRoutes);
app.use("/api",braintreeRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});