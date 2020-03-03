import React from "react";
import { useIntl } from "react-intl";

import { WindowTitle } from "@Kaavish/components/WindowTitle";
import useNavigator from "@Kaavish/hooks/useNavigator";
import useNotifier from "@Kaavish/hooks/useNotifier";
import { getMutationState, maybe } from "../../misc";
import ProductTypeCreatePage, {
  ProductTypeForm
} from "../components/ProductTypeCreatePage";
import { TypedProductTypeCreateMutation } from "../mutations";
import { TypedProductTypeCreateDataQuery } from "../queries";
import { ProductTypeCreate as ProductTypeCreateMutation } from "../types/ProductTypeCreate";
import { productTypeListUrl, productTypeUrl } from "../urls";

export const ProductTypeCreate: React.StatelessComponent = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleCreateSuccess = (updateData: ProductTypeCreateMutation) => {
    if (updateData.productTypeCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage({
          defaultMessage: "Successfully created product type"
        })
      });
      navigate(productTypeUrl(updateData.productTypeCreate.productType.id));
    }
  };
  return (
    <TypedProductTypeCreateMutation onCompleted={handleCreateSuccess}>
      {(
        createProductType,
        { called, loading, data: createProductTypeData }
      ) => {
        const formTransitionState = getMutationState(loading, called);
        const handleCreate = (formData: ProductTypeForm) =>
          createProductType({
            variables: {
              input: {
                hasVariants: false,
                isShippingRequired: formData.isShippingRequired,
                name: formData.name,
                taxCode: formData.taxType,
                weight: formData.weight
              }
            }
          });
        return (
          <TypedProductTypeCreateDataQuery displayLoader>
            {({ data, loading }) => (
              <>
                <WindowTitle
                  title={intl.formatMessage({
                    defaultMessage: "Create Product Type",
                    description: "window title",
                    id: "productTypeCreateHeader"
                  })}
                />
                <ProductTypeCreatePage
                  defaultWeightUnit={maybe(() => data.shop.defaultWeightUnit)}
                  disabled={loading}
                  errors={
                    createProductTypeData
                      ? createProductTypeData.productTypeCreate.errors
                      : undefined
                  }
                  pageTitle={intl.formatMessage({
                    defaultMessage: "Create Product Type",
                    description: "header",
                    id: "productTypeCreatePageHeader"
                  })}
                  saveButtonBarState={formTransitionState}
                  taxTypes={maybe(() => data.taxTypes, [])}
                  onBack={() => navigate(productTypeListUrl())}
                  onSubmit={handleCreate}
                />
              </>
            )}
          </TypedProductTypeCreateDataQuery>
        );
      }}
    </TypedProductTypeCreateMutation>
  );
};
export default ProductTypeCreate;