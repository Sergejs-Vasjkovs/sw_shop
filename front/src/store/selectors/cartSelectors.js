import { createSelector } from "@reduxjs/toolkit";

export const selectCart = (state) => state.cart.value;
export const selectTotalPrice = (state) => state.cart.totalPrice;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;

export const selectTotalAmount = createSelector(
    [selectTotalPrice],
    (totalPrice) => totalPrice.totalAmount.toFixed(2)
);
