const express = require('express');
const app = express();
const dotenv = require('dotenv').config();


app.listen(port, ()=> {
    console.log(`E-Commerce App listening on port ${port}`);
});