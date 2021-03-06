import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardTitle from "@Kaavish/components/CardTitle";
import ControlledCheckbox from "@Kaavish/components/ControlledCheckbox";
import FormSpacer from "@Kaavish/components/FormSpacer";
import Hr from "@Kaavish/components/Hr";
import { sectionNames } from "@Kaavish/intl";
import { FormData } from "../CountryListPage";

interface TaxConfigurationProps {
  data: FormData;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  onTaxFetch: () => void;
}

const styles = createStyles({
  content: {
    paddingBottom: 0
  }
});

export const TaxConfiguration = withStyles(styles, {
  name: "TaxConfiguration"
})(
  ({
    classes,
    data,
    disabled,
    onChange,
    onTaxFetch
  }: TaxConfigurationProps & WithStyles<typeof styles>) => {
    const intl = useIntl();

    return (
      <Card>
        <CardTitle title={intl.formatMessage(sectionNames.configuration)} />
        <CardContent className={classes.content}>
          <ControlledCheckbox
            name={"includeTax" as keyof FormData}
            label={intl.formatMessage({
              defaultMessage:
                "All products prices are entered with tax included"
            })}
            checked={data.includeTax}
            onChange={onChange}
            disabled={disabled}
          />
          <FormSpacer />
          <ControlledCheckbox
            name={"showGross" as keyof FormData}
            label={intl.formatMessage({
              defaultMessage: "Show gross prices to customers in the storefront"
            })}
            checked={data.showGross}
            onChange={onChange}
            disabled={disabled}
          />
          <FormSpacer />
          <ControlledCheckbox
            name={"chargeTaxesOnShipping" as keyof FormData}
            label={intl.formatMessage({
              defaultMessage: "Charge taxes on shipping rates"
            })}
            checked={data.chargeTaxesOnShipping}
            onChange={onChange}
            disabled={disabled}
          />
          <FormSpacer />
        </CardContent>
        <Hr />
        <CardActions>
          <Button disabled={disabled} onClick={onTaxFetch} color="primary">
            <FormattedMessage
              defaultMessage="Fetch taxes"
              description="button"
            />
          </Button>
        </CardActions>
      </Card>
    );
  }
);
export default TaxConfiguration;
