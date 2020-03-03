import CardTitle from "@Kaavish/components/CardTitle";
import ControlledCheckbox from "@Kaavish/components/ControlledCheckbox";
import { ChangeEvent } from "@Kaavish/hooks/useForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useIntl } from "react-intl";

import { FormData } from "../WebhooksDetailsPage";

interface WebhookStatusProps {
  data: boolean;
  disabled: boolean;
  onChange: (event: ChangeEvent, cb?: () => void) => void;
}

const WebhookStatus: React.FC<WebhookStatusProps> = ({
  data,
  disabled,
  onChange
}) => {
  const intl = useIntl();
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Webhook Status",
          description: "section header"
        })}
      />
      <CardContent>
        <Typography>
          {intl.formatMessage({
            defaultMessage:
              "If you want to disable this webhook please uncheck the box below.",
            description: "webhook active"
          })}
        </Typography>
        <ControlledCheckbox
          name={"isActive" as keyof FormData}
          label={intl.formatMessage({
            defaultMessage: "Webhook is active",
            description: "webhooks active"
          })}
          checked={data}
          onChange={onChange}
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
};
WebhookStatus.displayName = "WebhookStatus";
export default WebhookStatus;
