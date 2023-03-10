import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import postService from "../services/post.service";
const profile = JSON.parse(localStorage.getItem("profile"));

export const postProfile = createAsyncThunk(
    "post/subscriber",
    async (data, thunkAPI) => {
        try {
            const response = await postService.postProfile(data);
            thunkAPI.dispatch(setMessage("Profile Created"));
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


const initialState = profile ?
    { profileCompleted: true, profileData: profile } :
    { profileCompleted: false, profileData: null };

const postSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: {
        [postProfile.fulfilled]: (state, action) => {
            state.profileCompleted = true;
            state.profileData = action.payload;
        },
        [postProfile.rejected]: (state, action) => {
            state.profileCompleted = profile ? true : false;
            state.profileData = profile ? profile : null;
        },

    }
});

export default postSlice.reducer;