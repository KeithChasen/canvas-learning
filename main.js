const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight * .7;

const canvasInfo = document.getElementById('canvasInfo');
const ctxInfo = canvasInfo.getContext('2d');

canvasInfo.width = window.innerWidth;
canvasInfo.height = window.innerHeight * .3;

addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * .7;

    canvasInfo.width = window.innerWidth;
    canvasInfo.height = window.innerHeight * .3;
});

let hero = null;
let enemy = null;
let controls = null;

function init() {
    controls = new Controls();
    hero = new Hero(10, 10, controls);
    enemy = new Enemy(100, 100, controls);
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hero.draw(ctx);
    enemy.draw(ctx);

    hero.update();
}

init();
animate();