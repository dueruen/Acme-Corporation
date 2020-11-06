import { AxiosRequestConfig } from "axios";
import { AuthResponse } from "./models";
import jwt from 'jsonwebtoken';
import moment from 'moment';

export class TokenStorage {

    private static readonly LOCAL_STORAGE_TOKEN = 'token';

    public static async isAuthenticated(): Promise<boolean> {
        const tokens = this.getTokens();
        if (!tokens) {
            this.clear();
            return false;
        }

        const {accessToken} = tokens;
        if (accessToken && jwt.decode(accessToken)) {
            const decodedToken: any = jwt.decode(accessToken, {complete: true}); 
            const expiry = decodedToken.payload.exp;
            const now = moment().utc().toDate();
            if (now.getTime() < expiry * 1000) {
                return true;
            }
        }
        this.clear();
        return false;
    }
    
    public static getAuthentication(): AxiosRequestConfig {
        return {
            headers: { 'Authorization': 'Bearer ' + this.getToken() }
        };
    }

    public static storeTokens(tokens: AuthResponse) {
        this.storeToken(tokens.accessToken);
    }

    public static getTokens(): AuthResponse | null {
        const aToken = this.getToken();

        if (!aToken) {
            return null;
        }

        return { accessToken: this.getToken() as string};
    }

    private static storeToken(token: string) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
      }

    public static clear() {
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    }

    private static getToken(): string | null {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    }
}