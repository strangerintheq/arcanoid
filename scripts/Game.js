let rnd = i => (i||1)*Math.random();
let arcanoid = new Arcanoid();

function draw() {
    arcanoid.gameLogic();
    arcanoid.player.width > 0 && requestAnimationFrame(draw);
}

function start() {
    arcanoid.restart();
    draw();
}

addEventListener('mousemove', e => {
    let p = arcanoid.player, s = arcanoid.size;
    p && (p.x = e.x/innerWidth*2*s-s-p.width/2)
});

addEventListener('devicemotion',
    e => arcanoid.moveDirection += e.rotationRate.beta/400);

addEventListener('mousedown', () => arcanoid.throwBall());

addEventListener('touchstart', () => arcanoid.throwBall());