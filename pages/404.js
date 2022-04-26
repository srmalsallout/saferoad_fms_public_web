import React from "react";
import Styles from "../styles/PageNotFound.module.scss";

const PageNotFound = () => {
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center flex-column fs-5 text-danger"
    >
      <h1>401</h1>
      <h3>Opps ... U are not Authorized any more</h3>
    </div>
  );
};

export default PageNotFound;
