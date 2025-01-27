import { createSlice } from "@reduxjs/toolkit";
import { calculateTotalPrice } from "../../app/utils/calculateTotalPrice";

const initialState = {
    value: [],
    totalPrice: {
        totalAmount: 0,
        currency: "USD",
        symbol: "$"
    },
    totalQuantity: 0
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart(state, action) {
            const itemToAdd = action.payload;
            const existingItemIndex = state.value.findIndex(
                (item) => item.id === itemToAdd.id && JSON.stringify(item.input) === JSON.stringify(itemToAdd.input)
            );

            if (existingItemIndex >= 0) {
                state.value[existingItemIndex].quantity++;
            } else {
                state.value.push({
                    ...itemToAdd,
                    time: Date.now(),
                    quantity: 1
                });
            }

            state.totalQuantity++;
            state.totalPrice = calculateTotalPrice(state.value, state.totalPrice);
        },
        addQuantity(state, action) {
            const time = action.payload;
            const existingProductIndex = state.value.findIndex((item) => item.time === time);

            if (existingProductIndex > -1) {
                state.value[existingProductIndex].quantity++;
                state.totalQuantity++;
                state.totalPrice = calculateTotalPrice(state.value);
            }
        },
        subtractQuantity(state, action) {
            const time = action.payload;
            const existingProductIndex = state.value.findIndex((item) => item.time === time);

            if (existingProductIndex > -1) {
                if (state.value[existingProductIndex].quantity === 1) {
                    state.value.splice(existingProductIndex, 1);
                } else {
                    state.value[existingProductIndex].quantity--;
                }

                state.totalQuantity--;
                state.totalPrice = calculateTotalPrice(state.value);
            }
        },
        clearCart(state) {
            state.value = initialState.value;
            state.totalPrice = initialState.totalPrice;
            state.totalQuantity = initialState.totalQuantity;
        }
    }
});

export const { addProductToCart, addQuantity, subtractQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
