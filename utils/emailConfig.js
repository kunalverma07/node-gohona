const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "sahu99516@gmail.com",
    pass: "ktbwphlscmvbvvvt",
  },
  port: 465,
  secure: true,
  // Add a longer timeout (in milliseconds)
  connectionTimeout: 30000, // 30 seconds
});

module.exports = transporter;
