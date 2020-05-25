import * as React from "react";
import { RouteComponentProps } from "react-router";

import { StringParam, useQueryParam } from "use-query-params";
import { NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import {
  getGraphqlIdFromDBId,
} from "../../core/utils";
import Page from "./Page";
import { TypedSearchImagesQuery } from "./queries";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(value + "_" + valueObj[value].join("_"));
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const View: React.FC<ViewProps> = ({ match }) => {
  const [search, setSearch] = useQueryParam("q", StringParam);
  const variables = {
    id: getGraphqlIdFromDBId(match.params.id, "ImgSearch"),
    query: search || null,
  };
  return (
    <NetworkStatus>
      {isOnline => (
        <TypedSearchImagesQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {({ loading, data, loadMore }) => {

              return (
                <Page
                  displayLoader={loading}
                  setSearch={setSearch}
                  search={search}
                  products={data.products}
                />
              );

            if (data && data.products === null) {
              return <NotFound />;
            }

            if (!isOnline) {
              return <OfflinePlaceholder />;
            }
          }}
        </TypedSearchImagesQuery>
      )}
    </NetworkStatus>
  );
};

export default View;
