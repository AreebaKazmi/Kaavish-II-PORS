import gql from "graphql-tag";

import { pageInfoFragment } from "@Kaavish/queries";
import TopLevelSearch from "../TopLevelSearch";
import {
  SearchCategories,
  SearchCategoriesVariables
} from "./types/SearchCategories";

export const searchCategories = gql`
  ${pageInfoFragment}
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(after: $after, first: $first, query: $query) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default TopLevelSearch<SearchCategories, SearchCategoriesVariables>(
  searchCategories
);
