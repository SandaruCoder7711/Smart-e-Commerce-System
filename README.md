# Smart-e-Commerce-System
# ⭐ Review and Rating Management System

A full-stack web application that allows users to submit, view, edit, and delete product or service reviews with a star rating system. It also calculates average ratings, summarizes rating counts, and sends a thank-you email to reviewers.

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [License](#license)

---

## ✨ Features

- ⭐ Submit reviews with 1–5 stars
- 🧾 View, update, and delete reviews
- 📬 Send thank-you email after submission
- 📊 Show star distribution and average rating
- 🎨 User-friendly and responsive UI
- 🔄 Live updates after review actions

---

## 🛠️ Tech Stack

### 🔹 Frontend:
- React.js
- Axios
- React Modal
- React Icons
- Font Awesome

### 🔹 Backend:
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Nodemailer
- dotenv

---

## 💻 Frontend

- Star-based input system
- Modal popup for adding/editing reviews
- Visual rating summary (stars + numbers)
- Interactive user interface with styling

### Main Components:
- `UserAddReviews.js` – Review logic
- `StarRating.js` – Star input
- `UserAddReviews.css` – Styling

---

## 🔙 Backend

- RESTful API with CRUD for reviews
- Sends thank-you emails using Nodemailer
- Connected to MongoDB using Mongoose

### API Endpoints:
| Method | Endpoint                       | Description              |
|--------|--------------------------------|--------------------------|
| GET    | `/review`                      | Get all reviews          |
| POST   | `/review`                      | Submit a review          |
| PUT    | `/review/:id`                  | Edit a review            |
| DELETE | `/review/:id`                  | Delete a review          |
| POST   | `/review_mail/review_send-email` | Send thank-you email |

-
