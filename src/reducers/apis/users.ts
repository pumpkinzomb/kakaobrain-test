import { UserData, getUserListParams } from '@/reducers/modules/users.type';
import axios, { AxiosResponse } from 'axios';

export const getUserListDataAPI = async (params: getUserListParams): Promise<AxiosResponse> => {
    const { pathParams } = params;
    return axios.get(`https://random-data-api.com/api/v2/users`, {
        params: pathParams,
    });
};
