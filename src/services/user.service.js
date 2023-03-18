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


const userService = {
    getAdminBoard,
    getAllBusiness,
    getMemberships,
    getClients
};

export default userService;
