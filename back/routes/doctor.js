const express = require('express');
const router = express.Router();

// Controllers
const doctorCtrl = require('../controllers/doctor');
const adminAuth = require('../middlewares/adminAuth');


// route get
router.get('/', doctorCtrl.getAllDoctors);
// recuperation data avec un parametre
router.get('/:id', doctorCtrl.getDoctorById);
// recuperation data avec un parametre a partir du slug
router.get('/slug/:slug', doctorCtrl.getDoctorBySlug);

//route post login
router.post('/login', doctorCtrl.login);
// route admin checkisadmin
router.post('/checkIsLogged', adminAuth, doctorCtrl.checkIsLogged);
// route pour creer des nouveau doctor
router.post('/create', adminAuth, doctorCtrl.createDoctor);
// route de d'upload d'avatar
router.post('/avatar', adminAuth, doctorCtrl.uploadAvatar);

/**
 * TODO proteger avec un middleware qui filtre le role d'admin
 */
// modification route put
router.put('/:id',adminAuth, doctorCtrl.modifyDoctor);
// modification du password put
router.put('/changePassword/:id', adminAuth, doctorCtrl.modifyPassword);
// route de supression
router.delete('/:id', doctorCtrl.deleteDoctor);
// route post
router.post('/', doctorCtrl.createDoctor);


// route de mot de pass oublé
router.post('/forgot', doctorCtrl.forgotPassword);
router.post('/renew', doctorCtrl.renewPassword);


module.exports = router;