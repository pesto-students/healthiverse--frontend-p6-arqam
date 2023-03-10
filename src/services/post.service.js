import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://manikdevbhagat-laughing-memory-6rw7xq5gj9h5w5x-5000.preview.app.github.dev"
    + "/api/users/";

const postProfile = (data) => {
    return axios
        .post(API_URL + "subscriber/", { ...data }, { headers: authHeader() })
        .then((res) => {
            localStorage.setItem("profile", JSON.stringify(data));
            return res.data;
        });
};

const postService = {
    postProfile,

};

export default postService;
