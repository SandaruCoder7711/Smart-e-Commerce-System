const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userReviewsByStar: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewMessage: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', reviewSchema);
