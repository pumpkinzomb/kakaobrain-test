import { bindActionCreators } from '@reduxjs/toolkit';
import { createContext, ReactNode, useContext } from 'react';
import { useDispatch } from 'react-redux';
import * as usersActions from '@/reducers/modules/users';

interface Props {
    children: ReactNode;
}

const ActionsContext = createContext<{
    UsersActions: typeof usersActions;
}>({
    UsersActions: usersActions,
});

export const useActions = () => useContext(ActionsContext);

const ActionsContextProvider = ({ children }: Props) => {
    const dispatch = useDispatch();

    const UsersActions = bindActionCreators(usersActions, dispatch);

    return (
        <ActionsContext.Provider
            value={{
                UsersActions,
            }}
        >
            {children}
        </ActionsContext.Provider>
    );
};

export default ActionsContextProvider;
