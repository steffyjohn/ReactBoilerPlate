import { AxiosRequestConfig } from 'axios';

export const onRequest = (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Token ${token}` } : {};
    const request: AxiosRequestConfig = {
        method: 'GET',
        ...config,
        headers: {
            'Content-type': 'application/json',
            ...config.headers,
            ...headers,
        },
    };
    return request;
};

export const onRequestError = (error) => Promise.reject(error);
