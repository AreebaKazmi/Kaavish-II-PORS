import { storiesOf } from "@storybook/react";
import React from "react";

import CardDecorator from "@Kaavish/storybook/CardDecorator";
import Decorator from "@Kaavish/storybook/Decorator";
import ResetPasswordSuccessPage from "./ResetPasswordSuccessPage";

storiesOf("Views / Authentication / Reset password success", module)
  .addDecorator(CardDecorator)
  .addDecorator(Decorator)
  .add("default", () => <ResetPasswordSuccessPage onBack={() => undefined} />);
