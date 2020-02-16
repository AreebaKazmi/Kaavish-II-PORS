import "./scss/index.scss";

import * as React from "react";
import { Link } from "react-router-dom";

import { BASE_URL } from "../../core/config";

import Button from "../Button";

const UploadImage: React.FC<{}> = () => (
  <div className="upload-image-page">
    <h5 className="upload-image-page__header"> Upload your image here! </h5>
    <div className="upload-image-page__ruler" />
    <div className="upload-image-page__message">
      <p>Upload the picture of your piece of clothing in order to proceed customized recommendation. </p>
      <p>Happy Shopping! </p>
    </div>
    <div className="upload-image-page__button">
      <Link to={BASE_URL}>
        <Button secondary>Back to home</Button>
      </Link>
    </div>
  </div>
);

export default UploadImage;


