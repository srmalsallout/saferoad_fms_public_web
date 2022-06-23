import Image from "next/image";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const PageNotFound = () => {
  useEffect(() => {
    toast("Your can't track this vehicle any more", {
      autoClose: 5000,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      type: "error",
      position: "top-center",
    });
  }, []);
  return (
    <div
      style={{ height: "100vh", backgroundColor: "#FEFEFE" }}
      className="d-flex justify-content-center align-items-center flex-column fs-5 text-danger"
    >
      <Image
        src="/assets/images/401.jpg"
        width="700"
        height="700"
        alt="image"
      />

      <ToastContainer
        autoClose={5000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </div>
  );
};

export default PageNotFound;
