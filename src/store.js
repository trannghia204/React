// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Import đúng reducer
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer, // Sử dụng reducer
        auth: authSlice,
    },
});

export default store;
