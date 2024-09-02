require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./_middleware/error-handler");
const fs = require('fs-extra');
const busboy = require('connect-busboy');
// nodemailer
const nodemailer = require("nodemailer");
const path = require("path");
const { log } = require("console");
const authorize = require("./_middleware/authorize");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())



app.use(busboy({
  highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware
app.use(cors());

const uploadPath = path.join(__dirname, 'upload/'); // Register the upload path
fs.ensureDir(uploadPath); // Make sure that he upload path exits

const bannerPath = path.join(__dirname, 'images/'); // Register the upload path
fs.ensureDir(bannerPath); // Make sure that he upload path exits

/**
* Create route /upload which handles the post request
*/

app.get('/',(req,res)=>{
  res.send("Welcome to Home Page")
})


app.route('/admin/banner').post(authorize(['admin']), (req, res, next) => {
  req.pipe(req.busboy); // Pipe it through busboy

  req.busboy.on('file', (fieldname, file, filename) => {
      console.log(`Upload of '${filename.filename}' started`);


 const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7);
  const fileExtension = path.extname(filename.filename);
  
      // Generate a unique filename
      const uniqueFilename = `${timestamp}_${randomString}${fileExtension}`;

      // Create a write stream of the new file
      const fstream = fs.createWriteStream(path.join(bannerPath, uniqueFilename));

      // Pipe it through
      file.pipe(fstream);

      // On finish of the upload
      fstream.on('close', () => {
          console.log(`Upload of '${filename.filename}' finished`);
          res.send({ message: 'File uploaded successfully', filename: uniqueFilename });
      });
  });
});

app.route('/upload/:id').post(authorize(['admin']), (req, res, next) => {

  req.pipe(req.busboy); // Pipe it trough busboy

  const id = req.params.id;
  console.log(id);
  req.busboy.on('file', (fieldname, file, filename) => {
    console.log(filename.filename)
    console.log(`Upload of '${filename.filename}' started`);

    // Create a write stream of the new file
    const fstream = fs.createWriteStream(path.join(uploadPath, id + filename.filename));
    // Pipe it trough
    file.pipe(fstream);

    // On finish of the upload
    fstream.on('close', () => {
      console.log(`Upload of '${filename.filename}' finished`);
      res.json({ message: 'File Uploaded successfully', filename: id + filename.filename })
    });
  });
});


function generateUniqueFilename(originalFilename) {
  const timestamp = new Date().getTime();
  const randomString = Math.random().toString(36).substring(7);
  const fileExtension = path.extname(originalFilename);
  return `${timestamp}_${randomString}${fileExtension}`;
}

app.route('/files/:name').get(authorize(), (req, res) => {
  const name = req.params.name;
  const uploadPath = path.join(__dirname, 'upload', name); // Assuming uploads are stored in a folder named 'uploads'
  console.log(uploadPath);
  // Read the contents of the directory
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the list of files as a JSON response
    res.json({ files });
  });
});
app.route('/admin/banner/:name').get((req, res) => {
  const name = req.params.name;
  const uploadPath = path.join(__dirname, 'images', name); // Assuming uploads are stored in a folder named 'uploads'
  console.log(uploadPath);
  // Read the contents of the directory
  fs.readdir(uploadPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the list of files as a JSON response
    res.json({ files });
  });
});

app.route('/admin/banner/:name').get((req, res) => {
  const name = req.params.name;
 fs.readdir(bannerPath, (err, name) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Send the list of files as a JSON response
    res.json({ files });
  });
});


// api routes
app.use("/users", require("./mvc/users/user.controller"));
app.use("/venue", require("./mvc/venue/venue.controller"));
app.use("/enquiry", require("./mvc/enquiry/enquiry.controller"));
app.use("/banners", require("./mvc/banner/banner.controller"));
app.use("/jobs", require("./mvc/Jobs/Jobs.controller"));
app.use("/insurance", require("./mvc/Insurance/Insurance.controller"));
app.use("/cars", require("./mvc/cars/car.controller"));

app.post('/email', async (req, res) => {

  const { text, html } = req.body;

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
      from: '"All Road Tax Solution ðŸš•" <info@allroadtaxsolutions.com>', // sender address
      to: ["alltaxsolutions44@gmail.com", "deepaksharmaa.39@gmail.com"], // list of receivers
      subject: "New Enquiry", // Subject line
      text: text, // plain text body
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

app.listen(port, '0.0.0.0', () => console.log("Server listening on port " + port));
