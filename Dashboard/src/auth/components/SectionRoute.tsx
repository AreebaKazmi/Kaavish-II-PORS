import React from "react";
import ErrorBoundary from "react-error-boundary";
import { Route, RouteProps } from "react-router-dom";

import AppLayout from "@Kaavish/components/AppLayout";
import ErrorPage from "@Kaavish/components/ErrorPage";
import useNavigator from "@Kaavish/hooks/useNavigator";
import useUser from "@Kaavish/hooks/useUser";
import NotFound from "../../NotFound";
import { PermissionEnum } from "../../types/globalTypes";
import { hasPermission } from "../misc";

interface SectionRouteProps extends RouteProps {
  permissions?: PermissionEnum[];
}

export const SectionRoute: React.StatelessComponent<SectionRouteProps> = ({
  permissions,
  ...props
}) => {
  const navigate = useNavigator();
  const { user } = useUser();

  const hasPermissions =
    !permissions ||
    permissions
      .map(permission => hasPermission(permission, user))
      .reduce((prev, curr) => prev && curr);
  return hasPermissions ? (
    <AppLayout>
      <ErrorBoundary
        FallbackComponent={() => <ErrorPage onBack={() => navigate("/")} />}
        key={permissions ? permissions.join(":") : "home"}
      >
        <Route {...props} />
      </ErrorBoundary>
    </AppLayout>
  ) : (
    <NotFound />
  );
};
SectionRoute.displayName = "Route";
export default SectionRoute;
