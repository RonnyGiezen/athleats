import axios from "axios";
import deviceStorage from "./deviceStorage";
import { useContext } from "react";
import { AuthContext } from "./auth.context";

// axios.defaults.baseURL = "http://10.0.2.2:3080/api";
//axios.defaults.baseURL = "http://127.0.0.1:3080/api"; // Ronny's localhost ip (;
axios.defaults.baseURL = "http://home.joranout.nl:3080/api";

let UNPROTECTED = ["/login", "/authenticate"];
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      if (
        UNPROTECTED.findIndex(
          (value) => value === error.response.config.url
        ) === -1
      ) {
        deviceStorage.deleteJWT("id_token");
        const { refreshToken } = useContext(AuthContext);
        refreshToken(null);
      }
    }
    return error;
  }
);
axios.interceptors.request.use(async (request) => {
  if (UNPROTECTED.findIndex((v) => v === request.url) > -1) {
    return request;
  }
  const token = await deviceStorage.loadJWT();
  if (!token) {
    return request;
  }
  request.headers.Authorization = "Bearer " + token;
  return request;
});

const signup = (username, email, password) => {
  return axios.post("/register", {
    username: username,
    email: email,
    password: password,
  });
};

const login = (email, password) => {
  return axios.post("/authenticate", {
    email: email,
    password: password,
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user") || "");
};

const isLoggedIn = async () => {
  return deviceStorage.hasJWT();
};

const setJWT = (token) => {
  deviceStorage.saveKey(token);
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  setJWT,
};

export default authService;
