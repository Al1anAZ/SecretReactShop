import { createSlice } from "@reduxjs/toolkit";


const DevicesSlice = createSlice({
    name: "devices",
    initialState: {
        devices: [],
        favorites: []
    },
    reducers:{
          loadDevices(state,action){
              state.devices = action.payload
          },
          updateFavorites(state,action){
            state.favorites = action.payload
          },
          addToFavorites(state,action){
              state.favorites.push(action.payload)
          },
          deleteFromFavorites(state,action){
            const index = state.favorites.findIndex(item=>item.id === action.payload.id)
            state.favorites.splice(index,1)
          }
    }
})

export default DevicesSlice.reducer
export const {loadDevices,updateFavorites,addToFavorites,deleteFromFavorites} = DevicesSlice.actions