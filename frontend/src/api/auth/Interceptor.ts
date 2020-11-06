import axios from 'axios';
import { TokenStorage } from "./TokenStorage";

export default () => {  
  axios.interceptors.request.use(
    config => {
        const token = TokenStorage.getTokens();
        if (token && token.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + token.accessToken;
        }
        return config;
    },
    error => {
        Promise.reject(error)
  });
}
