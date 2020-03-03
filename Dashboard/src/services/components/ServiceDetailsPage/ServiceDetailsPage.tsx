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
import { maybe } from "@Kaavish/misc";
import { ServiceDetails_serviceAccount } from "@Kaavish/services/types/ServiceDetails";
import { UserError } from "@Kaavish/types";
import { PermissionEnum } from "@Kaavish/types/globalTypes";
import ServiceDefaultToken from "../ServiceDefaultToken";
import ServiceInfo from "../ServiceInfo";
import ServiceTokens from "../ServiceTokens";

export interface ServiceDetailsPageFormData {
  hasFullAccess: boolean;
  isActive: boolean;
  name: string;
  permissions: PermissionEnum[];
}
export interface ServiceDetailsPageProps {
  apiUri: string;
  disabled: boolean;
  errors: UserError[];
  permissions: ShopInfo_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  service: ServiceDetails_serviceAccount;
  token: string;
  onApiUriClick: () => void;
  onBack: () => void;
  onTokenDelete: (id: string) => void;
  onDelete: () => void;
  onTokenClose: () => void;
  onTokenCreate: () => void;
  onSubmit: (data: ServiceDetailsPageFormData) => void;
}

const ServiceDetailsPage: React.FC<ServiceDetailsPageProps> = props => {
  const {
    apiUri,
    disabled,
    errors: formErrors,
    permissions,
    saveButtonBarState,
    service,
    token,
    onApiUriClick,
    onBack,
    onDelete,
    onTokenClose,
    onTokenCreate,
    onTokenDelete,
    onSubmit
  } = props;
  const intl = useIntl();

  const initialForm: ServiceDetailsPageFormData = {
    hasFullAccess: maybe(
      () =>
        permissions.filter(
          perm =>
            maybe(() => service.permissions, []).filter(
              userPerm => userPerm.code === perm.code
            ).length === 0
        ).length === 0,
      false
    ),
    isActive: maybe(() => service.isActive, false),
    name: maybe(() => service.name, ""),
    permissions: maybe(() => service.permissions, []).map(perm => perm.code)
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
          <PageHeader title={maybe(() => service.name)} />
          <Grid>
            <div>
              {token && (
                <>
                  <ServiceDefaultToken
                    apiUri={apiUri}
                    token={token}
                    onApiUriClick={onApiUriClick}
                    onTokenClose={onTokenClose}
                  />
                  <CardSpacer />
                </>
              )}
              <ServiceInfo
                data={data}
                disabled={disabled}
                errors={errors}
                onChange={change}
              />
              <CardSpacer />
              <ServiceTokens
                tokens={maybe(() => service.tokens)}
                onCreate={onTokenCreate}
                onDelete={onTokenDelete}
              />
            </div>
            <div>
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
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
            onDelete={onDelete}
          />
        </Container>
      )}
    </Form>
  );
};

ServiceDetailsPage.displayName = "ServiceDetailsPage";
export default ServiceDetailsPage;
