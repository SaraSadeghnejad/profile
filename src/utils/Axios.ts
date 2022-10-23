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
export default axios_instance;
