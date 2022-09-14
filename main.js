const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * .9;
canvas.height = window.innerHeight * .9;

ctx.fillStyle = 'green';
ctx.fillRect(40, 50, 100, 100);
