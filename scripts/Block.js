class Block extends Box {

    constructor(i, s) {
        super("hsl(" + 360/(13*13)*i + ",75%,75%)",
            i%13*15 - s + 3,
            11 + 6*Math.floor(i/13) - s,
            14,  5);
    }

    hit(power) {
        power = 2 + Math.floor(rnd(power));
        super.hit(power);
        score.innerHTML = +score.innerHTML + (this.width<1?power+5:power);
        return this.width === 0;
    }
}