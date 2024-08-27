import AWS from "aws-sdk";

// AWS S3 구성
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// 이미지 업로드 함수
async function uploadImage(file, bucketName, keyPrefix) {
  const params = {
    Bucket: bucketName,
    Key: `${keyPrefix}/${file.name}`,
    Body: file,
    ACL: "public-read",
  };

  try {
    const { Location } = await s3.upload(params).promise();
    return Location;
  } catch (err) {
    console.error("Upload Error:", err);
    throw err;
  }
}

export { uploadImage };
