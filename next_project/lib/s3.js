import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

// AWS S3 클라이언트 초기화
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// 이미지 업로드 함수
async function uploadImage(file, bucketName, keyPrefix) {
  const params = {
    Bucket: bucketName,
    Key: `${keyPrefix}/${file.name}`,
    Body: file.stream || file, // Node.js 환경에서는 file.stream, 브라우저에서는 file 객체 사용
    ACL: "public-read",
  };

  try {
    const upload = new Upload({
      client: s3Client,
      params: params,
    });

    const { Location } = await upload.done();
    return Location;
  } catch (err) {
    console.error("Upload Error:", err);
    throw err;
  }
}

export { uploadImage };
