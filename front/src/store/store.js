import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";
import categoriesSlice from "./categoriesSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        products: productsSlice,
        categories: categoriesSlice,
        modal: modalSlice
    }
});
