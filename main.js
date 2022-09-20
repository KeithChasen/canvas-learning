import * as testLevel from './levels/test.json' assert { type: 'json'};
import * as config from './config.json' assert { type: 'json'};

const configuration = config.default;
const levelDetails = testLevel.default;

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
let map = null;

// array contains all the moving HUMANOID's coordinates
// available on the map
// let pileOfAlive = [];

function init() {
    controls = new Controls();
    hero = new Hero(levelDetails.heroStart.x, levelDetails.heroStart.y, controls);
    enemy = new Enemy(100, 100, controls);

    localStorage.setItem('tileSize', configuration.tileSize);

    //todo: load particular map depending on level
    // todo: conditionally import json level files
    map = new TileMap(levelDetails, configuration.tileSize);
}

function animate() {
    requestAnimationFrame(animate);

    // pileOfAlive = [];
    //
    // pileOfAlive.push(hero.getPosition());
    // pileOfAlive.push(enemy.getPosition());

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.draw(ctx);

    hero.draw(ctx);
    enemy.draw(ctx);

    hero.update();
}

init();
animate();