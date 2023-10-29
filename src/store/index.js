import { configureStore,combineReducers} from '@reduxjs/toolkit';
import CardSlice from './CardSlice';
import DevicesSlice from './DevicesSlice';

const rootReducer = combineReducers({
   devices: DevicesSlice,
   card: CardSlice
})

export const store = configureStore({
   reducer: rootReducer
})