const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "cameron.walsh@ethereal.email",
    pass: "XYYeV6yygnujRXcaDf",
  },
});

const sendMail = (email,params) => {

  (async () => {
    const info = await transporter.sendMail(
      {
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: email,
        subject: params.subject,
        text: params.text, // plain‑text body
        html: params.html, // HTML body
      });

  console.log("Message sent:", info.messageId);
  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
})();
}
// Wrap in an async IIFE so we can use await.
module.exports = sendMail;