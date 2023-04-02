import axios from "axios";
import authHeader from "./auth-header";
import PORT from "./port";

const API_URL = PORT + "/api/users/";

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAllBusiness = () => {
    return axios.get(API_URL + "getbusiness", { headers: authHeader() });
};

const getMemberships = () => {
    return axios.get(API_URL + "subscriber/allmemberships", { headers: authHeader() });
}

const getClients = () => {
    return axios.get(API_URL + "business/clients", { headers: authHeader() });
};

const buyMembership = (data) => {
    console.log(data);
    return axios.post(API_URL + "subscriber/buy", { ...data }, { headers: authHeader() });
}

const getSubscriberChats = () => {
    return axios.get(API_URL + "subscriber/chats", { headers: authHeader() });
}

const getBusinessChats = () => {
    return axios.get(API_URL + "business/chats", { headers: authHeader() });
}



const userService = {
    getAdminBoard,
    getAllBusiness,
    getMemberships,
    getClients,
    buyMembership,
    getSubscriberChats,
    getBusinessChats
};

export default userService;
