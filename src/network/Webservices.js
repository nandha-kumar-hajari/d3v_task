import axiosInstance from './axios-config';

import * as constants from '../utils/Constants';


export const callPostApi = (endPoint, data, token) => {
    return axiosInstance.post(endPoint, data, {
        headers: {
            'api-version': constants.API_VERSION,
            'Authorization': 'Bearer ' + token,
        }
    })
}

export const callGetApi = (endPoint, token) => {
    return axiosInstance.get(endPoint, {
        headers: {
            'api-version': constants.API_VERSION,
            'Authorization': 'Bearer ' + token,


        },
    });

};

export const callPutApi = (endPoint, data, token) => {
    return axios.put(endPoint, data, {
        headers: {
            'api-version': constants.API_VERSION,
            'Authorization': 'Bearer ' + token,
        }
    })
}


export const callDelApi = (endPoint, data, token) => {
    return axios.delete(endPoint, {
        headers: {
            'api-version': constants.API_VERSION,
            'Authorization': 'Bearer ' + token
        }
    })
}

