import { createSlice } from "@reduxjs/toolkit";

const initialState = { user1: "", user2: "" };

const chatRoomSlice = createSlice({
    name: "chatRoom",
    initialState,
    reducers: {
        setRoom: (state, action) => {
            state.user1 = action.payload.user1;
            state.user2 = action.payload.user2;    
        },
        clearRoom: (state, action) => {
            state.user1 = "";
            state.user2 = "";    

        }
    }
});

export const { setRoom, clearRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;