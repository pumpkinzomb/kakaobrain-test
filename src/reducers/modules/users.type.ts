import {
    getUserListDataFailed,
    getUserListDataPending,
    getUserListDataSuccess,
    createNewUserSuccess,
} from '@/reducers/modules/users';

export type UserData = {
    name: string;
    gender: string;
    phoneNumber: string;
    zipCode: string;
};

export type RandomUserData = {
    id: string;
    gender: string;
    phone_number: string;
    username: string;
    address: {
        zip_code: string;
    };
};

export type usersState = {
    loading: boolean;
    error: boolean;
    data: UserData[];
};

export type getUserListParams = {
    pathParams: {
        size: number;
    };
};

export type usersActions = ReturnType<
    | typeof getUserListDataPending
    | typeof getUserListDataSuccess
    | typeof getUserListDataFailed
    | typeof createNewUserSuccess
>;
