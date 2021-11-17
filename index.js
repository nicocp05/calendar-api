const express = require('express');
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '.env.' + process.env.NODE_ENV)
});
const cors = require('cors');
const morgan = require('morgan');
const { connection } = require('./src/database/db');

const app = express();
const port = process.env.PORT || 3000;

// Public
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// Database
connection();

// Routes
app.use('/', require('./src/routes/index.route'));

// Listen
app.listen(port, () => {
    console.log(`Server on port ${port}`);
});