const express = require('express');

// CONFIGURATION
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

// ROUTES

app.get('/', (req, res) => {
    res.send('Welcome to an Awesome app about breads!')
})

// LISTEN
app.listen(PORT, () => {
    console.log('nomming at port', PORT);
})

const breadsController = require('./controllers/breads_controller.js');
app.use('/breads', breadsController);