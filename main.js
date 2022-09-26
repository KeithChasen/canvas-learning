import * as testLevel from './levels/test.json' assert { type: 'json'};
import * as config from './config.json' assert { type: 'json'};

const configuration = config.default;
const levelDetails = testLevel.default;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let hero = null;
let enemy = null;
let controls = null;
let map = null;
let camera = null;

// array contains all the moving HUMANOID's coordinates
// available on the map
// let pileOfAlive = [];

function init() {
    controls = new Controls();
    hero = new Hero(
        levelDetails.heroStart.x,
        levelDetails.heroStart.y,
        controls,
        levelDetails.map
    );
    enemy = new Enemy(100, 100, controls, levelDetails.map);

    localStorage.setItem('tileSize', configuration.tileSize);

    camera = new Camera(1000, 1000, 800, 800);

    //todo: load particular map depending on level
    // todo: conditionally import json level files
    map = new TileMap(levelDetails, configuration.tileSize, camera);
}

function animate() {
    requestAnimationFrame(animate);

    // pileOfAlive = [];
    //
    // pileOfAlive.push(hero.getPosition());
    // pileOfAlive.push(enemy.getPosition());

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.draw(ctx);

    ctx.save();

    hero.draw(ctx);
    enemy.draw(ctx);

    ctx.restore();

    hero.update();
}

init();
animate();