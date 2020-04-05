const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//require routes
const userRoutes = require('./routes/users');
const braintreeRoutes = require('./routes/braintree');

//app
const app  = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log("DB connected"));


//routes
app.use(userRoutes);
app.use(braintreeRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});