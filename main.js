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

    localStorage.setItem('tileSize', configuration.tileSize);

    camera = new Camera(
        0,
        0,
        10 * configuration.tileSize,
        6 * configuration.tileSize,
        configuration.tileSize
    );

    hero = new Hero(
        levelDetails.hero.x,
        levelDetails.hero.y,
        controls,
        levelDetails.map,
        camera,
        configuration.tileSize
    );

    enemy = new Enemy(
        levelDetails.enemy.x,
        levelDetails.enemy.y,
        controls,
        levelDetails.map,
        camera,
        configuration.tileSize
    );

    //todo: load particular map depending on level
    // todo: conditionally import json level files
    map = new TileMap(levelDetails, configuration.tileSize, camera);
}

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.draw(ctx);

    hero.draw(ctx);
    enemy.draw(ctx);

    hero.update();

    const { putCameraX, putCameraY } = cameraPoint(hero, camera, levelDetails.map)

    camera.update(putCameraX, putCameraY)
}

init();
animate();