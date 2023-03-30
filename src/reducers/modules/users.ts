import { usersState, usersActions, UserData, RandomUserData } from './users.type';
import { createReducer, createAction, Dispatch } from '@reduxjs/toolkit';
import { getUserListDataAPI } from '@/reducers/apis/users';
import { CreateUserType } from '@/components/pages/Users/components/CreateUserDialog';

export const getUserListDataPending = createAction('users/GET_USER_DATA_PENDING');
export const getUserListDataSuccess = createAction<UserData[]>('users/GET_USER_DATA_SUCCESS');
export const getUserListDataFailed = createAction('users/GET_USER_DATA_FAILED');
export const createNewUserSuccess = createAction<CreateUserType>('users/CREATE_USER_DATA_SUCCESS');

const initialState: usersState = {
    loading: false,
    error: false,
    data: [],
};

const users = createReducer(initialState, (builder) => {
    builder.addCase(getUserListDataPending, (state) => ({
        ...state,
        loading: true,
        error: false,
    }));
    builder.addCase(getUserListDataSuccess, (state, action) => {
        const newData = state.data.concat(action.payload);
        return {
            ...state,
            loading: false,
            error: false,
            data: newData,
        };
    });
    builder.addCase(getUserListDataFailed, (state) => ({
        ...state,
        loading: false,
        error: true,
    }));
    builder.addCase(createNewUserSuccess, (state, action) => {
        const newData = state.data.concat();
        const user = action.payload;
        newData.unshift(user);
        return {
            ...state,
            data: newData,
            loading: false,
            error: true,
        };
    });
});

export default users;

export const createNewUser = (data: CreateUserType) => (dispatch: Dispatch<usersActions>) => {
    dispatch(createNewUserSuccess(data));
};

export const getUserListData = (size?: number) => (dispatch: Dispatch<usersActions>) => {
    dispatch(getUserListDataPending());
    return new Promise(async (resolve, reject) => {
        try {
            const response = await getUserListDataAPI({
                pathParams: {
                    size: size || 20,
                },
            });
            const { data }: { data: RandomUserData[] } = response;
            const userData = data.map((item) => {
                return {
                    name: item.username,
                    zipCode: item.address.zip_code,
                    gender: item.gender,
                    phoneNumber: item.phone_number,
                };
            });
            resolve(response?.data);
            dispatch(getUserListDataSuccess(userData));
        } catch (error) {
            dispatch(getUserListDataFailed());
            reject(error);
        }
    });
};
