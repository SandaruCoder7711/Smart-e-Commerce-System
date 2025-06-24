import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/DisplayPromotion.css";

const DisplayPromotion = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/promo/");
        setPromotions(response.data);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div>
      <div>
        <h2 className="promotions-title">Exciting Promotions Just for You!</h2>
        <p className="promotions-description">
          Discover amazing discounts on your favorite products. Grab them before
          they are gone!
        </p>
      </div>
      <div className="promotion-grid">
        {promotions.length > 0 ? (
          promotions.map((promo) => (
            <div
              key={promo._id}
              className="promotion-card"
              style={{ backgroundColor: getRandomColor() }}
            >
              <div className="promotion-header">
                <h3 className="promotion-title">{promo.productName}</h3>
                <span className="promotion-discount">
                  {promo.promoDiscount}% OFF
                </span>
              </div>
              <p className="promotion-description">
                {promo.shortDescription || "Get the best deals!"}
              </p>
              <p>
                <strong>Sponsor:</strong> {promo.sponsorName}
              </p>
              <div className="promotion-dates">
                <span className="promo-date">
                  Valid From:{" "}
                  {new Date(promo.promoStartDate).toLocaleDateString()}
                </span>
                <span className="promo-date">
                  Valid Until:{" "}
                  {new Date(promo.promoEndDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No promotions available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayPromotion;
