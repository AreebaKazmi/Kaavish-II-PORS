import React from "react";

import { CredentialsProvider } from "../";
import { KaavishAPI } from "../../../";
import { KaavishContext } from "../../context";
import { IProps } from "./types";

export function KaavishProvider<TCacheShape = any>({
  client,
  children,
}: IProps<TCacheShape>): React.ReactElement<IProps<TCacheShape>> {
  return (
    <KaavishContext.Provider value={new KaavishAPI(client)}>
      <CredentialsProvider>{children}</CredentialsProvider>
    </KaavishContext.Provider>
  );
}
