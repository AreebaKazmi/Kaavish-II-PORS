import { MultiAutocompleteChoiceType } from "@Kaavish/components/MultiAutocompleteSelectField";
import { ShopInfo_shop_countries } from "@Kaavish/components/Shop/types/ShopInfo";
import { SingleAutocompleteChoiceType } from "@Kaavish/components/SingleAutocompleteSelectField";

export function mapCountriesToChoices(
  countries: ShopInfo_shop_countries[]
): Array<SingleAutocompleteChoiceType | MultiAutocompleteChoiceType> {
  return countries.map(country => ({
    label: country.country,
    value: country.code
  }));
}
