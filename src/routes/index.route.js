const express = require('express');

const app = express();


app.use('/auth', require('../routes/auth.route'));
app.use('/events', require('../routes/events.route'));

module.exports = app;