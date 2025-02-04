import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify({...params})
});
 
axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
    throw message;
});

export default axiosClient;