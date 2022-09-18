const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = 'green';
ctx.fillRect(40, 50, 100, 100);
ctx.save();
ctx.translate(150, 150);

const coordinate = { x: 0, y: 0 };

document.onmousemove = e => keyCallback(e);

const keyCallback = e => {
    coordinate.x = e.clientX;
    coordinate.y = e.clientY;
    console.log(coordinate, 'coordinate')
}
