const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
  console.log('Function called with method:', event.httpMethod);
  
  // Set the API key
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('SENDGRID_API_KEY not found in environment variables');
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: 'SendGrid API key not configured' })
    };
  }
  
  sgMail.setApiKey(apiKey);
  console.log('SendGrid API key set');

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: ''
    };
  }

  try {
    console.log('Parsing request body...');
    const { formData, timeSlot } = JSON.parse(event.body);
    console.log('Form data received:', formData);
    console.log('Time slot:', timeSlot);

    const verifiedSender = process.env.SENDGRID_VERIFIED_SENDER || 'hello@nexai.com';
    const companyEmail = process.env.COMPANY_EMAIL || 'hello@nexai.com';
    
    console.log('Using verified sender:', verifiedSender);
    console.log('Sending to company email:', companyEmail);

    // Company notification email
    const companyEmailData = {
      to: companyEmail,
      from: verifiedSender,
      subject: `New Consultation Request - ${formData.company}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f7f7f7; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-block { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            .label { font-weight: bold; color: #333; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New AI Project Consultation Request</h1>
            </div>
            <div class="content">
              <div class="info-block">
                <h2>Client Information</h2>
                <p><span class="label">Name:</span> ${formData.name}</p>
                <p><span class="label">Email:</span> ${formData.email}</p>
                <p><span class="label">Company:</span> ${formData.company}</p>
                <p><span class="label">Phone:</span> ${formData.phone || 'Not provided'}</p>
              </div>
              
              <div class="info-block">
                <h2>Project Details</h2>
                <p><span class="label">Service Type:</span> ${formData.projectType || 'Not specified'}</p>
                <p><span class="label">Budget:</span> ${formData.budget || 'Not specified'}</p>
                <p><span class="label">Timeline:</span> ${formData.timeline || 'Not specified'}</p>
                <p><span class="label">Meeting Time:</span> ${timeSlot || 'Not scheduled'}</p>
              </div>
              
              <div class="info-block">
                <h2>Project Description</h2>
                <p>${formData.description || 'No description provided'}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Client confirmation email
    const clientEmailData = {
      to: formData.email,
      from: verifiedSender,
      subject: 'Your AI Consultation is Confirmed - Nex AI',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: white; padding: 40px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px; }
            .info-card { background: #f8f9fa; padding: 25px; margin: 20px 0; border-radius: 10px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Your AI Consultation is Confirmed!</h1>
            </div>
            <div class="content">
              <p>Hi <strong>${formData.name}</strong>,</p>
              
              <p>Thank you for choosing Nex AI for your AI transformation journey! We're excited to discuss how we can help ${formData.company} leverage cutting-edge AI technology.</p>
              
              <div class="info-card">
                <h2>📅 Your Consultation Details</h2>
                <p><strong>Date & Time:</strong> ${timeSlot || 'To be scheduled'}</p>
                <p><strong>Duration:</strong> 30 minutes</p>
                <p><strong>Format:</strong> Video Call (link will be sent 24 hours before)</p>
              </div>
              
              <h3>What We'll Discuss:</h3>
              <ul>
                <li>Your specific AI requirements and goals</li>
                <li>Custom solution architecture tailored to your needs</li>
                <li>Realistic timeline and implementation milestones</li>
                <li>Investment options and ROI projections</li>
                <li>Next steps and action plan</li>
              </ul>
              
              <h3>How to Prepare:</h3>
              <ul>
                <li>Gather any examples or references you'd like to discuss</li>
                <li>Think about your must-have features and nice-to-haves</li>
                <li>Prepare any questions about our process or technology</li>
              </ul>
              
              <p>We'll send you a calendar invite and meeting link 24 hours before our scheduled call.</p>
              
              <p>Looking forward to speaking with you!</p>
              
              <p><strong>Best regards,<br>The Nex AI Team</strong></p>
              
              <div class="footer">
                <p>Nex AI - Transforming Business with AI<br>
                📧 hello@nexai.com | 📱 +1 (555) 123-4567<br>
                🌐 www.nexai.com</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    console.log('Sending company email...');
    await sgMail.send(companyEmailData);
    console.log('Company email sent successfully');

    console.log('Sending client email...');
    await sgMail.send(clientEmailData);
    console.log('Client email sent successfully');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        message: 'Emails sent successfully'
      })
    };

  } catch (error) {
    console.error('Detailed error:', error);
    console.error('Error response:', error.response?.body);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to send emails',
        details: error.message,
        sendGridError: error.response?.body
      })
    };
  }
};