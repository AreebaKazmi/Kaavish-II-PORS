import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import CardSpacer from "@Kaavish/components/CardSpacer";
import CardTitle from "@Kaavish/components/CardTitle";
import Date from "@Kaavish/components/Date";
import FormSpacer from "@Kaavish/components/FormSpacer";
import Hr from "@Kaavish/components/Hr";
import Money from "@Kaavish/components/Money";
import Percent from "@Kaavish/components/Percent";
import Skeleton from "@Kaavish/components/Skeleton";
import { commonMessages } from "@Kaavish/intl";
import { maybe } from "../../../misc";
import { SaleType } from "../../../types/globalTypes";
import { SaleDetails_sale } from "../../types/SaleDetails";

export interface SaleSummaryProps {
  defaultCurrency: string;
  sale: SaleDetails_sale;
}

const SaleSummary: React.StatelessComponent<SaleSummaryProps> = ({
  defaultCurrency,
  sale
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle title={intl.formatMessage(commonMessages.summary)} />
      <CardContent>
        <Typography variant="caption">
          <FormattedMessage defaultMessage="Name" description="sale name" />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(() => sale.name, <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <FormattedMessage defaultMessage="Value" description="sale value" />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () =>
              sale.type === SaleType.FIXED ? (
                <Money
                  money={{
                    amount: sale.value,
                    currency: defaultCurrency
                  }}
                />
              ) : (
                <Percent amount={sale.value} />
              ),
            <Skeleton />
          )}
        </Typography>

        <CardSpacer />
        <Hr />
        <CardSpacer />

        <Typography variant="caption">
          <FormattedMessage {...commonMessages.startDate} />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () => (
              <Date date={sale.startDate} plain />
            ),
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <FormattedMessage {...commonMessages.endDate} />
        </Typography>
        <Typography>
          {maybe<React.ReactNode>(
            () =>
              sale.endDate === null ? "-" : <Date date={sale.endDate} plain />,
            <Skeleton />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
SaleSummary.displayName = "SaleSummary";
export default SaleSummary;
