import authInterceptor from './auth/Interceptor';

authInterceptor();

export function handleApiErrors<T>(e: any): ApiResponse<T> {
    if (typeof e === "boolean") {
        return {data: undefined, errorStatus: 401, errorMessage: "No access here"}
    }
    if (!e || !e.response || !e.response.status ) {
        return {data: undefined, errorStatus: 500, errorMessage: "Unknown error"}
    }
    if (e.response.data) {
        return {data: undefined, errorStatus: e.response.status, errorMessage: e.response.data}
    }
    return {data: undefined, errorStatus: e.response.status, errorMessage: "Unknown error"}
}

export interface ApiResponse<T> {
    data: undefined | T;
    errorStatus: undefined | number;
    errorMessage: undefined | string;
}