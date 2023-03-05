import axios from "axios";
import { decodeToken } from "react-jwt";
const key = "secret";
const API_URL = "https://JWT-Auth-Mern.manikdevbhagat.repl.co/api/users/";

const register = (data) => {
    const { name, email, password } = data;
    return axios
        .post(API_URL + "register", {
            name, email, password
        });
};

const login = (data) => {
    const { email, password } = data;
    return axios
        .post(API_URL + "login", { email, password })
        .then((res) => {

            if (res.data.token) {
                const decoded = decodeToken(res.data.token);
                console.log(decoded);
                const _user = {
                    id: decoded.id,
                    name: decoded.name,
                    email: email,
                    role: decoded.role,
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