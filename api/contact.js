// File: /api/contact.js

import axios from 'axios';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Extract form data from request body
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Your WhatsApp number (with country code)
    const whatsappNumber = '1234567890'; // Replace with your actual number
    
    // Format message for WhatsApp
    const formattedMessage = `
*New Contact Form Submission*
*Name:* ${name}
*Email:* ${email}
*Subject:* ${subject || 'N/A'}
*Message:* ${message}
    `.trim();
    
    // Create WhatsApp URL (this opens WhatsApp with a pre-filled message)
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(formattedMessage)}`;
    
    // Optional: Send yourself an email notification
    // This would require an email service like SendGrid, Mailgun, etc.
    // await sendEmailNotification(formattedMessage);
    
    // Optional: Save to database
    // await saveToDatabase({ name, email, subject, message, timestamp: new Date() });
    
    // Return success with WhatsApp URL
    return res.status(200).json({ 
      success: true, 
      whatsappUrl, 
      message: 'Form submitted successfully' 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to process form submission' 
    });
  }
}
