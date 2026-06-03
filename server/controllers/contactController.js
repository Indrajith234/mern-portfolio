const Message = require('../models/Message');
const nodemailer = require('nodemailer');

const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send email only if configured
    if (
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      !process.env.EMAIL_USER.includes('your_gmail')
    ) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `Portfolio Contact: Message from ${name}`,
          html: `
            <div style="font-family: Inter, sans-serif; max-width: 600px; padding: 20px;">
              <h2 style="color: #00d4ff;">New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p style="background: #f5f5f5; padding: 12px; border-radius: 8px;">${message}</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Email send error:', emailError.message);
      }
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContact };
