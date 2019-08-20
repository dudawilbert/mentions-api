const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
require('dotenv').config();

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const DATABASE_CONNECTION_STRING = 'mongodb+srv://dudawilbert:Q33XTsgdPWRJanYB@cluster0-iqbtp.mongodb.net/test?retryWrites=true&w=majority'
// Database
mongoose.connect(DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
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

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const mentionsRoutes = require('./routes/mentions-routes');
app.use('/mentions', mentionsRoutes);

// const selosRoutes = require('./routes/selos-routes');
// app.use('/selos', selosRoutes);

module.exports = app;