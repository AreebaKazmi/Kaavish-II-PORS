import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@Kaavish/components/AppHeader";
import Container from "@Kaavish/components/Container";
import PageHeader from "@Kaavish/components/PageHeader";
import { sectionNames } from "@Kaavish/intl";
import { PageListProps } from "@Kaavish/types";
import { Plugins_plugins_edges_node } from "../../types/Plugins";
import PluginsList from "../PluginsList/PluginsList";

export interface PluginsListPageProps extends PageListProps {
  plugins: Plugins_plugins_edges_node[];
  onBack: () => void;
}

const PluginsListPage: React.StatelessComponent<PluginsListPageProps> = ({
  disabled,
  settings,
  onBack,
  onNextPage,
  onPreviousPage,
  onRowClick,
  onUpdateListSettings,
  pageInfo,
  plugins
}) => {
  const intl = useIntl();
  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.plugins)} />
      <PluginsList
        disabled={disabled}
        settings={settings}
        plugins={plugins}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        onUpdateListSettings={onUpdateListSettings}
        onRowClick={onRowClick}
        pageInfo={pageInfo}
      />
    </Container>
  );
};
PluginsListPage.displayName = "PluginsListPage";
export default PluginsListPage;
