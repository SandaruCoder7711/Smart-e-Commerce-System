const Promotion = require('../model/Promotion.model.js');

const createPromo = async (req, res) => {
    const { productName, promotionType, promoCode, promoDiscount, sponsorName, promoStartDate, promoEndDate } = req.body;

    try {
        const newPromotion = new Promotion({
            productName,
            promotionType,
            promoCode,
            promoDiscount,
            sponsorName,
            promoStartDate,
            promoEndDate
        });

        await newPromotion.save();
        res.status(201).json({ message: 'Promotion created successfully!', promotion: newPromotion });
    } catch (error) {
        res.status(400).json({ message: 'Error creating promotion', error });
    }
};

const getAllPromos = async (req, res) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching promotions', error });
    }
};


const getByIdPromo = async (req, res) => {
    const { id } = req.params;

    try {
        const promotion = await Promotion.findById(id);
        if (promotion) {
            res.status(200).json(promotion);
        } else {
            res.status(404).json({ message: 'Promotion not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching promotion', error });
    }
};


const updatePromo = async (req, res) => {
    const { id } = req.params;
    const { productName, promotionType, promoCode, promoDiscount, sponsorName, promoStartDate, promoEndDate } = req.body;

    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(
            id,
            { productName, promotionType, promoCode, promoDiscount, sponsorName, promoStartDate, promoEndDate },
            { new: true }
        );

        if (updatedPromotion) {
            res.status(200).json({ message: 'Promotion updated successfully!', promotion: updatedPromotion });
        } else {
            res.status(404).json({ message: 'Promotion not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating promotion', error });
    }
};


const deletePromo = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPromotion = await Promotion.findByIdAndDelete(id);
        if (deletedPromotion) {
            res.status(200).json({ message: 'Promotion deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Promotion not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting promotion', error });
    }
};

module.exports = {
    createPromo,
    getAllPromos,
    getByIdPromo,
    updatePromo,
    deletePromo
};
