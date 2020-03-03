import { storiesOf } from "@storybook/react";
import React from "react";

import AttributeListPage, {
  AttributeListPageProps
} from "@Kaavish/attributes/components/AttributeListPage";
import { attributes } from "@Kaavish/attributes/fixtures";
import {
  listActionsProps,
  pageListProps,
  searchPageProps,
  tabPageProps
} from "@Kaavish/fixtures";
import Decorator from "../../Decorator";

const props: AttributeListPageProps = {
  ...pageListProps.default,
  ...listActionsProps,
  ...tabPageProps,
  ...searchPageProps,
  attributes,
  onBack: () => undefined
};

storiesOf("Views / Attributes / Attribute list", module)
  .addDecorator(Decorator)
  .add("default", () => <AttributeListPage {...props} />)
  .add("loading", () => (
    <AttributeListPage {...props} attributes={undefined} disabled={true} />
  ))
  .add("no data", () => <AttributeListPage {...props} attributes={[]} />);
