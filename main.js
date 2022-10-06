import levelDetails from './levels/test.json' assert { type: 'json'};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let tileSize = 64;

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

let hero = null;
let enemy = null;
let controls = null;
let map = null;
let camera = null;

function init() {
    controls = new Controls();

    camera = new Camera(
        0,
        0,
        12 * tileSize,
        8 * tileSize,
        tileSize
    );

    hero = new Hero(
        levelDetails.hero.x,
        levelDetails.hero.y,
        controls,
        levelDetails.map,
        camera,
        tileSize
    );

    enemy = new Enemy(
        levelDetails.enemy.x,
        levelDetails.enemy.y,
        controls,
        levelDetails.map,
        camera,
        tileSize
    );

    //todo: load particular map depending on level
    // todo: conditionally import json level files
    map = new TileMap(levelDetails, tileSize, camera);
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