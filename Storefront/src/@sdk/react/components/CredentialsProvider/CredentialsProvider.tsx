import React from "react";

import { useKaavishClient, useSignIn } from "../..";
import { IProps } from "./types";

export function CredentialsProvider({
  children,
}: IProps): React.ReactElement<IProps> {
  const Kaavish = useKaavishClient();
  const [signIn] = useSignIn();

  const autoSignIn = async () => {
    const credentials = await navigator.credentials.get({
      password: true,
    });

    if (credentials) {
      await signIn({
        email: credentials.id,
        password: credentials.password,
      });
    }
  };

  React.useEffect(() => {
    if (!Kaavish.isLoggedIn() && window.PasswordCredential) {
      autoSignIn();
    }
  }, []);

  return children;
}
