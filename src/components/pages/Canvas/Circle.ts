import { random } from '@/utils/utilFunction';

export default class Circle {
    x: number;
    y: number;
    size: number;
    width: number;
    height: number;
    ctx: any;
    color: string;
    selected: boolean;

    constructor(width: number, height: number, size: number, ctx: any, color: string) {
        this.x = 0;
        this.y = 0;
        this.size = size;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.color = color;
        this.selected = false;
        this.spawn();
    }

    spawn() {
        this.x = random(this.size, this.width - this.size);
        this.y = random(this.size, this.height - this.size);
    }

    update(x?: number, y?: number) {
        if (x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }
        this.render();
    }

    render() {
        this.ctx.save();
        const { x, y, size, color } = this;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2, false);
        this.ctx.fillStyle = color;
        if (this.selected) {
            this.ctx.globalAlpha = 0.5;
        } else {
            this.ctx.globalAlpha = 1;
        }
        this.ctx.fill();
        this.ctx.restore();
    }
}
