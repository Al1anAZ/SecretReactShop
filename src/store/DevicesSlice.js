import { createSlice } from "@reduxjs/toolkit";


const DevicesSlice = createSlice({
    name: "devices",
    initialState: {
        devices: []
    },
    reducers:{
          loadDevices(state,action){
              state.devices = action.payload
          }
    }
})

export default DevicesSlice.reducer
export const {loadDevices} = DevicesSlice.actions