import axios from "axios";


let UNPROTECTED = ["/","/login","signup"];
// axios.defaults.baseURL = "http://localhost:3080/api"
axios.defaults.baseURL = "http://home.joranout.nl:3080/api"
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        if (UNPROTECTED.findIndex((value) => value === error.response.config.url) === -1){
            window.location.href = '/login';
        }
    }
    return error;
});


const signup = (username: String, email: String, password: String) => {
    return axios
        .post("/register", {
            username,
            email,
            password,
        })
        .then((response) => {
            return response.data;
        });
};

const login = (email: String, password: String) => {
    return axios
        .post("/authenticate", {
            email: email,
            password: password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user")||"");
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default authService;
