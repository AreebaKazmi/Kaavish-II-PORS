import React from "react";

import { KaavishAPI } from "../";
import { getAuthToken, removeAuthToken } from "../auth";
import { KaavishContext } from "./context";

export function useKaavishClient(): KaavishAPI {
  const Kaavish = React.useContext(KaavishContext);

  if (!Kaavish) {
    throw new Error(
      "Could not find Kaavish's apollo client in the context. " +
        "Did you forget to wrap the root component in a <KaavishProvider>?"
    );
  }
  return Kaavish;
}

export const useAuth = (
  stateChangeCallback?: (authenticated?: boolean) => void
) => {
  const [authenticated, setAuthenticated] = React.useState(!!getAuthToken());
  const eventHandler = () => {
    const newState = !!getAuthToken();

    if (stateChangeCallback && authenticated !== newState) {
      stateChangeCallback(newState);
    }

    setAuthenticated(newState);
  };

  React.useEffect(() => {
    addEventListener("auth", eventHandler);

    return () => {
      removeEventListener("auth", eventHandler);
    };
  }, [authenticated]);

  return { authenticated };
};

export const useSignOut = () => [
  () => {
    removeAuthToken();
    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      navigator.credentials.preventSilentAccess();
    }
  },
];
