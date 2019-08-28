class Ball extends Box {

    constructor(r = 2, cx = 0, cy = 0,
                tag = 'circle',
                keys = ['cx', 'cy', 'r']) {
        super('red', cx - r, cy - r, r*2, r*2, tag, keys);
        Object.assign(this, {cx, cy, r, anchorPoint:0, speed: 0});
    }

    spawn(dir, speed = 1.3) {
        Object.assign(this, {speed,
            dirx: Math.cos(dir),
            diry: Math.sin(dir)});
    }

    reflect(nx, ny) {
        let dot2 = this.dirx * nx * 2 + this.diry * ny * 2;
        this.dirx -= dot2*nx;
        this.diry -= dot2*ny;
        this.move()
    }

    move(playerCenter) {
        if (this.speed) {
            this.cx += this.dirx * this.speed;
            this.cy += this.diry * this.speed;
            this.x = this.cx - this.r;
            this.y = this.cy - this.r;
        } else {
            this.cx = playerCenter + this.anchorPoint;
        }
    }
}