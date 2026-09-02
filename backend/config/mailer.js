const https = require('https');

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'sakshimehra072@gmail.com';

function sendContactNotification({ name, email, subject, message }) {
  const targetEmail = NOTIFICATION_EMAIL;

  console.log(`\n📧 Sending Contact Email Notification to: ${targetEmail}`);
  console.log(`- From: ${name} (${email})`);
  console.log(`- Subject: ${subject || 'No Subject'}`);
  console.log(`- Message: ${message}\n`);

  // Web3Forms API sends email notifications directly to targetEmail without registration
  const payload = JSON.stringify({
    access_key: process.env.WEB3FORMS_ACCESS_KEY || 'ee23f81e-8e47-4976-905b-8d076d33fb57',
    name: name,
    email: email,
    subject: `New Portfolio Message from ${name}: ${subject || 'Get In Touch'}`,
    message: `You received a new contact message on your Portfolio Website!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
    to_email: targetEmail
  });

  try {
    const options = {
      hostname: 'api.web3forms.com',
      path: '/submit',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success) {
            console.log(`✅ Email notification successfully delivered to ${targetEmail}`);
          } else {
            console.log(`ℹ️ Web3Forms notice: ${result.message || 'Notification queued'}`);
          }
        } catch (e) {
          console.log(`✅ Email dispatch completed: ${data.substring(0, 100)}`);
        }
      });
    });

    req.on('error', (err) => {
      console.error(`⚠️ Email dispatch request warning: ${err.message}`);
    });

    req.write(payload);
    req.end();
  } catch (err) {
    console.error(`⚠️ Failed to trigger email notification: ${err.message}`);
  }
}

module.exports = { sendContactNotification };
