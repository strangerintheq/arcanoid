class Bonus extends Ball {

    constructor(block) {
        super(3, block.x, block.y + block.height, 'text', ['x', 'y']);
        this.type = Math.floor(rnd(types.length));
        this.content = types[this.type];
        this.speed = 0.5 + rnd();
    }

    earn(player) {
        if (this.type === 0)  // 🍇
            player.hit(-4);
        if (this.type === 1)  // 🍄
            player.hit(4);
        if (this.type === 2)  // 🍌
            arcanoid.spawnBall();
        if (this.type === 3)  // 🍎
            arcanoid.balls.forEach(b => b.resizeBall(b.r+1));
        if (this.type === 4)  // 🍒
            arcanoid.balls.forEach(b => b.resizeBall(b.r-1));
        if (this.type === 5)  // 🍓
            player.sticky += 30;
        if (this.type === 6)  // 🥕
            player.shooting += 30;
        //if (this.type === 7)  // 🍉
            //arcanoid.
        if (this.type === 8)  // 🍬
            player.flying += 30;
        if (this.type === 9)  // 🍺
            player.drunk += 30;
    }

    bonusLogic(player, size){
        this.move();
        this.update();
        let remove = this.collide(player);
        remove && this.earn(player);
        remove |= this.cy > size;
        remove && this.remove();
        return !remove;
    }
}