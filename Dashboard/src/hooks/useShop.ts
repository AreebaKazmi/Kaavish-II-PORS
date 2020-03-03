import { useContext } from "react";

import { ShopContext } from "@Kaavish/components/Shop";

function useShop() {
  return useContext(ShopContext);
}
export default useShop;
