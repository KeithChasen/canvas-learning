const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .7;
canvas.height = window.innerHeight;

addEventListener('resize', function () {
    canvas.width = window.innerWidth * .7;
    canvas.height = window.innerHeight;
});

let hero = null;
let enemy = null;

function init() {
    hero = new Hero(10, 10);
    enemy = new Enemy(100, 100);
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