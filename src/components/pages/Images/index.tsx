import * as React from 'react';
import { useEffect, useState } from 'react';
import '@/components/pages/Images/Images.scss';
import Loading from '@/components/commons/Loading';
import { delay } from '@/utils/utilFunction';

type ImagesContainerProps = {
    children?: React.ReactNode;
};

type ImageDataType = {
    id: number;
    url: string;
    alt: string;
};

const imageUrl = `https://picsum.photos/seed/picsum/200`;

const ImagesContainer = (props: ImagesContainerProps) => {
    const [loading, setLoading] = useState(false);
    const [imageList, setImageList] = useState<ImageDataType[]>([]);

    const handleScrollBottomReached = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            handleGetImage();
        }
    };

    useEffect(() => {
        handleGetImage();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollBottomReached);
        return () => window.removeEventListener('scroll', handleScrollBottomReached);
    }, [handleScrollBottomReached]);

    const handleGetImage = async () => {
        setLoading(true);
        await delay(300);
        const size = 25;
        let newImages = Array(size).fill(imageUrl);
        newImages = newImages.map((item, index) => {
            const random = Math.floor(Math.random() * (4 - 1 + 1) + 1);
            return {
                id: index,
                url: `${item}/${random}00`,
                alt: `random image: number ${index}`,
            };
        });
        setImageList(imageList.concat(newImages));
    };

    const classificationArray = imageList.reduce(
        (acc, cur, index) => {
            acc[index % 3].push(cur);
            return acc;
        },
        Array.from({ length: 3 }, (value): ImageDataType[] => []),
    );

    return (
        <div className="images-page">
            <h1>Image List Page</h1>
            {loading && <Loading />}
            <div className="images-wrapper" style={{ gap: '1px' }}>
                {classificationArray.map((item: ImageDataType[], index) => {
                    return (
                        <div className="image-row" key={`imgRow-${index}`} style={{ gap: '1px' }}>
                            {item.map((imageItem: ImageDataType, imageItemIndex) => {
                                return (
                                    <img
                                        key={`imgRow-${index}-${imageItemIndex}`}
                                        src={imageItem.url}
                                        alt={imageItem.alt}
                                        onLoad={() => setLoading(false)}
                                    />
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ImagesContainer;
