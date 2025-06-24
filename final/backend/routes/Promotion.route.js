const express = require('express');
const router = express.Router();
const {
    createPromo,
    getAllPromos,
    getByIdPromo,
    updatePromo,
    deletePromo
} = require('../controllers/Promotion.controller.js');


router.post('/', createPromo);
router.get('/', getAllPromos);
router.get('/:id', getByIdPromo);
router.put('/:id', updatePromo);
router.delete('/:id', deletePromo);

module.exports = router;
