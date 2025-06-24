import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UpdatePromotion.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePromotion = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [promotion, setPromotion] = useState({
    productName: '',
    promotionType: '',
    promoCode: '',
    promoDiscount: '',
    sponsorName: '',
    promoStartDate: '',
    promoEndDate: ''
  });

 
  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/promo/${id}`);
        setPromotion({
          ...response.data,
          promoStartDate: response.data.promoStartDate.split('T')[0], 
          promoEndDate: response.data.promoEndDate.split('T')[0] 
        });
      } catch (error) {
        console.error('Error fetching promotion:', error);
      }
    };

    fetchPromotion();
  }, [id]);

  const handleChange = (e) => {
    setPromotion({ ...promotion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/promo/${id}`, promotion);
      alert('Promotion updated successfully!');
      navigate('/adminPromo'); 
    } catch (error) {
      console.error('Error updating promotion:', error);
      alert('Failed to update promotion');
    }
  };

  return (
    <div className="update-promo-container">
      <h2>Update Promotion</h2>
      <form onSubmit={handleSubmit} className="update-promo-form">
        <input
          type="text"
          name="productName"
          value={promotion.productName}
          onChange={handleChange}
          required
          placeholder="Product Name"
        />
        <input
          type="text"
          name="promotionType"
          value={promotion.promotionType}
          onChange={handleChange}
          required
          placeholder="Promotion Type"
        />
        <input
          type="text"
          name="promoCode"
          value={promotion.promoCode}
          onChange={handleChange}
          required
          placeholder="Promotion Code"
        />
        <input
          type="number"
          name="promoDiscount"
          value={promotion.promoDiscount}
          onChange={handleChange}
          required
          placeholder="Discount %"
        />
        <input
          type="text"
          name="sponsorName"
          value={promotion.sponsorName}
          onChange={handleChange}
          required
          placeholder="Sponsor Name"
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
        <button type="submit">Update Promotion</button>
      </form>
    </div>
  );
};

export default UpdatePromotion;
