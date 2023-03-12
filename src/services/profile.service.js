import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://manikdevbhagat-laughing-memory-6rw7xq5gj9h5w5x-5000.preview.app.github.dev"
    + "/api/users/";

const postProfile = (data) => {
    return axios
        .post(API_URL + "subscriber/", { ...data }, { headers: authHeader() })
        .then((res) => {
            return res.data;
        });
};

const postBusinessProfile = (data) => {
    return axios
        .post(API_URL + "business/", { ...data }, { headers: authHeader() })
        .then((res) => {
            return res.data;
        });
};

const getProfile = () => {
    return axios
        .get(API_URL + "subscriber/", { headers: authHeader() })
        .then((res) => {
            return res.data;
        });
};

const getBusinessProfile = () => {
    return axios
        .get(API_URL + "business/", { headers: authHeader() })
        .then((res) => {
            return res.data;
        });
}

const profileService = {
    postProfile,
    postBusinessProfile,
    getProfile,
    getBusinessProfile,
};

export default profileService;
