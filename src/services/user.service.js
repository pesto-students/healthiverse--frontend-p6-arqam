import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://manikdevbhagat-laughing-memory-6rw7xq5gj9h5w5x-5000.preview.app.github.dev"
    + "/api/users/";

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getMemberships = () => {
    return axios.get(API_URL + "subscriber/allmemberships", { headers: authHeader() });
}

const getClients = () => {
    return axios.get(API_URL + "business/clients", { headers: authHeader() });
};


const userService = {
    getAdminBoard,
    getMemberships,
    getClients
};

export default userService;
