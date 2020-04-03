const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
//require routes
const userRoutes = require('./routes/users');

//app
const app  = express();

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true
}).then(() => console.log("DB connected"));


//routes
app.use(userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});