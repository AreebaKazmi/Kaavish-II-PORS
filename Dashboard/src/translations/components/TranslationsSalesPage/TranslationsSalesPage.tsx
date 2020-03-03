import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@Kaavish/components/AppHeader";
import Container from "@Kaavish/components/Container";
import LanguageSwitch from "@Kaavish/components/LanguageSwitch";
import PageHeader from "@Kaavish/components/PageHeader";
import { commonMessages, sectionNames } from "@Kaavish/intl";
import { maybe } from "../../../misc";
import { LanguageCodeEnum } from "../../../types/globalTypes";
import { SaleTranslationFragment } from "../../types/SaleTranslationFragment";
import { TranslationsEntitiesPageProps } from "../../types/TranslationsEntitiesPage";
import TranslationFields from "../TranslationFields";

export interface TranslationsSalesPageProps
  extends TranslationsEntitiesPageProps {
  sale: SaleTranslationFragment;
}

export const fieldNames = {
  name: "name"
};

const TranslationsSalesPage: React.StatelessComponent<
  TranslationsSalesPageProps
> = ({
  activeField,
  disabled,
  languageCode,
  languages,
  sale,
  saveButtonState,
  onBack,
  onDiscard,
  onEdit,
  onLanguageChange,
  onSubmit
}) => {
  const intl = useIntl();

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.translations)}
      </AppHeader>
      <PageHeader
        title={intl.formatMessage(
          {
            defaultMessage: 'Translation Sale "{saleName}" - {languageCode}',
            description: "header"
          },
          {
            languageCode,
            saleName: maybe(() => sale.name, "...")
          }
        )}
      >
        <LanguageSwitch
          currentLanguage={LanguageCodeEnum[languageCode]}
          languages={languages}
          onLanguageChange={onLanguageChange}
        />
      </PageHeader>
      <TranslationFields
        activeField={activeField}
        disabled={disabled}
        initialState={true}
        title={intl.formatMessage(commonMessages.generalInformations)}
        fields={[
          {
            displayName: intl.formatMessage({
              defaultMessage: "Sale Name"
            }),
            name: fieldNames.name,
            translation: maybe(() =>
              sale.translation ? sale.translation.name : null
            ),
            type: "short" as "short",
            value: maybe(() => sale.name)
          }
        ]}
        saveButtonState={saveButtonState}
        onEdit={onEdit}
        onDiscard={onDiscard}
        onSubmit={onSubmit}
      />
    </Container>
  );
};
TranslationsSalesPage.displayName = "TranslationsSalesPage";
export default TranslationsSalesPage;
