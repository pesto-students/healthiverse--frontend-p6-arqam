import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import subscriberReducer from "./slices/subscriber";
import businessReducer from "./slices/business";

const reducer = {
    auth: authReducer,
    message: messageReducer,
    subscriber: subscriberReducer,
    business: businessReducer,
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;