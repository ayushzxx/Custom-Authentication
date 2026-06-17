const nodemailer = require('nodemailer')

async function sendEmail(data) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: data.subject,
            text: data.message,
            html: data.html || data.message
        }
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        console.log(info);
        return true;
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
}

module.exports = sendEmail;