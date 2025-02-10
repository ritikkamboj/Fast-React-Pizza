import { configureStore } from "@reduxjs/toolkit";

import userReducer from '../features/user/userSlice';
import cartReducer from '../features/cart/userCart';

const store = configureStore({
    reducer: {

        user: userReducer,
        cart: cartReducer

    }
});

export default store;