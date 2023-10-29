import axios from "axios"
import { loadDevices } from "../DevicesSlice"

export const axiosDevices = () =>{
    return  function(dispatch){
        axios.get("https://653c019ad5d6790f5ec7bdf7.mockapi.io/Devices").then(res=> dispatch(loadDevices(res.data)))
    }
}