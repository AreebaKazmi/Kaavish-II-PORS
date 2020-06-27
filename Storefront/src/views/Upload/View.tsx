import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import RecommendationData from "./recommendations/recommendations.json";

import { generateProductUploadUrl } from "../../core/utils";

type ViewProps = RouteComponentProps<{
  message?: string;
}>;

export const View: React.FC<ViewProps> = ({ }) => {
    
  return(
    <>

      <div>
        <h1 className="upload__header"> Some of the recommendations from previously uploaded images are as follows: </h1>

      </div>
      <div> 
        {RecommendationData.map((rcm, index) =>{
          return <div>
            <div className = "upload__column">
            <Link
                  to={generateProductUploadUrl(rcm.ID, rcm.name)}
                  key={rcm.ID}
                >
                  <img src={require(`${rcm.upload_path}`)} width="250" height="300" />
                </Link>
            </div>
            <ul>
              {rcm.recommended.map((sub, index) => {
              return <div className = "upload__column">
                <Link
                  to={generateProductUploadUrl(sub.ID, sub.name)}
                  key={sub.ID}
                >
                  <img src={require(`${sub.path}`)} width="250" height="300" />
                </Link>

              </div>
              })}
            </ul>
          </div>

        })}
      </div>
    </>
  );
};

export default View;
