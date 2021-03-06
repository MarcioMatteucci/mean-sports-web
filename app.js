// 3rd party modules imports
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Custom files imports
const config = require('./config/index');
const routes = require('./routes/index');

//Express
const app = express();

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(config.localDbUri, { useMongoClient: true });

mongoose.connection.on('connected', () => {
   console.log('Conectado a la DB: ' + config.localDbUri);
});

mongoose.connection.on('error', (err) => {
   console.log('Error en la conexion a la DB: ' + err);
});

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static files and Angular prod code
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Routes
app.use('/api', routes);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
   console.log(`Server escuchando en puerto ${port}`);
});