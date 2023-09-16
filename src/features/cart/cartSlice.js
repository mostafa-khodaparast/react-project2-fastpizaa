import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartList: [],
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            state.cartList.push(action.payload)     //payload is an array

        },
        deleteItem(state, action) {
            state.cartList = state.cartList.filter(item => item.pizzaId !== action.payload) //payload is an ID
        },
        increaseItemQuantity(state, action) {
            const item = state.cartList.find(item => item.pizzaId === action.payload) //payload is an ID
            item.quantity++
            item.totalPrice = item.quantity * item.unitPrice
        },
        decreaseItemQuantity(state, action) {
            const item = state.cartList.find(item => item.pizzaId === action.payload) //payload is an ID
            item.quantity--
            item.totalPrice = item.quantity * item.unitPrice
            if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action) //manually call an action in reducer
        },
        deleteCart(state, action) {
            state.cartList = []
        }
    }
})


export const {
    addItem,
    deleteItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    deleteCart
} = cartSlice.actions

export default cartSlice.reducer