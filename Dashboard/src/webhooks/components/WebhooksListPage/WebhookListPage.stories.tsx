import { storiesOf } from "@storybook/react";
import React from "react";

import {
  listActionsProps,
  pageListProps,
  searchPageProps,
  tabPageProps
} from "@Kaavish/fixtures";
import Decorator from "@Kaavish/storybook/Decorator";
import { webhookList } from "../../fixtures";
import WebhooksListPage, { WebhooksListPageProps } from "./WebhooksListPage";

const props: WebhooksListPageProps = {
  ...listActionsProps,
  ...pageListProps.default,
  ...searchPageProps,
  ...tabPageProps,
  onBack: () => undefined,
  onRemove: () => undefined,
  webhooks: webhookList
};

storiesOf("Views / Webhooks / Webhook list", module)
  .addDecorator(Decorator)
  .add("default", () => <WebhooksListPage {...props} />)
  .add("loading", () => (
    <WebhooksListPage {...props} disabled={true} webhooks={undefined} />
  ))
  .add("no data", () => <WebhooksListPage {...props} webhooks={[]} />);
