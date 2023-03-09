import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://manikdevbhagat-laughing-memory-6rw7xq5gj9h5w5x-5000.preview.app.github.dev"
    + "/api/users/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getSubscriberBoard = () => {
    return axios.get(API_URL + "subscriber", { headers: authHeader() });
};

const getBusinessBoard = () => {
    return axios.get(API_URL + "business", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getGyms = () => {
    return axios.get(API_URL + "subscriber/browse", { headers: authHeader() });
};

const getClients = () => {
    return axios.get(API_URL + "business/clients", { headers: authHeader() });
};


const userService = {
    getPublicContent,
    getSubscriberBoard,
    getBusinessBoard,
    getAdminBoard,
    getGyms,
    getClients
};

export default userService;
