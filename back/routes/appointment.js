const express = require('express');
const router = express.Router();

// Controllers
const appointmentCtrl = require('../controllers/appointment');
// Middlewares
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// rucuperation des rdv d'un utilisateur (par id)
router.get('/user', auth, appointmentCtrl.getUserAppointment);
// route get
router.get('/',adminAuth, appointmentCtrl.getAllAppointments);
// recuperation des futurs rendez-vous
router.get('/:doctorId/futur/:dateTime', appointmentCtrl.getAllFuturAppointments);
// recuperation data avec un parametre
router.get('/:id',auth, appointmentCtrl.getOneAppointment);
// modification route put
router.put('/:id',auth, appointmentCtrl.modifyAppointment);
router.put('/admin/:id', adminAuth, appointmentCtrl.modifyAppointment);
// route de supression d'un rendezvous par l'utilisateur
router.delete('/:id',auth, appointmentCtrl.deleteAppointment);
router.delete('/admin/:id',adminAuth, appointmentCtrl.deleteAppointmentAdmin);
// route post
router.post('/', auth, appointmentCtrl.createAppointment);
router.post('/admin', adminAuth, appointmentCtrl.createAppointment);

module.exports = router;