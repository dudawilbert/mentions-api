const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const DATABASE_CONNECTION_STRING = 'mongodb+srv://dudawilbert:oa6f4oQR1AJaO2IY@cluster0-iqbtp.mongodb.net/test?retryWrites=true&w=majority'
// Database
mongoose.connect(DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', (err) => {
    console.log(`Mongoose default connection has occured \n${err}\n\n\n`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});
app.use(cors({origin: 'http://localhost:8080'}));
// Load models
const Mentions = require('./models/mentions');
const Selos = require('./models/selos');
const Tons = require('./models/tons');
const Calendario = require('./models/calendario');

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes);

const tonsRoutes = require('./routes/tons-routes');
app.use('/tons', tonsRoutes);

const selosRoutes = require('./routes/selos-routes');
app.use('/selos', selosRoutes);

const calendarioRoutes = require('./routes/calendario-routes');
app.use('/calendario', calendarioRoutes);

module.exports = app;