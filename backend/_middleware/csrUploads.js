const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'csrUploads/'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    }
});

const csrUpload = multer({ storage: storage });
module.exports = csrUpload;