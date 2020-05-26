const express = require('express');
const router = express.Router();

// Controllers
const userCtrl = require('../controllers/user');
const doctorCtrl = require('../controllers/doctor');
// Middlewares
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

//route to login
router.post('/login', userCtrl.login);
//route to signin
router.post('/signin', userCtrl.signin);
// route pour verifier la perssitance de la connection
router.post('/checkislogged', auth, userCtrl.checkIsLogged );
// route pour verifier la persistance de la connection admin
router.post('/checkisadmin', adminAuth, doctorCtrl.checkIsLogged );

module.exports = router;