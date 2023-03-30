import * as React from 'react';
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import '@/components/layouts/components/DefaultLayout.scss';
import Header from '@/components/layouts/components/DefaultHeader';
import Navbar from '@/components/layouts/components/DefaultNavbar';
import Main from '@/components/layouts/components/DefaultMain';

type DefaultLayoutProps = {
    children?: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const [navOpen, setNavOpen] = useState(false);

    useEffect(() => {
        if (navOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.removeProperty('overflow');
        }

        return () => {
            document.body.style.removeProperty('overflow');
        };
    }, [navOpen]);

    const handleToggleMenu = () => {
        setNavOpen(!navOpen);
    };

    const handleCloseMenu = () => {
        setNavOpen(false);
    };

    return (
        <div className="default-layout">
            <Header onToggleMenu={handleToggleMenu} />
            <Main>
                <Navbar open={navOpen} onCloseMenu={handleCloseMenu} />
                <div className={`default-layout-contents ${navOpen ? 'mobile-on' : 'mobile-off'}`}>
                    <Outlet />
                </div>
            </Main>
        </div>
    );
};

export default DefaultLayout;
