import { storiesOf } from "@storybook/react";
import React from "react";

import ErrorMessageCard from "@Kaavish/components/ErrorMessageCard";

storiesOf("Generics / ErrorMessageCard", module).add("default", () => (
  <ErrorMessageCard message="Loren ipsum dolor sit amet!" />
));
