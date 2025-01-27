import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import cartSlice from "./slices/cartSlice";
import productsSlice from "./slices/productsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import modalSlice from "./slices/modalSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"]
};

const rootReducer = combineReducers({
    cart: cartSlice,
    products: productsSlice,
    categories: categoriesSlice,
    modal: modalSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"]
            }
        })
});

export const persistor = persistStore(store);
