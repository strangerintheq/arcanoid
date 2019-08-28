class Box extends Body {

    constructor(fill, x, y, width, height, tag,
                keys = ['x','width', 'y', 'height']) {
        super(fill, tag || 'rect', keys);
        Object.assign(this, {x, y, width, height});
    }

    hit(amount = 2, min = 0, max = 50) {
        let prevWidth = this.width;
        this.width = Math.min(max, Math.max(min, this.width - amount));
        this.x += Math.sign(amount)*Math.abs(prevWidth - this.width)/2;
        this.update();
    }

    update() {
        this.xw = this.x + this.width;
        this.yh = this.y + this.height;
        super.update();
    }

    collide(box) {
        return this.width > 0 &&
            this.x < box.xw && box.x < this.xw &&
            this.y < box.yh && box.y < this.yh;
    }
}