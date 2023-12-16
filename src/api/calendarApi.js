import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
});

// Interceptors Requests
calendarApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        // if token, config header
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});

export default calendarApi;
