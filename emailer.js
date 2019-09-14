import { createTransport } from "nodemailer";
import { getEmailCreds, getAllUsers } from "./db.js";

export function email(message, rtdAlert = null, callback) {
  var retval;

  var senderEmail = "";
  var senderPassowrd = "";

  getEmailCreds((err, doc) => {
    if (err) {
      callback(err);
    } else {
      senderEmail = doc.email;
      senderPassword = doc.password;
      const transporter = createTransport({
        service: 'gmail',
        auth: {
          user: senderEmail,
          pass: senderPassword
        }
      });

      var htmlContent = `<h1>${message.toString()}</h1>`;
      if (rtdAlert) {
        htmlContent += `<br><p>Tweet:<p><p>${rtdAlert}</p>`;
      }

      getAllUsers((err, docs) => {
        if (err) {
          callback(err);
        } else if (docs && docs.length > 0) {
          docs.forEach(doc => {
            const mailOptions = {
              from: senderEmail,
              to: doc.email,
              subject: 'Test email',
              html: htmlContent
            };

            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                callback(err);
              } else {
                callback(null, `Email sent: ${info.response}`)
              }
            });
          });
        } else {
          callback("No users found.");
        }
      });
    }
  });
}
