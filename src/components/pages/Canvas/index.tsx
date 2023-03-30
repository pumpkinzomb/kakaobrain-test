import * as React from 'react';
import { useRef, useEffect, useCallback } from 'react';
import '@/components/pages/Canvas/Canvas.scss';
import Circle from '@/components/pages/Canvas/Circle';

type CanvasContainerProps = {
    children?: React.ReactNode;
};

const colors = ['red', 'green', 'blue'];

const CanvasContainer = (props: CanvasContainerProps) => {
    const canvas = useRef<HTMLCanvasElement>(null);

    let ctx: any;
    let width = 0;
    let height = 0;
    let isDrag: Circle | null = null;
    const circles: Circle[] = [];

    useEffect(() => {
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    useEffect(() => {
        if (!ctx && canvas.current) {
            ctx = canvas.current.getContext('2d');
            init();
        }
    }, [canvas]);

    const init = () => {
        resize();
    };

    const resize = useCallback(() => {
        if (!canvas.current) {
            return;
        }
        width = canvas.current.width = window.innerWidth >= 768 ? window.innerWidth - 150 - 44 : window.innerWidth - 24;
        height = canvas.current.height = window.innerHeight - 75 - 32;
        render();
    }, [canvas]);

    const render = () => {
        if (ctx) {
            ctx.clearRect(0, 0, width, height);
            if (circles.length === 0) {
                for (let i = 0; i < 3; i++) {
                    circles.push(new Circle(width, height, 100, ctx, colors[i]));
                }
            }

            circles.forEach((circle) => {
                circle.update();
            });
        }
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDrag) {
            const zeroPositionX = canvas.current?.offsetLeft || 0;
            const zeroPositionY = canvas.current?.offsetTop || 0;
            const coordinateX = event.clientX - zeroPositionX;
            const coordinateY = event.clientY - zeroPositionY;
            isDrag.x = coordinateX;
            isDrag.y = coordinateY;
            render();
        }
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        const zeroPositionX = canvas.current?.offsetLeft || 0;
        const zeroPositionY = canvas.current?.offsetTop || 0;
        const coordinateX = event.clientX - zeroPositionX;
        const coordinateY = event.clientY - zeroPositionY;
        let selected: Circle[] = [];
        circles.forEach((item) => {
            const rangeLeft = item.x - item.size;
            const rangeRight = item.x + item.size;
            const rangeTop = item.y - item.size;
            const rangeBottom = item.y + item.size;
            if (
                coordinateX >= rangeLeft &&
                coordinateX <= rangeRight &&
                coordinateY >= rangeTop &&
                coordinateY <= rangeBottom
            ) {
                selected.push(item);
            }
        });
        if (selected.length > 1) {
            const distance = Array(selected.length).fill(0);
            selected.forEach((item, index) => {
                distance[index] += Math.abs(item.x - coordinateX);
                distance[index] += Math.abs(item.y - coordinateY);
            });
            const near = Math.min(...distance);
            const closeCircle = distance.findIndex((item) => item === near);
            selected = selected.filter((item, index) => {
                return index === closeCircle;
            });
        }
        if (selected.length > 0) {
            selected[0].selected = true;
            isDrag = selected[0];
        }
        render();
    };

    const handleMouseUp = (event: React.MouseEvent) => {
        circles.forEach((item) => {
            item.selected = false;
        });
        isDrag = null;
        render();
    };

    return (
        <div className="canvas-page">
            <h1>Canvas Page</h1>
            <div className="canvas-wrapper">
                <canvas
                    id="my-canvas"
                    ref={canvas}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                ></canvas>
            </div>
        </div>
    );
};

export default CanvasContainer;
