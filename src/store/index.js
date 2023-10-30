import { configureStore,combineReducers} from '@reduxjs/toolkit';
import CartSlice from './CartSlice';
import DevicesSlice from './DevicesSlice';

const rootReducer = combineReducers({
   devices: DevicesSlice,
   cart: CartSlice
})

export const store = configureStore({
   reducer: rootReducer
})