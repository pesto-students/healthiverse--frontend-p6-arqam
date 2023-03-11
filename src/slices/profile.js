import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import profileService from "../services/profile.service";

export const postProfile = createAsyncThunk(
    "post/profile",
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

export const postBusinessProfile = createAsyncThunk(
    "post/profile",
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

const initialState = { profileCreated: false };

const profileSLice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        profileFound: (state, action) => {
            state.profileCreated = true;
        },
    },
    extraReducers: {
        [postProfile.fulfilled]: (state, action) => {
            state.profileCreated = true;
        },
        [postProfile.rejected]: (state, action) => {
            state.profileCreated = false;
        },

    }
});

export const {profileFound} = profileSLice.actions;
export default profileSLice.reducer;