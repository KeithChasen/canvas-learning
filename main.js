const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .7;
canvas.height = window.innerHeight;

ctx.clearRect(0, 0, canvas.width, canvas.height);

const coordinate = { x: 0, y: 0 };

document.onmousemove = e => {
    coordinate.x = e.clientX;
    coordinate.y = e.clientY;
};

addEventListener('resize', function () {
    canvas.width = window.innerWidth * .7;
    canvas.height = window.innerHeight;
});

let hero = null;
function init() {
    hero = new Hero(10, 10)
}

function animate() {
    requestAnimationFrame(animate);

    hero.draw(ctx);
}

init();
animate();