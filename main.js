const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasWidth = window.innerWidth * .9
const canvasHeight = window.innerHeight * .9

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const minX = Math.round((window.innerWidth - canvasWidth) / 2);
const maxX = Math.round(window.innerWidth - (window.innerWidth - canvasWidth) / 2);

const minY = Math.round((window.innerHeight - canvasHeight) / 2);
const maxY = Math.round(window.innerHeight - (window.innerHeight - canvasHeight) / 2);

canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.fillStyle = 'green';
ctx.fillRect(40, 50, 100, 100);

const coordinate = { x: 0, y: 0 };

document.onmousemove = e => keyCallback(e);

const keyCallback = e => {
    if (e.clientX > minX && e.clientX < maxX && e.clientY > minY && e.clientY < maxY) {
        coordinate.x = e.clientX;
        coordinate.y = e.clientY;
    }
    console.log(coordinate, 'coordinate')
}
