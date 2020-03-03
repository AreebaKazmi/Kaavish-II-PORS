import React from "react";
import { IntlShape, useIntl } from "react-intl";

import { attributeListUrl } from "@Kaavish/attributes/urls";
import { WindowTitle } from "@Kaavish/components/WindowTitle";
import useNavigator from "@Kaavish/hooks/useNavigator";
import useUser from "@Kaavish/hooks/useUser";
import Attributes from "@Kaavish/icons/Attributes";
import Bot from "@Kaavish/icons/Bot";
import Navigation from "@Kaavish/icons/Navigation";
import Pages from "@Kaavish/icons/Pages";
import Plugins from "@Kaavish/icons/Plugins";
import ProductTypes from "@Kaavish/icons/ProductTypes";
import ShippingMethods from "@Kaavish/icons/ShippingMethods";
import SiteSettings from "@Kaavish/icons/SiteSettings";
import StaffMembers from "@Kaavish/icons/StaffMembers";
import Taxes from "@Kaavish/icons/Taxes";
import Webhooks from "@Kaavish/icons/Webhooks";
import { sectionNames } from "@Kaavish/intl";
import { maybe } from "@Kaavish/misc";
import { menuListUrl } from "@Kaavish/navigation/urls";
import { pageListUrl } from "@Kaavish/pages/urls";
import { pluginsListUrl } from "@Kaavish/plugins/urls";
import { productTypeListUrl } from "@Kaavish/productTypes/urls";
import { serviceListUrl } from "@Kaavish/services/urls";
import { shippingZonesListUrl } from "@Kaavish/shipping/urls";
import { siteSettingsUrl } from "@Kaavish/siteSettings/urls";
import { staffListUrl } from "@Kaavish/staff/urls";
import { taxSection } from "@Kaavish/taxes/urls";
import { PermissionEnum } from "@Kaavish/types/globalTypes";
import { webhooksListUrl } from "@Kaavish/webhooks/urls";
import ConfigurationPage, { MenuSection } from "./ConfigurationPage";

export function createConfigurationMenu(intl: IntlShape): MenuSection[] {
  return [
    {
      label: intl.formatMessage({
        defaultMessage: "Attributes and Product Typess"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Determine attributes used to create product types",
            id: "configurationMenuAttributes"
          }),
          icon: <Attributes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: intl.formatMessage(sectionNames.attributes),
          url: attributeListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Define types of products you sell",
            id: "configurationMenuProductTypes"
          }),
          icon: <ProductTypes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: intl.formatMessage(sectionNames.productTypes),
          url: productTypeListUrl()
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Product Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage how you ship out orders",
            id: "configurationMenuShipping"
          }),
          icon: <ShippingMethods fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SHIPPING,
          title: intl.formatMessage(sectionNames.shipping),
          url: shippingZonesListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Manage how your store charges tax",
            id: "configurationMenuTaxes"
          }),
          icon: <Taxes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: intl.formatMessage(sectionNames.taxes),
          url: taxSection
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Staff Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage your employees and their permissions",
            id: "configurationMenuStaff"
          }),
          icon: <StaffMembers fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_STAFF,
          title: intl.formatMessage(sectionNames.staff),
          url: staffListUrl()
        }
      ]
    },
    {
      label: intl.formatMessage({
        defaultMessage: "Miscellaneous"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Define how users can navigate through your store",
            id: "configurationMenuNavigation"
          }),
          icon: <Navigation fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_MENUS,
          title: intl.formatMessage(sectionNames.navigation),
          url: menuListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your site settings",
            id: "configurationMenuSiteSettings"
          }),
          icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: intl.formatMessage(sectionNames.siteSettings),
          url: siteSettingsUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Manage and add additional pages",
            id: "configurationMenuPages"
          }),
          icon: <Pages fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PAGES,
          title: intl.formatMessage(sectionNames.pages),
          url: pageListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your plugins and their settings.",
            id: "configurationPluginsPages"
          }),
          icon: (
            <Plugins
              fontSize="inherit"
              viewBox="-8 -5 44 44"
              preserveAspectRatio="xMinYMin meet"
            />
          ),
          permission: PermissionEnum.MANAGE_PLUGINS,
          title: intl.formatMessage(sectionNames.plugins),
          url: pluginsListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Manage external integrations accounts"
          }),
          icon: <Bot fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SERVICE_ACCOUNTS,
          title: intl.formatMessage(sectionNames.serviceAccounts),
          url: serviceListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your webhook and their settings"
          }),
          icon: <Webhooks fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_WEBHOOKS,
          title: intl.formatMessage(sectionNames.webhooks),
          url: webhooksListUrl()
        }
      ]
    }
  ];
}

export const configurationMenuUrl = "/configuration/";

export const ConfigurationSection: React.FC = () => {
  const navigate = useNavigator();
  const user = useUser();
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.configuration)} />
      <ConfigurationPage
        menu={createConfigurationMenu(intl)}
        user={maybe(() => user.user)}
        onSectionClick={navigate}
      />
    </>
  );
};
export default ConfigurationSection;
