import axios from 'axios';
import {BASE_URL} from './config';

const axios_instance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        "Access-Control-Allow-Origin": "*"
    }
});

axios_instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('accessToken') ?

        localStorage.getItem('accessToken') : null;

    config.headers.Authorization = `Bearer ${token}`;

    return config;
});

export default axios_instance;
