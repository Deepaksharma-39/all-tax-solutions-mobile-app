require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_middleware/error-handler");
const fs = require("fs");

// nodemailer
const nodemailer = require("nodemailer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow requests from any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
// api routes
app.use("/users", require("./mvc/users/user.controller"));
app.use("/venue", require("./mvc/venue/venue.controller"));
app.use("/enquiry", require("./mvc/enquiry/enquiry.controller"));

app.post('/email', async (req,res)=>{

const {text,html}=req.body;

  const transporter = nodemailer.createTransport({
    host: "allroadtaxsolutions.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "info@allroadtaxsolutions.com",
      pass: "QH-VDG%6{iTj",
    }
  });

  async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"All Road Tax Solution 🚕" <info@allroadtaxsolutions.com>', // sender address
        to: ["alltaxsolutions44@gmail.com","deepaksharmaa.39@gmail.com"], // list of receivers
        subject: "New Enquiry", // Subject line
        text: "text", // plain text body
        html: html, // html body
        // attachments:attachment
      });
    
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ message: 'Email sent Successfully' });
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
  
  main().catch(console.error);

})


// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;

app.listen(port,'0.0.0.0', () => console.log("Server listening on port " + port));
