import "./scss/index.scss";

import * as React from "react";
import { RouteComponentProps } from "react-router";
import RecommendationData from "./recommendations/recommendations.json";

import { generateProductUrl, maybe } from "../../core/utils";
import { ProductListItem } from "../../components/ProductListItem";

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
              <img src={require(`${rcm.upload_path}`)} width="250" height="300" />
            </div>
            <ul>
              {rcm.recommended.map((sub, index) => {
              return <div className = "upload__column">
                <ul>
                  <img src={require(`${sub.path}`)} width="250" height="300" />

                  

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
