import { configureStore } from '@reduxjs/toolkit';
import machineReducer from './machineSlice'; // Import the machineSlice reducer

const store = configureStore({
    reducer: {
        machine: machineReducer, // Add the machineReducer to the store
    },
});

export default store;
