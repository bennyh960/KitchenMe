const aws = require("aws-sdk");

const s3 = new aws.S3({
  region: "me-south-1",
  accessKeyId: process.env.A_KEY_S3,
  secretAccessKey: process.env.S_A_K_S3,
  signatureVersion: "v4",
});

async function generateUploadURL(fileName, file) {
  const config = {
    Bucket: "recipe-images-meetbach",
    Key: fileName,
    Body: file,
    ACL: "public-read",
    // ContentType: `image/${fileName.slice(-5).split(".")[1]}`,
    ContentType: `image/png`,
    ContentDisposition: `inline;filename=${fileName}`,
  };
  const uploadImage = await s3.upload(config).promise();
  return uploadImage;
}

module.exports = generateUploadURL;
