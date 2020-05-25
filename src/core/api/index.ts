import axios from 'axios';
import config from './../config/apiUrl';
import { onRequest, onRequestError } from './requestInterceptor';
import { onResponse, onResponseError } from './responseInterceptor';

export const API = axios.create({
    baseURL: config.API_BASE,
    timeout: 30000,
});

API.interceptors.request.use(onRequest, onRequestError);
API.interceptors.response.use(onResponse, onResponseError);
