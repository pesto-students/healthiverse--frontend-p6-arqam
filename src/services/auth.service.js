import axios from "axios";
// import { decodeToken } from "react-jwt";
// const key = "secret";
const API_URL = "https://manikdevbhagat-laughing-memory-6rw7xq5gj9h5w5x-5000.preview.app.github.dev"
    + "/api/users/";

const register = (data) => {
    const { name, email, password, role } = data;
    console.log(API_URL);
    return axios
        .post(API_URL + "register/", {
            name, email, password, role
        });
};


const login = (data) => {
    const { email, password } = data;
    return axios
        .post(API_URL + "login/", { email, password })
        .then((res) => {
            if (res.data.token) {
                const _user = {
                    _id: res.data._id,
                    name: res.data.name,
                    email: res.data.email,
                    role: res.data.role,
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

const authService = { register, login, logout };

export default authService;