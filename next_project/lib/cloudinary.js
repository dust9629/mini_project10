import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
});

// 이미지 업로드 및 URL 생성 함수
function generateImageUrl(publicId) {
  return cld.image(publicId).toURL();
}

export { generateImageUrl };
