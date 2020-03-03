import React from "react";
import { useIntl } from "react-intl";

import AccountPermissions from "@Kaavish/components/AccountPermissions";
import AccountStatus from "@Kaavish/components/AccountStatus";
import AppHeader from "@Kaavish/components/AppHeader";
import CardSpacer from "@Kaavish/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@Kaavish/components/ConfirmButton";
import Container from "@Kaavish/components/Container";
import Form from "@Kaavish/components/Form";
import Grid from "@Kaavish/components/Grid";
import PageHeader from "@Kaavish/components/PageHeader";
import SaveButtonBar from "@Kaavish/components/SaveButtonBar";
import { ShopInfo_shop_permissions } from "@Kaavish/components/Shop/types/ShopInfo";
import { sectionNames } from "@Kaavish/intl";
import { UserError } from "@Kaavish/types";
import { PermissionEnum } from "@Kaavish/types/globalTypes";
import ServiceInfo from "../ServiceInfo";

export interface ServiceCreatePageFormData {
  hasFullAccess: boolean;
  isActive: boolean;
  name: string;
  permissions: PermissionEnum[];
}
export interface ServiceCreatePageProps {
  disabled: boolean;
  errors: UserError[];
  permissions: ShopInfo_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: ServiceCreatePageFormData) => void;
}

const ServiceCreatePage: React.FC<ServiceCreatePageProps> = props => {
  const {
    disabled,
    errors: formErrors,
    permissions,
    saveButtonBarState,
    onBack,
    onSubmit
  } = props;
  const intl = useIntl();

  const initialForm: ServiceCreatePageFormData = {
    hasFullAccess: false,
    isActive: false,
    name: "",
    permissions: []
  };
  return (
    <Form
      errors={formErrors}
      initial={initialForm}
      onSubmit={onSubmit}
      confirmLeave
    >
      {({ data, change, errors, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.serviceAccounts)}
          </AppHeader>
          <PageHeader
            title={intl.formatMessage({
              defaultMessage: "Create New Account",
              description: "header"
            })}
          />
          <Grid>
            <div>
              <ServiceInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
            </div>
            <AccountPermissions
              data={data}
              disabled={disabled}
              permissions={permissions}
              onChange={change}
            />
            <CardSpacer />
            <AccountStatus
              data={data}
              disabled={disabled}
              label={intl.formatMessage({
                defaultMessage: "Service account is active",
                description: "checkbox label"
              })}
              onChange={change}
            />
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
          />
        </Container>
      )}
    </Form>
  );
};

ServiceCreatePage.displayName = "ServiceCreatePage";
export default ServiceCreatePage;
