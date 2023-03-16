import { createSlice } from "@reduxjs/toolkit";

initialState = { roomId: "" };

const chatRoomSlice = createSlice({
    name: "chatRoom",
    initialState,
    reducers: {
        setRoom: (state,action)=>{
            state.roomId = action.payload
        },
        clearRoom: (state, action)=>{
            state.roomId = action.payload
        }
    }
});

export const {setRoom, clearRoom} = chatRoomSlice.actions;
export default chatRoomSlice.reducer;