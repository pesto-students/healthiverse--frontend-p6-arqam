import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import profileService from "../services/profile.service";

export const postProfile = createAsyncThunk(
    "post/subscriber",
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
            console.log(error);
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

const initialState = {
    profileCreated: false
};

const profileSLice = createSlice({
    name: "profile",
    initialState,
    extraReducers: {
        [postProfile.fulfilled]: (state, action) => {
            return { profileCreated: true };
        },
        [postProfile.rejected]: (state, action) => {
            console.log("Not fulfilled");
            return { profileCreated: false };
        },

    }
});

export default profileSLice.reducer;