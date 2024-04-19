require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("_middleware/error-handler");
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use("/users", require("./mvc/users/user.controller"));

app.get("/pdf/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = `./uploads/${filename}`;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).send("File not found");
      return;
    }

    res.contentType("application/pdf");
    res.send(data);
  });
});

// global error handler
app.use(errorHandler);

// start server
const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 4000;

app.listen(port,'0.0.0.0', () => console.log("Server listening on port " + port));
