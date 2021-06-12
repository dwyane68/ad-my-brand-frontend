import axios from 'axios';

import { apiBaseURL } from './config';

axios.defaults.baseURL =  apiBaseURL;

axios.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    console.error("Interceptor : Error occured due to : ", error);
    return Promise.reject(error);
  }
);