import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

import RecommendationData from "./recommendations/recommendations.json";
import RecommendationComp from "./recommendations/recommendations02.json";

import { generateProductUploadUrl } from "../../core/utils";

type ViewProps = RouteComponentProps<{
  message?: string;
}>;

export const View: React.FC<ViewProps> = ({ }) => {
    
  return(
    <>

      <div>
        <h1 className="upload__header"> Visually Similar Recommendations </h1>

      </div>
      <div> 
        {RecommendationData.map((rcm, index) =>{
          return <div>
            <div className = "upload__column">
            <Link
                  to={generateProductUploadUrl(rcm.ID, rcm.name)}
                  key={rcm.ID}
                >
                  <div className = "upload__image">
                    <h3 className="upload__heading"> Uploaded  </h3>
                    <img src={require(`${rcm.upload_path}`)} width="220" height="260" />
                  </div>

                </Link>

            </div>

            <h3 className="upload__recheading"> Recommended Images </h3>

            <ul>
              {rcm.recommended.map((sub, index) => {
              return <div className = "upload__column">
                <Link
                  to={generateProductUploadUrl(sub.ID, sub.name)}
                  key={sub.ID}
                >
                  <div className = "upload__image_recommended">
                    <img src={require(`${sub.path}`)} width="220" height="260" />
                  </div>
                </Link>

              </div>
              })}
            </ul>
          </div>

        })}
      </div>

      <div>
        <h1 className="upload__header"> Visually Complementary Recommendations </h1>

      </div>
      <div> 
        {RecommendationComp.map((rcm, index) =>{
          return <div>
            <div className = "upload__column">
            <Link
                  to={generateProductUploadUrl(rcm.ID, rcm.name)}
                  key={rcm.ID}
                >
                  <div className = "upload__image">
                    <h3 className="upload__heading"> Uploaded  </h3>
                    <img src={require(`${rcm.upload_path}`)} width="220" height="260" />
                  </div>

                </Link>
            </div>

            <h3 className="upload__recheading"> Recommended Images </h3>

            <ul>
              {rcm.recommended.map((sub, index) => {
              return <div className = "upload__column">
                <Link
                  to={generateProductUploadUrl(sub.ID, sub.name)}
                  key={sub.ID}
                >
                  <div className = "upload__image_recommended">
                    <img src={require(`${sub.path}`)} width="220" height="260" />
                  </div>
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
