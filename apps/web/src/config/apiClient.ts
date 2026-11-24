import axios from "axios";

const options = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
};

const API = axios.create(options);

API.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            return Promise.reject({ status, ...data });
        }

        // no response at all: server offline, network down, or blocked
        return Promise.reject({
            status: 0,
            message: "Can't reach the server. Please try again in a moment.",
        });

    }
);

export default API;