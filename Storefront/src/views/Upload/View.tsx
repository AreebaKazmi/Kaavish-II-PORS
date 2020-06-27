import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";

import RecommendationData from "./recommendations/recommendations.json";

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
        {RecommendationData.map((rcm, index) => {
          return <div>
            <h3> {rcm.ID} </h3>
            <img src={require(`${rcm.upload_path}`)} width="250" height="300" />
            <ul>
              {rcm.recommended.map((sub, index) => {
              return <div className = "upload__right">
                <ul>
                  <img src={require(`${sub.path}`)} width="150" height="200" />
                </ul>
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
