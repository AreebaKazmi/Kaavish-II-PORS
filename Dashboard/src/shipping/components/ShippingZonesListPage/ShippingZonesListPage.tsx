import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@Kaavish/components/AppHeader";
import Container from "@Kaavish/components/Container";
import Grid from "@Kaavish/components/Grid";
import PageHeader from "@Kaavish/components/PageHeader";
import RequirePermissions from "@Kaavish/components/RequirePermissions";
import { sectionNames } from "@Kaavish/intl";
import { ListActions, PageListProps, UserPermissionProps } from "@Kaavish/types";
import { PermissionEnum, WeightUnitsEnum } from "@Kaavish/types/globalTypes";
import { ShippingZoneFragment } from "../../types/ShippingZoneFragment";
import ShippingWeightUnitForm from "../ShippingWeightUnitForm";
import ShippingZonesList from "../ShippingZonesList";

export interface ShippingZonesListPageProps
  extends PageListProps,
    ListActions,
    UserPermissionProps {
  defaultWeightUnit: WeightUnitsEnum;
  shippingZones: ShippingZoneFragment[];
  onBack: () => void;
  onRemove: (id: string) => void;
  onSubmit: (unit: WeightUnitsEnum) => void;
}

const ShippingZonesListPage: React.StatelessComponent<
  ShippingZonesListPageProps
> = ({
  defaultWeightUnit,
  disabled,
  userPermissions,
  onBack,
  onSubmit,
  ...listProps
}) => {
  const intl = useIntl();

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader
        title={intl.formatMessage({
          defaultMessage: "Shipping",
          description: "header"
        })}
      />
      <Grid>
        <div>
          <ShippingZonesList disabled={disabled} {...listProps} />
        </div>
        <div>
          <RequirePermissions
            userPermissions={userPermissions}
            requiredPermissions={[PermissionEnum.MANAGE_SETTINGS]}
          >
            <ShippingWeightUnitForm
              defaultWeightUnit={defaultWeightUnit}
              disabled={disabled}
              onSubmit={onSubmit}
            />
          </RequirePermissions>
        </div>
      </Grid>
    </Container>
  );
};
ShippingZonesListPage.displayName = "ShippingZonesListPage";
export default ShippingZonesListPage;
