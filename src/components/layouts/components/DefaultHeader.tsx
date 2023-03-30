import * as React from 'react';
import '@/components/layouts/components/DefaultHeader.scss';

type DefaultHeaderProps = {
    children?: React.ReactNode;
    onToggleMenu: () => void;
};

const DefaultHeader = (props: DefaultHeaderProps) => {
    const { onToggleMenu } = props;

    const handleToggleMenu = () => {
        onToggleMenu();
    };

    return (
        <div className="default-header">
            <button className="mobile-menu-btn" onClick={handleToggleMenu}>
                menu icon
            </button>
            <h1>Kakao Brain 사전과제</h1>
        </div>
    );
};

export default DefaultHeader;
