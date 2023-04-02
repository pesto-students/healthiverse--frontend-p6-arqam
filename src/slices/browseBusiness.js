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
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const initialState = {
    isLoading: true,
    allBusiness: null,
};

const browseBusinessSlice = createSlice({
    name: "browse/business",
    initialState,
    extraReducers: {
        [getAllBusiness.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllBusiness.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.allBusiness = action.payload;
        },
        [getAllBusiness.rejected]: (state, action) => {
            state.isLoading = false;
            state.allBusiness = null;
        }

    }
});

export default browseBusinessSlice.reducer;