const sendEmail = require("../utils/sendMail");

exports.contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const subject = "New Customer Message";
    const html = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    await sendEmail(process.env.MAIL_USER, subject, html); // Send to your mail
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "Failed to send email", error: err.message });
  }
};
