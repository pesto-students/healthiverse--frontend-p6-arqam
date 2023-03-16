import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/user.service";

export const getAllBusiness = createAsyncThunk(
    "get/allBusiness",
    async (data, thunkAPI) => {
        try {
            const response = await userService.getAllBusiness();
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getMemberships = createAsyncThunk(
    "get/memberships",
    async (data, thunkAPI) => {
        try {
            const response = await userService.getMemberships();
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue();
        }
    }
);



const initialState = {
    isLoading: true,
    gyms: [],
    trainers: [],
    dieticians: [],
};

const businessMembershipSlice = createSlice({
    name: "memberships",
    initialState,
    extraReducers: {
        [getAllBusiness.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllBusiness.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.gyms = action.payload.gym;
            state.trainers = action.payload.trainer;
            state.dieticians = action.payload.dietician;
        },
        [getAllBusiness.rejected]: (state, action) => {
            state.isLoading = false;
            state.gyms = null;
            state.trainers = null;
            state.dieticians = null;
        },
        [getMemberships.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getMemberships.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.gyms = action.payload.gym;
            state.trainers = action.payload.trainer;
            state.dieticians = action.payload.dietician;
        },
        [getMemberships.rejected]: (state, action) => {
            state.isLoading = false;
            state.gyms = null;
            state.trainers = null;
            state.dieticians = null;
        },

    }
});

export default businessMembershipSlice.reducer;