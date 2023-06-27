import {useLocalStorage} from "@vueuse/core";

export const useShoppingCart = () => useLocalStorage<ShoppingCart[]>('shoppingCart', () => [])
