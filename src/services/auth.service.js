import axios from "axios";
import PORT from "./port";
import authHeader from "./auth-header";

const API_URL = PORT + "/api/users/";

const register = (data) => {
    const { name, email, password } = data;
    console.log(API_URL);
    return axios
        .post(API_URL + "register/", {
            name, email, password
        });
};


const login = (data) => {
    const { email, password } = data;
    return axios
        .post(API_URL + "login/", { email, password })
        .then((res) => {
            if (res.data.token) {
                const _user = {
                    name: res.data.name,
                    email: res.data.email,
                    password: password,
                    token: res.data.token,
                }
                localStorage.setItem("user", JSON.stringify(_user));
            }
            return res.data;
        });
};


const logout = () => {
    localStorage.removeItem("user");
};

const updateAccountDetails = (data) => {
    return axios.put(API_URL + "update", data, { headers: authHeader() })
        .then((res) => {
            if (res.data.token) {
                const _user = {
                    name: res.data.name,
                    email: res.data.email,
                    token: res.data.token,
                }
                localStorage.setItem("user", JSON.stringify(_user));
            }
            return res.data;
        });
}

const authService = { register, login, logout, updateAccountDetails };

export default authService;