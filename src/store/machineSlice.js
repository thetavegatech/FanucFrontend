import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching machine data
export const fetchMachine = createAsyncThunk(
    'machine/fetchMachine',
    async (machineId) => {
        const response = await axios.get(`http://localhost:5001/api/machines/machine/${machineId}`);
        return response.data;
    }
);

const machineSlice = createSlice({
    name: 'machine',
    initialState: {
        loading: false,
        machine: {},
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMachine.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMachine.fulfilled, (state, action) => {
                state.loading = false;
                state.machine = action.payload;
                state.error = '';
            })
            .addCase(fetchMachine.rejected, (state, action) => {
                state.loading = false;
                state.machine = {};
                state.error = action.error.message;
            });
    }
});

export default machineSlice.reducer;
