import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import profileService from "../services/profile.service";



export const postBusinessProfile = createAsyncThunk(
    "post/profile/subscriber",
    async (data, thunkAPI) => {
        try {
            const response = await profileService.postBusinessProfile(data);
            thunkAPI.dispatch(setMessage("Profile Created"));
            console.log("fulfilled");
            console.log(response);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log("Not fulfilled");
            console.log(error);
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const getBusinessProfile = createAsyncThunk(
    "get/profile/subscriber",
    async (data, thunkAPI) => {
        try {
            const response = await profileService.getBusinessProfile();
            return response;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue();
        }
    }
);



const initialState = {
    businessProfileCreated: false,
    businessProfileData: null
};

const businessProfileSlice = createSlice({
    name: "businessProfile",
    initialState,
    reducers: {
        setBusinessProfile: (state, action) => {
            state.businessProfileCreated = true;
            state.businessProfileData = action.payload;
        },
    },
    extraReducers: {
        [postBusinessProfile.fulfilled]: (state, action) => {
            state.businessProfileCreated = true;
            state.businessProfileData = action.payload;
        },
        [postBusinessProfile.rejected]: (state, action) => {
            state.businessProfileCreated = false;
            state.businessProfileData = null;
        },
        [getBusinessProfile.fulfilled]: (state, action) => {
            state.businessProfileCreated = true;
        },
        [getBusinessProfile.rejected]: (state, action) => {
            state.businessProfileCreated = false;
            state.businessProfileData = null;
        },

    }
});


export const { setBusinessProfile } = businessProfileSlice.actions;
export default businessProfileSlice.reducer;