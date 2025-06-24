const express = require('express');
const nodemailer = require('nodemailer');
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
router.post('/review_send-email', async (req, res) => {
  const { email, subject, reviewDetails } = req.body; // Assuming reviewDetails contains review information

  try {
    // Format the review details into a message
    const reviewMessage = `
      Review Details:
      ${reviewDetails}

      Thank you for your feedback!
    `;

    const mailOptions = {
      from: '"Reviews" <abctest975@gmail.com>',
      to: email, // Recipient email address
      subject: subject,
      text: reviewMessage, // Plain text message with review details
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
