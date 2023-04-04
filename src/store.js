import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import subscriberReducer from "./slices/subscriberProfile";
import businessReducer from "./slices/businessProfile";
import chatRoomReducer from "./slices/chatRooms";
import browseBusinessReducer from "./slices/browseBusiness";
import membershipReducer from "./slices/membership";
import businessClientsReducer from "./slices/businessClients";

const persistConfig = {
    key: 'root',
    storage,
}

const reducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    subscriber: subscriberReducer,
    business: businessReducer,
    browseBusiness: browseBusinessReducer,
    membership: membershipReducer,
    chatRoom: chatRoomReducer,
    businessClients: businessClientsReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'auth/logout') {
        state = undefined;
    }
    return reducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [thunk]
});

export const persistor = persistStore(store);