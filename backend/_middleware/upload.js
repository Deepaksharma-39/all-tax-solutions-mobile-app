const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    }
});

const upload = multer({ storage: storage });
module.exports = upload;