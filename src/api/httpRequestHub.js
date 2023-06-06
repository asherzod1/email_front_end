
import axios from "axios";

export const BASE_URL = 'https://emailbackend-production.up.railway.app';

export const HttpRequestHub = (config = null) => {
    let headers = {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=utf-8",
    };

    let axiosInstance = axios.create({
        baseURL: `${BASE_URL}/`,
        headers,
        timeout: 100000,
    });

    axiosInstance.interceptors.response.use(
        response => {
            return response
        },
        function (error) {
            return Promise.reject(error)
        }
    )
    return axiosInstance(config);
};
