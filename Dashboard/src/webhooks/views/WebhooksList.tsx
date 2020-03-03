import DeleteFilterTabDialog from "@Kaavish/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@Kaavish/components/SaveFilterTabDialog";
import { configurationMenuUrl } from "@Kaavish/configuration";
import useListSettings from "@Kaavish/hooks/useListSettings";
import useNavigator from "@Kaavish/hooks/useNavigator";
import useNotifier from "@Kaavish/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@Kaavish/hooks/usePaginator";
import { commonMessages } from "@Kaavish/intl";
import { getMutationState, maybe } from "@Kaavish/misc";
import { ListViews } from "@Kaavish/types";
import WebhookDeleteDialog from "@Kaavish/webhooks/components/WebhookDeleteDialog";
import { WebhookDelete } from "@Kaavish/webhooks/types/WebhookDelete";
import React from "react";
import { useIntl } from "react-intl";

import WebhooksListPage from "../components/WebhooksListPage/WebhooksListPage";
import { TypedWebhookDelete } from "../mutations";
import { TypedWebhooksListQuery } from "../queries";
import {
  WebhookListUrlDialog,
  WebhookListUrlFilters,
  webhooksAddUrl,
  webhooksListUrl,
  WebhooksListUrlQueryParams,
  webhooksUrl
} from "../urls";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "./filter";

interface WebhooksListProps {
  params: WebhooksListUrlQueryParams;
}

export const WebhooksList: React.FC<WebhooksListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const notify = useNotifier();
  const intl = useIntl();
  const { updateListSettings, settings } = useListSettings(
    ListViews.WEBHOOK_LIST
  );
  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const changeFilterField = (filter: WebhookListUrlFilters) =>
    navigate(
      webhooksListUrl({
        ...getActiveFilters(params),
        ...filter,
        activeTab: undefined
      })
    );
  const closeModal = () =>
    navigate(
      webhooksListUrl({
        ...params,
        action: undefined,
        id: undefined
      }),
      true
    );

  const openModal = (action: WebhookListUrlDialog, id?: string) =>
    navigate(
      webhooksListUrl({
        ...params,
        action,
        id
      })
    );

  const handleTabChange = (tab: number) => {
    navigate(
      webhooksListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    navigate(webhooksListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params)
    }),
    [params]
  );

  return (
    <TypedWebhooksListQuery displayLoader variables={queryVariables}>
      {({ data, loading, refetch }) => {
        const onWebhookDelete = (data: WebhookDelete) => {
          if (data.webhookDelete.errors.length === 0) {
            notify({
              text: intl.formatMessage(commonMessages.savedChanges)
            });
            navigate(webhooksListUrl());
            refetch();
          }
        };
        return (
          <TypedWebhookDelete onCompleted={onWebhookDelete}>
            {(webhookDelete, webhookDeleteOpts) => {
              const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
                maybe(() => data.webhooks.pageInfo),
                paginationState,
                params
              );
              const handleRemove = (id: string) => {
                navigate(
                  webhooksListUrl({
                    ...params,
                    action: "remove",
                    id
                  })
                );
              };
              const handleRemoveConfirm = () => {
                webhookDelete({
                  variables: {
                    id: params.id
                  }
                });
              };

              const deleteTransitionState = getMutationState(
                webhookDeleteOpts.called,
                webhookDeleteOpts.loading,
                maybe(() => webhookDeleteOpts.data.webhookDelete.errors)
              );

              return (
                <>
                  <WebhooksListPage
                    currentTab={currentTab}
                    initialSearch={params.query || ""}
                    onSearchChange={query => changeFilterField({ query })}
                    onAll={() => navigate(webhooksListUrl())}
                    onTabChange={handleTabChange}
                    onTabDelete={() => openModal("delete-search")}
                    onTabSave={() => openModal("save-search")}
                    tabs={tabs.map(tab => tab.name)}
                    disabled={loading}
                    settings={settings}
                    webhooks={maybe(() =>
                      data.webhooks.edges.map(edge => edge.node)
                    )}
                    pageInfo={pageInfo}
                    onAdd={() => navigate(webhooksAddUrl)}
                    onBack={() => navigate(configurationMenuUrl)}
                    onNextPage={loadNextPage}
                    onPreviousPage={loadPreviousPage}
                    onRemove={handleRemove}
                    onUpdateListSettings={updateListSettings}
                    onRowClick={id => () => navigate(webhooksUrl(id))}
                  />
                  <WebhookDeleteDialog
                    confirmButtonState={deleteTransitionState}
                    name={maybe(
                      () =>
                        data.webhooks.edges.find(
                          edge => edge.node.id === params.id
                        ).node.name,
                      "..."
                    )}
                    onClose={closeModal}
                    onConfirm={handleRemoveConfirm}
                    open={params.action === "remove"}
                  />
                  <SaveFilterTabDialog
                    open={params.action === "save-search"}
                    confirmButtonState="default"
                    onClose={closeModal}
                    onSubmit={handleTabSave}
                  />
                  <DeleteFilterTabDialog
                    open={params.action === "delete-search"}
                    confirmButtonState="default"
                    onClose={closeModal}
                    onSubmit={handleTabDelete}
                    tabName={maybe(() => tabs[currentTab - 1].name, "...")}
                  />
                </>
              );
            }}
          </TypedWebhookDelete>
        );
      }}
    </TypedWebhooksListQuery>
  );
};

export default WebhooksList;
