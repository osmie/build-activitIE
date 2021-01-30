const AWS = require("aws-sdk");
const BUCKET_NAME = "osmirl-progress";

const s3bucket = new AWS.S3();
const uploadObjectToS3Bucket = async (objectName, objectData) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: objectName,
    Body: objectData,
    ACL: "public-read",
    ContentType: "application/json",
  };
  const stored = await s3bucket.upload(params).promise()
  console.log(`File uploaded successfully at ${stored.Location}`);
};

module.exports = uploadObjectToS3Bucket;
