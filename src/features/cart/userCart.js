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
            console.log('adding item to cart')
            state.cart.push(action.payload)
        },
        deleteFromCart(state, action) {
            state.cart = state.cart.filter((item) => item.id !== action.payload)

        },
        increaseItemQuantitie(state, action) {
            const item = state.cart.find((item) => item.id === action.payload);
            

            item.numOfItems++;
            item.totalPrice = item.numOfItems * item.unitPrice



        },
        decreaseItemQuantitie(state, action) {
            const item = state.cart.find((item) => item.id === action.payload);

            item.numOfItems--;
            if(item.numOfItems === 0 ) cartSlice.caseReducers.deleteFromCart(state,action);

            item.totalPrice = item.numOfItems * item.unitPrice


        },
        clearCart(state) {
            state.cart = [];
        }
    }

})

export const { decreaseItemQuantitie, increaseItemQuantitie, AddToCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


export const getCart = (state) => state.cart.cart;

export const getCartQuantity = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.numOfItems, 0);


export const getTotalCartPrice = (state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);




export const getCurrentQuanityById = (id) => (state) => state.cart.cart.find((item) => item.id === id)?.numOfItems ?? 0;

// export const getCurrentQuantityById = (id) => {
//     return (state) => {
//       // Get the list of items from the cart
//       const items = state.cart.cart;
      
//       // Find the item with the matching id
//       const foundItem = items.find((item) => item.id === id);
      
//       // If foundItem exists, return its numOfItems; otherwise, return 0
//       if (foundItem) {
//         return foundItem.numOfItems;
//       } else {
//         return 0;
//       }
//     };
//   };
  