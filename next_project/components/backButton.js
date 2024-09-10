import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const BackButton = ({ className }) => {
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <a className={className} onClick={handleBack}>
      <Image src="/images/icon_arrow_back.png" width={200} height={50} />
    </a>
  );
};

export default BackButton;
