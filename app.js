const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//require routes
const userRoutes = require('./routes/users');

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

const port = process.env.PORT || 5000;

app.listen(port, () =>{
    console.log(`Server running on ${port}`);
});