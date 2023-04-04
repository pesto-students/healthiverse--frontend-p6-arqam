import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/user.service";

export const getAllClients = createAsyncThunk(
    "get/clients",
    async (data, thunkAPI) => {
        try {
            const response = await userService.getClients();
            return response.data;
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

const initialState = {
    isLoading: true,
    gymClients: null,
    trainerClients: null,
    dieticianClients: null,
};

const businessClientsSlice = createSlice({
    name: "get/clients",
    initialState,
    extraReducers: {
        [getAllClients.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAllClients.fulfilled]: (state, action) => {
            state.isLoading = false;
            const allClients = action.payload;
            const gymClients = [];
            const trainerClients = [];
            const dieticianClients = [];
            for (const client of allClients) {
                let gymMembership = client.membership.filter(m => m.businessType === "gym");
                let trainerMembership = client.membership.filter(m => m.businessType === "trainer");
                let dieticianMembership = client.membership.filter(m => m.businessType === "dietician");
                for (const el of gymMembership) {
                    let obj = { ...client, businessId: el.businessId, endDate: el.endDate };
                    if (obj) gymClients.push(obj);
                }
                for (const el of trainerMembership) {
                    let obj = { ...client, businessId: el.businessId, endDate: el.endDate };
                    if (obj) trainerClients.push(obj);
                }
                for (const el of dieticianMembership) {
                    let obj = { ...client, businessId: el.businessId, endDate: el.endDate };
                    if (obj) dieticianClients.push(obj);
                }
            }
            state.gymClients = gymClients;
            state.trainerClients = trainerClients;
            state.dieticianClients = dieticianClients;
        },
        [getAllClients.rejected]: (state, action) => {
            state.isLoading = false;
            state.allClients = null;
        }

    }
});

export default businessClientsSlice.reducer;