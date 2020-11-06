import axios from 'axios'
import { ApiResponse, handleApiErrors } from '..';
import { SubmissionData, SubmitContestParams } from './models';

const baseUrl = () => {
    return `${process.env.REACT_APP_API}`;
} 

export async function adminGetAllSubmissions(): Promise<ApiResponse<SubmissionData[]>> {
    return axios.get<SubmissionData[]>(
        `${baseUrl()}/admin/list`
    ).then(res => {return {data: res.data, errorStatus: undefined, errorMessage: undefined}})
    .catch((e) => handleApiErrors<SubmissionData[]>(e));
}

export async function submit(params: SubmitContestParams): Promise<ApiResponse<any>> {
    return axios.post<any>(
        `${baseUrl()}/contest`,
        { ...params.body }
    ).then(res => {return {data: res.data, errorStatus: undefined, errorMessage: undefined}})
    .catch((e) => {return handleApiErrors<any>(e)});
}