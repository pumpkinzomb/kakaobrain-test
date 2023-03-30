import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import '@/components/commons/Loading.scss';
import { delay } from '@/utils/utilFunction';

type LoadingProps = {
    children?: React.ReactNode;
    className?: string;
};

const Loading = (props: LoadingProps) => {
    const { className } = props;
    const [pots, setPots] = useState('.');

    useEffect(() => {
        loop();
    }, [pots]);

    const loop = useCallback(async () => {
        await delay(400);
        const newPots = pots.length > 3 ? '.' : pots + '.';
        setPots(newPots);
    }, [pots]);

    return (
        <div className={`loading-wrapper ${className ? className : ''}`}>
            <div className="text-wrapper">
                Loading{' '}
                {pots.split('').map((item, index) => {
                    return <span key={index}>{item}</span>;
                })}
            </div>
        </div>
    );
};

export default Loading;
