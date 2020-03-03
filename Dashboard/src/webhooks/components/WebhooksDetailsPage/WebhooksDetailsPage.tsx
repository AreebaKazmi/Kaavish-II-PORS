import AppHeader from "@Kaavish/components/AppHeader";
import { ConfirmButtonTransitionState } from "@Kaavish/components/ConfirmButton";
import Container from "@Kaavish/components/Container";
import Form from "@Kaavish/components/Form";
import FormSpacer from "@Kaavish/components/FormSpacer";
import Grid from "@Kaavish/components/Grid";
import PageHeader from "@Kaavish/components/PageHeader";
import SaveButtonBar from "@Kaavish/components/SaveButtonBar";
import { SearchServiceAccount_search_edges_node } from "@Kaavish/containers/SearchServiceAccount/types/SearchServiceAccount";
import useStateFromProps from "@Kaavish/hooks/useStateFromProps";
import { sectionNames } from "@Kaavish/intl";
import { maybe } from "@Kaavish/misc";
import { WebhookEventTypeEnum } from "@Kaavish/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@Kaavish/utils/handlers/singleAutocompleteSelectChangeHandler";
import WebhookEvents from "@Kaavish/webhooks/components/WebhookEvents";
import WebhookInfo from "@Kaavish/webhooks/components/WebhookInfo";
import WebhookStatus from "@Kaavish/webhooks/components/WebhookStatus";
import { WebhookCreate_webhookCreate_webhookErrors } from "@Kaavish/webhooks/types/WebhookCreate";
import { WebhookDetails_webhook } from "@Kaavish/webhooks/types/WebhookDetails";

import React from "react";
import { useIntl } from "react-intl";

export interface FormData {
  id: string;
  events: WebhookEventTypeEnum[];
  isActive: boolean;
  name: string;
  secretKey: string | null;
  targetUrl: string;
  serviceAccount: string;
  allEvents: boolean;
}

export interface WebhooksDetailsPageProps {
  disabled: boolean;
  errors: WebhookCreate_webhookCreate_webhookErrors[];
  webhook: WebhookDetails_webhook;
  services?: SearchServiceAccount_search_edges_node[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onDelete: () => void;
  fetchServiceAccounts: (data: string) => void;
  onSubmit: (data: FormData) => void;
}

const WebhooksDetailsPage: React.FC<WebhooksDetailsPageProps> = ({
  disabled,
  errors: apiErrors,
  webhook,
  saveButtonBarState,
  services,
  fetchServiceAccounts,
  onBack,
  onDelete,
  onSubmit
}) => {
  const intl = useIntl();
  const initialForm: FormData = {
    allEvents: !!maybe(() => webhook.events, []).find(
      event => event.eventType === WebhookEventTypeEnum.ANY_EVENTS
    ),
    events: maybe(() => webhook.events, [])
      .map(event => event.eventType)
      .filter(event => event !== WebhookEventTypeEnum.ANY_EVENTS),
    id: maybe(() => webhook.id, null),
    isActive: maybe(() => webhook.isActive, false),
    name: maybe(() => webhook.name, ""),
    secretKey: maybe(() => webhook.secretKey, ""),
    serviceAccount: maybe(() => webhook.serviceAccount.id, ""),
    targetUrl: maybe(() => webhook.targetUrl, "")
  };
  const [
    selectedServiceAcccounts,
    setSelectedServiceAcccounts
  ] = useStateFromProps(maybe(() => webhook.serviceAccount.name, ""));
  const servicesChoiceList = maybe(
    () =>
      services.map(node => ({
        label: node.name,
        value: node.id
      })),
    []
  );
  return (
    <Form errors={apiErrors} initial={initialForm} onSubmit={onSubmit}>
      {({ data, errors, hasChanged, submit, change }) => {
        const handleServiceSelect = createSingleAutocompleteSelectHandler(
          change,
          setSelectedServiceAcccounts,
          servicesChoiceList
        );
        return (
          <Container>
            <AppHeader onBack={onBack}>
              {intl.formatMessage(sectionNames.webhooks)}
            </AppHeader>
            <PageHeader
              title={intl.formatMessage(
                {
                  defaultMessage: "{webhookName} Details",
                  description: "header"
                },
                {
                  webhookName: maybe(() => webhook.name, "...")
                }
              )}
            />
            <Grid>
              <div>
                <WebhookInfo
                  apiErrors={apiErrors}
                  data={data}
                  disabled={disabled}
                  serviceDisplayValue={selectedServiceAcccounts}
                  services={servicesChoiceList}
                  fetchServiceAccounts={fetchServiceAccounts}
                  errors={errors}
                  serviceOnChange={handleServiceSelect}
                  onChange={change}
                />
              </div>
              <div>
                <WebhookEvents
                  data={data}
                  onChange={change}
                  disabled={disabled}
                />
                <FormSpacer />
                <WebhookStatus
                  data={data.isActive}
                  disabled={disabled}
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
        );
      }}
    </Form>
  );
};
WebhooksDetailsPage.displayName = "WebhooksDetailsPage";
export default WebhooksDetailsPage;
