import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@/components/layouts/components/DefaultNavbar.scss';

type DefaultNavbarProps = {
    children?: React.ReactNode;
    open: boolean;
    onCloseMenu: () => void;
};

const DefaultNavbar = (props: DefaultNavbarProps) => {
    const { open, onCloseMenu } = props;
    const location = useLocation();
    const navList = [
        {
            path: '/users',
            text: '사용자 목록',
        },
        {
            path: '/images',
            text: '이미지 목록',
        },
        {
            path: '/canvas',
            text: '캔버스',
        },
    ];

    const handleCloseMenu = () => {
        onCloseMenu();
    };

    return (
        <React.Fragment>
            {open && <div className="mobile-menu-bg" onClick={handleCloseMenu} />}

            <div className={`default-navbar ${open ? 'mobile-on' : 'mobile-off'}`}>
                <ul className={`default-navbar-menu `}>
                    {navList.map((item, index) => {
                        let isActive = location.pathname === item.path ? true : false;
                        if (location.pathname === '/' && item.path === '/users') {
                            isActive = true;
                        }
                        return (
                            <li className={`${isActive ? 'on' : ''}`} key={index}>
                                <Link to={item.path}>{item.text}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </React.Fragment>
    );
};

export default DefaultNavbar;
