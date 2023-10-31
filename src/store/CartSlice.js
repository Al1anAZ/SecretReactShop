import { createSlice } from "@reduxjs/toolkit";



const cartSlice = createSlice({
    name: "cart",
    initialState: {
        devicesInCart: [],
        cartVisible: false,
        isOrderComplete: false
    },
    reducers: {
        updateCart(state,action){
             state.devicesInCart = action.payload
        },
        addToCart(state,action){
            const newitem = state.devicesInCart.find(item=>item.id === action.payload.id)
            if(newitem){
               state.devicesInCart.map(item=>{
                  if(item.id === newitem.id)
                     return item.count++
                  return item
               })
            }
            else
             state.devicesInCart.push(action.payload)
        },
        deleteFromCart(state,action){
            const index = state.devicesInCart.findIndex(item=>item.id === action.payload)
            state.devicesInCart.splice(index,1)
        },
        plusAmmount(state, action){
            state.devicesInCart.map(item=>{
                if(item.id === action.payload)
                   return item.count++
                return item
             })
        },
        minusAmmount(state, action){
            state.devicesInCart.map(item=>{
                if(item.id === action.payload)
                   return item.count--
                return item
             })
        },
        setVisibleCart(state,action){
            state.cartVisible = action.payload;
        },
        setisOrderComplete(state, action){
            state.isOrderComplete = action.payload
        }
    }
})

export default cartSlice.reducer
export const {addToCart,deleteFromCart,plusAmmount,minusAmmount,setVisibleCart,updateCart,setisOrderComplete} = cartSlice.actions