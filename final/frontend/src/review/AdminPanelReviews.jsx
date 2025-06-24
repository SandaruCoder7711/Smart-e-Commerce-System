import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import "./css/AdminPanelReviews.css";

const AdminPanelReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [ratingSummary, setRatingSummary] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });


  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/review");
      setReviews(response.data);
      setFilteredReviews(response.data);
      calculateRatingSummary(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:5000/review/${id}`);
        alert("Review deleted successfully!");
        fetchReviews(); 
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review");
      }
    }
  };

 
  const calculateRatingSummary = (reviewsArray) => {
    const summary = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviewsArray.forEach((review) => {
      summary[review.userReviewsByStar]++;
    });
    setRatingSummary(summary);
  };


  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchTerm(search);
    const filtered = reviews.filter(
      (review) =>
        review.userName.toLowerCase().includes(search) ||
        review.userReviewsByStar.toString().includes(search)
    );
    setFilteredReviews(filtered);
  };


  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reviews Report", 20, 10);
    doc.autoTable({
      head: [["User Name", "Rating", "Review"]],
      body: filteredReviews.map((review) => [
        review.userName,
        review.userReviewsByStar,
        review.reviewMessage,
      ]),
    });
    doc.save("reviews-report.pdf");
  };

  useEffect(() => {
    fetchReviews();
  }, []);


  const pieData = [
    { name: "1 Star", value: ratingSummary[1] },
    { name: "2 Stars", value: ratingSummary[2] },
    { name: "3 Stars", value: ratingSummary[3] },
    { name: "4 Stars", value: ratingSummary[4] },
    { name: "5 Stars", value: ratingSummary[5] },
  ];

  const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#FF0000"];

  return (
    <div className="admin-reviews-container">
      <h2>Admin Panel: Reviews</h2>
      <input
        type="text"
        placeholder="Search by name or rating..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-box"
      />

      <button onClick={generatePDF} className="pdf-button">
        Generate PDF
      </button>

      <div className="chart-container">
        <h3>Rating Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="admin-reviews-list">
        {filteredReviews.length > 0 ? (
          <table className="reviews-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.userName}</td>
                  <td>{review.userReviewsByStar} Stars</td>
                  <td>{review.reviewMessage}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanelReviews;
