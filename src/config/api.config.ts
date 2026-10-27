

import axios from "axios"

export const API_BASE_URL = "http://localhost:5001/api"

axios.interceptors.request.use(function (config) {
    config.baseURL = API_BASE_URL
    return config;
}, function (error) {
    return Promise.reject(error);
});


axios.interceptors.response.use(function onFulfilled(response) {
    return response;
}, function onRejected(error) {
    return Promise.reject(error);
});


export default axios