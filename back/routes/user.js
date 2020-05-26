const express = require('express');
const router = express.Router();

// Controllers
const userCtrl = require('../controllers/user');
// midlleware 
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

/**
 * proteger avec un middleware qui filtre le role admin
 */
// route get
router.get('/',adminAuth, userCtrl.getAllUsers);
// recuperation data avec un parametre
router.get('/:id', userCtrl.getUserById);
// modification route put
router.put('/changePassword', auth, userCtrl.modifyPassword);
router.put('/:id',adminAuth , userCtrl.modifyUserAdmin);
router.put('/',auth , userCtrl.modifyUser);
// route de supression
router.delete('/:id',adminAuth, userCtrl.deleteUser);
// route post
router.post('/',adminAuth, userCtrl.createUser);

router.post('/forgot', userCtrl.forgotPassword);
router.post('/renew', userCtrl.renewPassword);



module.exports = router;