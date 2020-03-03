import { configurationMenuUrl } from "@Kaavish/configuration";
import useListSettings from "@Kaavish/hooks/useListSettings";
import useNavigator from "@Kaavish/hooks/useNavigator";
import usePaginator, {
  createPaginationState
} from "@Kaavish/hooks/usePaginator";
import { maybe } from "@Kaavish/misc";
import { ListViews } from "@Kaavish/types";
import React from "react";

import PluginsListPage from "../components/PluginsListPage/PluginsListPage";
import { TypedPluginsListQuery } from "../queries";
import { PluginsListUrlQueryParams, pluginsUrl } from "../urls";

interface PluginsListProps {
  params: PluginsListUrlQueryParams;
}

export const PluginsList: React.StatelessComponent<PluginsListProps> = ({
  params
}) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const { updateListSettings, settings } = useListSettings(
    ListViews.PLUGINS_LIST
  );
  const paginationState = createPaginationState(settings.rowNumber, params);

  return (
    <TypedPluginsListQuery displayLoader variables={paginationState}>
      {({ data, loading }) => {
        const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
          maybe(() => data.plugins.pageInfo),
          paginationState,
          params
        );
        return (
          <>
            <PluginsListPage
              disabled={loading}
              settings={settings}
              plugins={maybe(() => data.plugins.edges.map(edge => edge.node))}
              pageInfo={pageInfo}
              onAdd={() => navigate(configurationMenuUrl)}
              onBack={() => navigate(configurationMenuUrl)}
              onNextPage={loadNextPage}
              onPreviousPage={loadPreviousPage}
              onUpdateListSettings={updateListSettings}
              onRowClick={id => () => navigate(pluginsUrl(id))}
            />
          </>
        );
      }}
    </TypedPluginsListQuery>
  );
};

export default PluginsList;
