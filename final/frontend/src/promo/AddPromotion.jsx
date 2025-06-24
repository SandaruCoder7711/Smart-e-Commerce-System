import React, { useState } from "react";
import axios from "axios";
import "./css/AddPromo.css";

const AddPromotion = () => {
  const [promotion, setPromotion] = useState({
    productName: "",
    promotionType: "",
    promoCode: "",
    promoDiscount: "",
    sponsorName: "",
    promoStartDate: "",
    promoEndDate: "",
  });

  const handleChange = (e) => {
    setPromotion({ ...promotion, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    const { promoCode, promoDiscount, sponsorName } = promotion;
    const promoCodePattern = /^P\d{4}$/; // Pattern for promo code starting with "P" followed by 4 digits
    const isPromoCodeValid = promoCodePattern.test(promoCode);
    const isPromoDiscountValid = promoDiscount >= 1 && promoDiscount <= 50;
    const sponsorNamePattern = /^[A-Za-z\s]+$/; // Pattern for sponsor name containing only letters and spaces
    const isSponsorNameValid = sponsorNamePattern.test(sponsorName);

    if (!isPromoCodeValid) {
      alert("Promo Code must start with 'P' followed by 4 digits (e.g., P1234).");
      return false;
    }

    if (!isPromoDiscountValid) {
      alert("Promo Discount must be between 1 and 50.");
      return false;
    }

    if (!isSponsorNameValid) {
      alert("Sponsor Name must contain only letters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return; // Exit if validation fails
    }

    try {
      await axios.post("http://localhost:5000/promo", {
        ...promotion,
        promoCode: promotion.promoCode.toString(),
      });
      alert("Promotion added successfully!");
      setPromotion({
        productName: "",
        promotionType: "",
        promoCode: "",
        promoDiscount: "",
        sponsorName: "",
        promoStartDate: "",
        promoEndDate: "",
      });
    } catch (error) {
      console.error("Error adding promotion:", error);
      alert("Failed to add promotion");
    }
  };

  return (
    <div className="add-promo-container">
      <h2>Add New Promotion</h2>
      <form onSubmit={handleSubmit} className="add-promo-form">
        <input
          type="text"
          name="productName"
          value={promotion.productName}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="promotionType"
          value={promotion.promotionType}
          onChange={handleChange}
          placeholder="Promotion Type"
          required
        />
        <input
          type="text" // Change type to "text" for promoCode
          name="promoCode"
          value={promotion.promoCode}
          onChange={handleChange}
          placeholder="Promo Code (e.g., P1234)"
          required
        />
        <input
          type="number"
          name="promoDiscount"
          value={promotion.promoDiscount}
          onChange={handleChange}
          placeholder="Promo Discount (%)"
          required
        />
        <input
          type="text"
          name="sponsorName"
          value={promotion.sponsorName}
          onChange={handleChange}
          placeholder="Sponsor Name"
          required
        />
        <input
          type="date"
          name="promoStartDate"
          value={promotion.promoStartDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="promoEndDate"
          value={promotion.promoEndDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Promotion</button>
      </form>
    </div>
  );
};

export default AddPromotion;
