const multer = require("multer");

const upload = multer({
  // dest: "avatars", // if we want save in file system  (if we want store on our db we must cancle it)
  limits: {
    fileSize: 2e6,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image with max size of 2MB"));
    }
    cb(undefined, true); //accept the upload
  },
});

module.exports = upload;
