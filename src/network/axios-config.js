import axios from 'axios';
import * as constants from '../utils/Constants';

const axiosInstance = axios.create({
    baseURL: constants.API_BASE_URL
})

// axiosInstance.interceptors.request.use(config => {
//     return config
// }, error => {
//     return Promise.reject(error)
// })

// axiosInstance.interceptors.response.use(response => {
//     return response;
// }, error => {
//     return Promise.reject(error)
// })

export default axiosInstance;