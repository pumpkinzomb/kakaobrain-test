import * as React from 'react';
import '@/components/layouts/components/DefaultMain.scss';

type DefaultMainProps = {
    children?: React.ReactNode;
};

const DefaultMain = ({ children }: DefaultMainProps) => {
    return <div className="default-main">{children}</div>;
};

export default DefaultMain;
