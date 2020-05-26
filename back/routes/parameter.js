const express = require('express');
const router = express.Router();

// Controllers
const parameterCtrl = require('../controllers/parameter');


// route get
router.get('/', parameterCtrl.getAllParameters);
// recuperation data avec un parametre
router.get('/:id', parameterCtrl.getOneParameter);

/**
 * TODO proteger avec un middleware qui filtre le role d'admin
 */
// modification route put
router.put('/:id', parameterCtrl.modifyParameter);
// route de supression
router.delete('/:id', parameterCtrl.deleteParameter);
// route post
router.post('/', parameterCtrl.createParameter);

module.exports = router;