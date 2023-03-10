import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import authService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async ({ name, email, password, role }, thunkAPI) => {
        try {
            const response = await authService.register({ name, email, password, role });
            thunkAPI.dispatch(setMessage("Registration Successful"));
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            console.log("Registration error");
            console.log(error);
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);


export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await authService.login({ email, password });
            thunkAPI.dispatch(setMessage("Login Successful"));
            return response.token;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        await authService.logout();
    }
);

const initialState = user ?
    { isLoggedIn: true, user } :
    { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
});

export default authSlice.reducer;