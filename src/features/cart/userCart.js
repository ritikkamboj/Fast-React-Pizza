import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []

    // cart: [{
    //     id: 1,
    //     name: "pizza",
    //     unitPrice: 40,
    //     numOfItems: 5,
    //     totalPrice: 200

    // }]
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart(state, action) {
            state.cart.push(action.payload)
        },
        deleteFromCart(state, action) {
            state.cart = state.cart.filter((item) => item.id !== action.payload)

        },
        increaseItemQuantitie(state, action) {
            const item = state.cart.find((item) => item.id === action.id);

            item.numOfItems++;
            item.totalPrice = item.numOfItems * item.unitPrice


        },
        decreaseItemQuantitie(state, action) {
            const item = state.cart.find((item) => item.id === action.id);

            item.numOfItems--;
            item.totalPrice = item.numOfItems * item.unitPrice


        },
        clearCart(state) {
            state.cart = [];
        }
    }

})

export const { decreaseItemQuantitie, increaseItemQuantitie, AddToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const getCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.numOfItems, 0);


export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);