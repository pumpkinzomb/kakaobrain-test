import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import { DefaultLayout } from '@/components/layouts';
import Users from '@/components/pages/Users';
import Images from '@/components/pages/Images';
import Canvas from '@/components/pages/Canvas';
import ActionsProvider from '@/components/providers/ActionsProvider';
import DialogProvider from '@/components/providers/DialogProvider';

const RouterApp = () => {
    const element = useRoutes([
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                { index: true, element: <Users /> },
                { path: 'users', element: <Users /> },
                { path: 'images', element: <Images /> },
                { path: 'canvas', element: <Canvas /> },
            ],
        },
        {
            path: '/*',
            element: <Navigate replace to="/users" />,
        },
    ]);
    return element;
};

const AppWrapper = () => {
    return (
        <DialogProvider>
            <ActionsProvider>
                <Router>
                    <RouterApp />
                </Router>
            </ActionsProvider>
        </DialogProvider>
    );
};

export default AppWrapper;
