import { createSlice } from "@reduxjs/toolkit";



const cardSlice = createSlice({
    name: "card",
    initialState: {
        devicesInCard: []
    },
    reducers: {
        addToCard(state,action){
            const newitem = state.devicesInCard.find(item=>item.id === action.payload.id)
            if(newitem){
               state.devicesInCard.map(item=>{
                  if(item.id === newitem.id)
                     return item.count++
                  return item
               })
            }
            else
             state.devicesInCard.push(action.payload)
        },
        deleteFromCard(state,action){
            const index = state.devicesInCard.findIndex(item=>item.id === action.payload)
            state.devicesInCard.splice(index,1)
        },
        plusAmmount(state, action){
            state.devicesInCard.map(item=>{
                if(item.id === action.payload)
                   return item.count++
                return item
             })
        },
        minusAmmount(state, action){
            state.devicesInCard.map(item=>{
                if(item.id === action.payload)
                   return item.count--
                return item
             })
        }
    }
})

export default cardSlice.reducer
export const {addToCard,deleteFromCard,plusAmmount,minusAmmount} = cardSlice.actions