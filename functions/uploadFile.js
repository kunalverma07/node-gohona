const bucket = require("../utils/firebaseConfig");
const path = require("path");

const uploadFileToFirebase = (file, filename) => {
  return new Promise((resolve, reject) => {
    const fileUpload = bucket.file(filename);

    fileUpload
      .save(file.buffer, {
        metadata: {
          contentType: file.mimetype,
        },
      })
      .then(() => {
        // Make the file public so that it can be accessed by anyone
        return fileUpload.makePublic();
      })
      .then(() => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        resolve(imageUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = { uploadFileToFirebase };
