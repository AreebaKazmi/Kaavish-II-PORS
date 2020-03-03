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
import useLocale from "@Kaavish/hooks/useLocale";
import { sectionNames } from "@Kaavish/intl";
import { getUserName, maybe } from "../../../misc";
import { PermissionEnum } from "../../../types/globalTypes";
import { StaffMemberDetails_user } from "../../types/StaffMemberDetails";
import StaffPreferences from "../StaffPreferences";
import StaffProperties from "../StaffProperties/StaffProperties";

interface FormData {
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
  firstName: string;
  lastName: string;
  email: string;
}

export interface StaffDetailsPageProps {
  canEditAvatar: boolean;
  canEditPreferences: boolean;
  canEditStatus: boolean;
  canRemove: boolean;
  disabled: boolean;
  permissions: ShopInfo_shop_permissions[];
  saveButtonBarState: ConfirmButtonTransitionState;
  staffMember: StaffMemberDetails_user;
  onBack: () => void;
  onDelete: () => void;
  onImageDelete: () => void;
  onSubmit: (data: FormData) => void;
  onImageUpload(file: File);
}

const StaffDetailsPage: React.StatelessComponent<StaffDetailsPageProps> = ({
  canEditAvatar,
  canEditPreferences,
  canEditStatus,
  canRemove,
  disabled,
  permissions,
  saveButtonBarState,
  staffMember,
  onBack,
  onDelete,
  onImageDelete,
  onImageUpload,
  onSubmit
}: StaffDetailsPageProps) => {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  const initialForm: FormData = {
    email: maybe(() => staffMember.email, ""),
    firstName: maybe(() => staffMember.firstName, ""),
    hasFullAccess: maybe(
      () =>
        permissions.filter(
          perm =>
            maybe(() => staffMember.permissions, []).filter(
              userPerm => userPerm.code === perm.code
            ).length === 0
        ).length === 0,
      false
    ),
    isActive: maybe(() => staffMember.isActive, false),
    lastName: maybe(() => staffMember.lastName, ""),
    permissions: maybe(() => staffMember.permissions, []).map(perm => perm.code)
  };

  return (
    <Form initial={initialForm} onSubmit={onSubmit} confirmLeave>
      {({ data, change, hasChanged, submit }) => (
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.staff)}
          </AppHeader>
          <PageHeader title={getUserName(staffMember)} />
          <Grid>
            <div>
              <StaffProperties
                data={data}
                disabled={disabled}
                canEditAvatar={canEditAvatar}
                staffMember={staffMember}
                onChange={change}
                onImageUpload={onImageUpload}
                onImageDelete={onImageDelete}
              />
            </div>
            <div>
              {canEditPreferences && (
                <StaffPreferences locale={locale} onLocaleChange={setLocale} />
              )}
              {canEditStatus && (
                <>
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
                      defaultMessage: "User is active",
                      description: "checkbox label"
                    })}
                    onChange={change}
                  />
                </>
              )}
            </div>
          </Grid>
          <SaveButtonBar
            disabled={disabled || !hasChanged}
            state={saveButtonBarState}
            onCancel={onBack}
            onSave={submit}
            onDelete={canRemove ? onDelete : undefined}
          />
        </Container>
      )}
    </Form>
  );
};
StaffDetailsPage.displayName = "StaffDetailsPage";
export default StaffDetailsPage;
