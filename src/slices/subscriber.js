import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import profileService from "../services/profile.service";

export const postSubscriberProfile = createAsyncThunk(
    "post/profile/subscriber",
    async (data, thunkAPI) => {
        try {
            const response = await profileService.postProfile(data);
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

export const getSubscriberProfile = createAsyncThunk(
    "get/profile/subscriber",
    async (data, thunkAPI) => {
        try {
            const response = await profileService.getProfile();
            return response;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue();
        }
    }
);


const initialState = {
    subscriberProfileCreated: false,
    subscriberProfileData: null
};

const subscriberProfileSlice = createSlice({    
    name: "subscriberProfile",
    initialState,
    reducers: {
        setSubscriberProfile: (state, action) => {
            state.subscriberProfileCreated = true;
            state.subscriberProfileData = action.payload;
        },
    },
    extraReducers: {
        [postSubscriberProfile.fulfilled]: (state, action) => {
            state.subscriberProfileCreated = true;
            state.subscriberProfileData = action.payload;
        },
        [postSubscriberProfile.rejected]: (state, action) => {
            state.subscriberProfileCreated = false;
            state.subscriberProfileData = null;
        },
        [getSubscriberProfile.fulfilled]: (state, action) => {
            state.subscriberProfileCreated = true;
            state.subscriberProfileData = action.payload;
        },
        [getSubscriberProfile.rejected]: (state, action) => {
            state.subscriberProfileCreated = false;
            state.subscriberProfileData = null;
        },

    }
});

export const { setSubscriberProfile } = subscriberProfileSlice.actions;
export default subscriberProfileSlice.reducer;