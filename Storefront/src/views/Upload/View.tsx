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
        {RecommendationData.map((rcm, index) =>{
          return <div>
            <h5> {rcm.ID} </h5>
            <p> {rcm.upload_path} </p>
          </div>

        })}
      </div>
    </>
  );
};

export default View;
