const nodemailer = require("nodemailer");

const sendMail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"WoodCraft Furniture" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html: `<p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.error("Mail Error:", err.message);
    return false;
  }
};

module.exports = sendMail;
