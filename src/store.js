import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import subscriberReducer from "./slices/subscriber";
import businessReducer from "./slices/business";
import businessAndMembershipReducer from "./slices/businessMembership";
import chatRoomReducer from "./slices/chatRooms";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    subscriber: subscriberReducer,
    business: businessReducer,
    businessAndMembership: businessAndMembershipReducer,
    chatRoom: chatRoomReducer
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;