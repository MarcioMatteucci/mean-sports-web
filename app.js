// 3rd party imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Custom files imports
const config = require('./config/index');

//Express
const app = express();

// Mongoose
mongoose.connect(config.localDbUri, { useMongoClient: true });
mongoose.Promise = global.Promise;

// On Connection
mongoose.connection.on('connected', () => {
   console.log('Connected to database: ' + config.localDbUri);
});

// On Error
mongoose.connection.on('error', (err) => {
   console.log('Database error: ' + err);
});

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server listening at ${port}`);
});