import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/reducers';
import '@/components/pages/Users/Users.scss';
import Table from '@/components/commons/Table';
import Loading from '@/components/commons/Loading';
import { useActions } from '@/components/providers/ActionsProvider';
import { useDialog } from '@/components/providers/DialogProvider';
import CreateUserDialog from '@/components/pages/Users/components/CreateUserDialog';
import { CreateUserType } from '@/components/pages/Users/components/CreateUserDialog';
import { delay } from '@/utils/utilFunction';

type UsersContainerProps = {
    children?: React.ReactNode;
};

let throttling = false;

const tableLabels = [
    { key: 'name', value: '성명' },
    { key: 'gender', value: '성별' },
    { key: 'phoneNumber', value: '전화번호' },
    { key: 'zipCode', value: '우편번호' },
];

const UsersContainer = (props: UsersContainerProps) => {
    const { users } = useSelector((state: RootState) => state);
    const { UsersActions } = useActions();
    const [openDialog, closeDialog] = useDialog();

    useEffect(() => {
        if (users.data.length === 0) {
            handleGetUserList(50);
        }
    }, [users]);

    const handleGetUserList = useCallback(
        async (size?: number) => {
            if (!throttling) {
                UsersActions.getUserListData(size);
                throttling = true;
            }
            await delay(500);
            throttling = false;
        },
        [UsersActions],
    );

    const handleCreateUser = (data: CreateUserType) => {
        UsersActions.createNewUser(data);
    };

    const handleAddUser = () => {
        openDialog({
            children: <CreateUserDialog onSubmit={handleCreateUser} onClose={closeDialog} />,
        });
    };

    return (
        <div className="users-page">
            {users.loading && <Loading />}
            <h1>User List Page</h1>
            <button className="add-user-btn" type={'button'} onClick={handleAddUser}>
                사용자 추가
            </button>
            <Table
                labels={tableLabels}
                noDataText={'현재 등록된 유저 정보가 없습니다.'}
                tableData={users.data}
                onScrollEvent={handleGetUserList}
            />
        </div>
    );
};

export default UsersContainer;
