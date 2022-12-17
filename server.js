const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
let admin = require("firebase-admin");
let serviceAccount = require("./web3-real-estate-firebase-adminsdk-i5y0b-cdbcf41017.json");

//Firebase admin innit

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// middleware
app.use(cors());
app.use(express.json());

//API ROUTES

//Tours Route
// app.use('/categories', require('./Routes/Category.route'));
// app.use('/orders', require('./Routes/Order.route'));

app.get('/', (req, res) => {
    res.send('Web3 Real Estate server is running');
});

module.exports = app;
