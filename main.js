
//todo: load level conditionally
const levelLoader = new LevelLoader(1);

const levelDetails = levelLoader.loadLevel();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let pictureTileSize = levelDetails.tileSize;
let tileSize = pictureTileSize * levelDetails.resolutionCoefficient;

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
    map = new TileMap(
        levelDetails,
        pictureTileSize,
        tileSize,
        camera,
        levelDetails.texturePath,
        levelDetails.textures,
        levelDetails.textureMapping,
    );
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