const Review = require('../model/Reviews.model.js');


const addReview = async (req, res) => {
    const { userName, userEmail, userReviewsByStar, reviewMessage } = req.body;

    try {
        const newReview = new Review({ userName, userEmail, userReviewsByStar, reviewMessage });
        await newReview.save();
        res.status(201).json({ message: 'Review added successfully!', review: newReview });
    } catch (error) {
        res.status(400).json({ message: 'Error adding review', error });
    }
};
const updateReview = async (req, res) => {
    const { id } = req.params;
    const { userName, userEmail, userReviewsByStar, reviewMessage } = req.body;
    try {
        const updatedReview = await Review.findByIdAndUpdate(id,{ userName, userEmail, userReviewsByStar, reviewMessage },{ new: true }
        );

        if (updatedReview) {
            res.status(200).json({ message: 'Review updated successfully!', review: updatedReview });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating review', error });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReview = await Review.findByIdAndDelete(id);
        if (deletedReview) {
            res.status(200).json({ message: 'Review deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
};


const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
};

const getByIdReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).json({ message: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching review', error });
    }
};

module.exports = {
    addReview,
    updateReview,
    deleteReview,
    getReviews,
    getByIdReview
};
