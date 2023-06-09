import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/user.service";


export const getMemberships = createAsyncThunk(
    "get/memberships",
    async (data, thunkAPI) => {
        try {
            const response = await userService.getMemberships();
            console.log(response.data);
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const buyMembership = createAsyncThunk(
    "buy/membership",
    async (data, thunkAPI) => {
        try {
            const response = await userService.buyMembership(data);
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const initialState = {
    isLoading: true,
    memberships: []
};

const membershipSlice = createSlice({
    name: "memberships",
    initialState,
    extraReducers: {
        [getMemberships.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getMemberships.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.memberships = action.payload
        },
        [getMemberships.rejected]: (state, action) => {
            state.isLoading = false;
            state.memberships = []
        },

    }
});

export default membershipSlice.reducer;