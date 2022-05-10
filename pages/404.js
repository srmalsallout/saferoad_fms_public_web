import Image from "next/image";
import React from "react";
import Styles from "../styles/PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column fs-5 text-danger"
    >
      <Image
        src="/assets/images/401.jpg"
        width="700"
        height="700"
        alt="image"
      />
    </div>
  );
};

export default PageNotFound;
