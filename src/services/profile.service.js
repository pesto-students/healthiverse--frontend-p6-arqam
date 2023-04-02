import axios from "axios";
import authHeader from "./auth-header";
import PORT from "./port";

const API_URL = PORT + "/api/users/";

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
            console.log(res.data);
            return res.data;
        });
}

const editBusinessProfile = (data) => {
    return axios
        .post(API_URL + "business/edit", { ...data }, { headers: authHeader() })
        .then((res) => {
            console.log(res.data);
            return res.data;
        });
}

const profileService = {
    postProfile,
    postBusinessProfile,
    getProfile,
    getBusinessProfile,
    editBusinessProfile
};

export default profileService;
