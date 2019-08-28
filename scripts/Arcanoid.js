class Arcanoid {

    constructor() {
        this.size = 100;
        this.moveDirection = 0;
    }

    gameLogic() {
        let p = this.player, s = 100;
        p.x = Math.max(-s, Math.min(p.x + this.moveDirection, s - p.width));
        p.update();

        this.balls.forEach(ball => {

            ball.move(p.x + p.width/2);
            ball.update();

            if (Math.abs(ball.cx) > s - ball.r)
                return ball.reflect(1, 0);

            if (ball.cy < ball.r - s)
                return ball.reflect(0, 1);

            let block = this.blocks.find(b => b.collide(ball));
            if (block) {
                block.hit(112) && this.spawnBonus(block);
                return ball.reflect(0, 1);
            }

            if (ball.speed && p.collide(ball)) {
                let angle = (p.x-ball.cx+p.width/2)/p.width/2;
                let nx = Math.cos(angle);
                let ny = Math.sin(angle);
                ball.reflect(ny, nx);
                ball.move(p.x + p.width/2);
            }

            if (ball.cy > s)
                return this.loss(ball);
        });

        this.bonuses = this.bonuses.filter(bonus => {
            bonus.move();
            bonus.update();
            let keep =
            if (bonus.collide(p)) {
                bonus.remove();
                bonus.earn(p);
            } else return true;
        });
    }

    spawnBonus(block) {
        let bonus = new Bonus(block);
        bonus.spawn(Math.PI/2);
        ballsGroup.innerHTML += bonus.render();
        this.bonuses.push(bonus);
    }

    restart() {
        this.bonuses=[];
        menuGroup.style.display ="none";
        score.innerHTML = 0;
        this.player = new Player();
        this.balls = [new Ball(2,0,88)];
        this.blocks = Array(13*13).fill(0).map((e, i) => new Block(i, this.size));
        blocksGroup.innerHTML = this.blocks.map(b => b.render()).join("") +  this.player.render();
        ballsGroup.innerHTML = this.balls[0].render();
        this.blocks.forEach(b => b.update());
    }

    spawnBall(){
        let newBall = new Ball(2,0,88);
        this.balls.push(newBall);
        ballsGroup.innerHTML += newBall.render();
    }

    loss(ball) {
        ball.remove();
        this.balls = this.balls.filter(i => i !== ball);
        if (!this.balls.length) {
            this.player.hit(8);
            this.player.width === 0 && this.gameOver();
            score.innerHTML--;
            this.spawnBall();
        }
    }

    gameOver() {
        menuGroup.style.display = "";
    }

    throwBall() {
        if(this.player) {
            let staticBall = this.balls.find(ball => ball.speed === 0);
            staticBall && staticBall.spawn(-Math.PI/4 - rnd(Math.PI/2));
        }
    }
}