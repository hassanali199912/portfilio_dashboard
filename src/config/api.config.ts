

import axios from "axios"


axios.interceptors.request.use(function (config) {
    config.baseURL = "https://protfilio-backend.vercel.app/api"
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