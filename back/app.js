const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileupload = require('express-fileupload');


const config = require('./config');

const appointmentRoutes = require('./routes/appointment');
const userRoutes = require('./routes/user');
const parameterRoutes = require('./routes/parameter');
const authRoutes = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');

const app = express();


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');



mongoose.connect(`mongodb://${config.dbInfos}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
    console.log(`mongodb://${config.dbInfos}`);
    console.log(error)
    console.log('Connexion à MongoDB échouée !');
  });

// cors middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// json parser
app.use(bodyParser.json());

// File parser
app.use(fileupload());

// router des rendez-vous
app.use('/appointment', appointmentRoutes);
// router des utilisateurs
app.use('/user', userRoutes);
// router des parametres
app.use('/parameter', parameterRoutes);
// routeur d'authentification
app.use('/auth', authRoutes);
// routeur des doctor
app.use('/doctor', doctorRoutes);


module.exports = app;
