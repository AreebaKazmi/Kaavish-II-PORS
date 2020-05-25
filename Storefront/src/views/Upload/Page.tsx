import "./scss/index.scss";

import * as React from "react";

import {
  DebounceChange,
  ProductsFeatured,
  TextField,
} from "../../components";

import { maybe } from "../../core/utils";

import { SearchProducts_products } from "./types/SearchProducts";

interface PageProps {
  displayLoader: boolean;
  search?: string;
  setSearch?: (
    newValue: string,
    updateType?: "replace" | "replaceIn" | "push" | "pushIn"
  ) => void;
  products: SearchProducts_products;
}

const Page: React.FC<PageProps> = ({
  search,
  setSearch,
  displayLoader,
  products
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  const hasProducts = canDisplayProducts && !!products.totalCount;

  return (
    <div className="category">
      <div className="search-page">
        <div className="search-page__header">
          <div className="search-page__header__input container">
            <DebounceChange
              debounce={evt =>
                setSearch((evt.target.value as string).toLowerCase())
              }
              value={search}
              time={500}
            >
              {({ change, value }) => {
                return (
                  <TextField
                    autoFocus
                    label="Search term:"
                    onChange={change}
                    value={value}
                  />
                );
              }}
            </DebounceChange>
          </div>
        </div>
      </div>

      {!hasProducts && <ProductsFeatured title="You might like" />}
    </div>
  );
};

export default Page;
