import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        data: []
    },
    reducers: {
        fetchProductsSuccess: (state, action) => {
            state.data = action.payload;
        }
    }
});

const { actions, reducer } = productsSlice;
export const { fetchProductsSuccess } = actions;

export default reducer;
