class Bonus extends Ball {

    constructor(block) {
        super(3, block.x, block.y + block.height, 'text', ['x','y']);
        let types = ['🍇','🍄','🍌','🍎','🍒','🍓','🥕','🍉','🍬','🍺'];
        this.type = Math.floor(rnd(3));
        this.content = types[this.type];
        this.speed = 0.5 + rnd();
    }

    earn(player) {
        if (this.type === 0) { // 🍇
            player.hit(-4)
        }
        if (this.type === 1) { // 🍄
            player.hit(4)
        }
        if (this.type === 2) { // 🍌
            arcanoid.spawnBall();
        }

    }
}