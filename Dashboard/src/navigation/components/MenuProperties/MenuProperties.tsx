import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useIntl } from "react-intl";

import CardTitle from "@Kaavish/components/CardTitle";
import { commonMessages } from "@Kaavish/intl";
import { MenuDetailsFormData } from "../MenuDetailsPage";

export interface MenuPropertiesProps {
  data: MenuDetailsFormData;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const MenuProperties: React.StatelessComponent<MenuPropertiesProps> = ({
  data,
  disabled,
  onChange
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformations)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          name={"name" as keyof MenuDetailsFormData}
          fullWidth
          label={intl.formatMessage({
            defaultMessage: "Menu Title",
            id: "menuPropertiesMenuTitle"
          })}
          value={data.name}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
MenuProperties.displayName = "MenuProperties";
export default MenuProperties;
