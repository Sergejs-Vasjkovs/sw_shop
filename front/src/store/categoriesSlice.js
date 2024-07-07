import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    currentValue: {}
};

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        fetchCategoriesSuccess: (state, action) => {
            state.value = action.payload;
            state.currentValue = action.payload[0];
        },
        setCurrentValue: (state, action) => {
            state.currentValue = action.payload;
        }
    }
});

const { actions, reducer } = categoriesSlice;
export const { fetchCategoriesSuccess, setCurrentValue } = actions;

export default reducer;
