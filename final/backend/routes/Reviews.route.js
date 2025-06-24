const express = require('express');
const router = express.Router();
const {
    addReview,
    updateReview,
    deleteReview,
    getReviews,
    getByIdReview
} = require('../controllers/Reviews.controller.js');

router.post('/', addReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);
router.get('/', getReviews);
router.get('/:id', getByIdReview);

module.exports = router;
