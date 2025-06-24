const express = require('express');
const nodemailer = require('nodemailer');
const axios = require('axios');
const router = express.Router();

// Set up transporter using the provided SMTP details
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: 'abctest975@gmail.com', // Your email address
    pass: 'goiletkpztstsndk', // Your app-specific password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Define the route to send an email
router.post('/promo_send-email', async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const promotionsResponse = await axios.get('http://localhost:5000/promo');
    const promotions = promotionsResponse.data;

    // Format promotion details into a message
    const promotionDetails = promotions
      .map(
        (promo) =>
          `Product: ${promo.productName}, Type: ${promo.promotionType}, Code: ${promo.promoCode}, Discount: ${promo.promoDiscount}%, Sponsor: ${promo.sponsorName}, Start: ${new Date(promo.promoStartDate).toLocaleDateString()}, End: ${new Date(promo.promoEndDate).toLocaleDateString()}`
      )
      .join('\n');

    const fullMessage = `${message}\n\nPromotion Details:\n${promotionDetails}`;

    const mailOptions = {
      from: '"Promotions" <abctest975@gmail.com>',
      to: email, // Recipient email address
      subject: subject,
      text: fullMessage, // Plain text message
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

module.exports = router;
