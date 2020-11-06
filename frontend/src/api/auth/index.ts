import axios from 'axios'
import { AuthResponse } from './models';
import { TokenStorage } from './TokenStorage';

export const baseUrl = () => {
    return `${process.env.REACT_APP_API}/token`;
} 

export const isAuth = async (): Promise<boolean> => {
    return await TokenStorage.isAuthenticated();
}

export const logout = ()=> {
    TokenStorage.clear();
}

export async function login(email: string, password: string): Promise<boolean> {
    return axios.post<AuthResponse>(
        `${baseUrl()}`,
        { email: email, password: password}
    ).then(res => {
        TokenStorage.storeTokens(res.data); 
        return true;
    }).catch(err => {
        return Promise.reject(false);
    });
}