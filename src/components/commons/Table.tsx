import * as React from 'react';
import { createRef, useEffect, useState, useCallback } from 'react';
import '@/components/commons/Table.scss';

type TableProps = {
    children?: React.ReactNode;
    labels: {
        key: string;
        value: React.ReactNode;
    }[];
    tableData: any[];
    noDataText: React.ReactNode;
    className?: string;
    onScrollEvent: () => void;
};

const Table = (props: TableProps) => {
    const { labels, tableData, noDataText, className, onScrollEvent } = props;
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const tableBodyRef = createRef<HTMLTableSectionElement>();
    const tableWrapperRef = createRef<HTMLDivElement>();

    const handleResize = useCallback(() => {
        if (tableWrapperRef && tableWrapperRef.current) {
            const getWidth = tableWrapperRef.current.offsetWidth;
            const getHeight = window.innerHeight - 75 - 66 - 42 - 42;
            setWidth(getWidth);
            setHeight(getHeight);
        }
    }, [tableWrapperRef]);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [handleResize]);

    useEffect(() => {
        if (width === 0) {
            handleResize();
        }
    }, [tableWrapperRef]);

    const handleScrollBottomReached = (event: React.UIEvent<HTMLElement>) => {
        const scrollTop = tableBodyRef?.current?.scrollTop || 0;
        const innerHeight = tableBodyRef?.current?.offsetHeight || 0;
        const scrollHeight = tableBodyRef?.current?.scrollHeight || 0;
        if (scrollTop >= scrollHeight - innerHeight) {
            onScrollEvent();
        }
    };

    // isWindows는 window os browser의 스크롤바 너비 16px를 theader에서 계산해주기 위해 사용합니다.
    const isWindows = navigator.userAgent.toLowerCase().includes('windows') ? true : false;
    return (
        <div className={`table-wrapper ${className ? className : ''}`} ref={tableWrapperRef}>
            <table>
                <thead>
                    <tr>
                        {labels.map((item, index) => {
                            let _width = width !== 0 ? width / labels.length : '25%';
                            if (isWindows) {
                                _width = width !== 0 ? (width - 16) / labels.length : '25%';
                                if (index === labels.length - 1) {
                                    _width = width !== 0 ? width / labels.length + 16 : '25%';
                                }
                            }

                            return (
                                <td key={index} style={{ width: _width }}>
                                    {item.value}
                                </td>
                            );
                        })}
                    </tr>
                </thead>
                <tbody
                    ref={tableBodyRef}
                    onScroll={handleScrollBottomReached}
                    style={{
                        height: height,
                    }}
                >
                    {tableData.length > 0 &&
                        tableData.map((item, index) => {
                            let _width = width !== 0 ? width / labels.length : '25%';
                            if (isWindows) {
                                _width = width !== 0 ? (width - 16) / labels.length : '25%';
                            }
                            return (
                                <tr key={index}>
                                    {labels.map((labelItem, labelIndex) => {
                                        return (
                                            <td key={labelIndex} style={{ width: _width }}>
                                                {item[`${labelItem.key}`]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    {tableData.length === 0 && (
                        <tr className={'no-data'}>
                            <td
                                colSpan={labels.length}
                                className={'no-data'}
                                style={{ width: width !== 0 ? width : '100%' }}
                            >
                                {noDataText}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
