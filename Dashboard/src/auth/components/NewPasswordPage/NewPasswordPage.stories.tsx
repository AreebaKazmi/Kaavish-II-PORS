import { storiesOf } from "@storybook/react";
import React from "react";

import CardDecorator from "@Kaavish/storybook//CardDecorator";
import Decorator from "@Kaavish/storybook//Decorator";
import NewPasswordPage from "./NewPasswordPage";

storiesOf("Views / Authentication / Set up a new password", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("default", () => (
    <NewPasswordPage disabled={false} onSubmit={() => undefined} />
  ))
  .add("loading", () => (
    <NewPasswordPage disabled={true} onSubmit={() => undefined} />
  ));
