import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js"; 
import { jsPDF } from "jspdf"; // For generating PDF report
import "./css/AdminPromotion.css";

Chart.register(CategoryScale, LinearScale, BarElement);

const AdminPromotion = () => {
  const [promotions, setPromotions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [adminEmail, setAdminEmail] = useState(""); // State for admin email
  const navigate = useNavigate();

  const fetchPromotions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/promo");
      setPromotions(response.data);
      generateChartData(response.data);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []); 
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/promo/${id}`);
      setPromotions(promotions.filter((promo) => promo._id !== id));
      alert("Promotion deleted successfully!");
      fetchPromotions();
    } catch (error) {
      console.error("Error deleting promotion:", error);
      alert("Failed to delete promotion");
    }
  };

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const generateChartData = (promotions) => {
    const discountRanges = [0, 0, 0, 0, 0];
    promotions.forEach((promo) => {
      const discount = promo.promoDiscount;
      if (discount <= 10) discountRanges[0]++;
      else if (discount <= 20) discountRanges[1]++;
      else if (discount <= 30) discountRanges[2]++;
      else if (discount <= 40) discountRanges[3]++;
      else if (discount <= 50) discountRanges[4]++;
    });

    setChartData({
      labels: ["1-10%", "11-20%", "21-30%", "31-40%", "41-50%"],
      datasets: [
        {
          label: "Product Count",
          backgroundColor: "#4caf50",
          data: discountRanges,
        },
      ],
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPromotions = promotions.filter((promo) =>
    promo.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.sponsorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    promo.promoCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Promotions Report", 10, 10);
    
    const headers = ["Product Name", "Promotion Type", "Promo Code", "Promo Discount", "Sponsor Name", "Start Date", "End Date"];
    const data = filteredPromotions.map(promo => [
      promo.productName,
      promo.promotionType,
      promo.promoCode,
      `${promo.promoDiscount}%`,
      promo.sponsorName,
      new Date(promo.promoStartDate).toLocaleDateString(),
      new Date(promo.promoEndDate).toLocaleDateString()
    ]);
    
    doc.autoTable({
      head: [headers],
      body: data,
    });

    doc.save("promotions_report.pdf");
  };

  const handleSendEmail = async () => {
    try {
      await axios.post("http://localhost:5000/promo_mail/promo_send-email", {
        email: adminEmail,
        promotions: filteredPromotions,
      });
      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="admin-promo-container">
      <h2>Admin Promotion Panel</h2>
      
      <div className="promo-controls">
        <input
          type="text"
          placeholder="Search by product name, sponsor, or code"
          value={searchTerm}
          onChange={handleSearch}
          className="search-box"
        />
        <input
          type="email"
          placeholder="Enter admin email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          className="email-input"
        />
        <button
          onClick={handleGenerateReport}
          className="generate-report-button"
        >
          Generate PDF Report
        </button>
        <button
          onClick={handleSendEmail}
          className="send-email-button"
          disabled={!adminEmail}
        >
          Send Email
        </button>
      </div>

      <div className="promo-chart">
        {chartData ? <Bar data={chartData} /> : <p>Loading chart...</p>}
      </div>

      <div className="add-promotion-button-container">
        <button
          onClick={() => navigate("/addPromo")}
          className="add-promotion-button"
        >
          Add Promotion
        </button>
      </div>

      <table className="promo-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Type</th>
            <th>Code</th>
            <th>Discount</th>
            <th>Sponsor</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPromotions.map((promo) => (
            <tr key={promo._id}>
              <td>{promo.productName}</td>
              <td>{promo.promotionType}</td>
              <td>{promo.promoCode}</td>
              <td>{promo.promoDiscount}%</td>
              <td>{promo.sponsorName}</td>
              <td>{new Date(promo.promoStartDate).toLocaleDateString()}</td>
              <td>{new Date(promo.promoEndDate).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleEdit(promo._id)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(promo._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPromotion;
