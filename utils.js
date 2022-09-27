function parseFloor(val) {
    return Math.abs(Math.floor(val));
}

function parseCeil(val) {
    return Math.abs(Math.floor(val));
}

function cameraPoint(hero, camera, map) {
    return {
        putCameraY: calculateCameraVal(hero, map, camera, 'y'),
        putCameraX: calculateCameraVal(hero, map, camera, 'x')
    };
}

function calculateCameraVal(hero, map, camera, val) {
    if (
        hero[val] < (val === 'x' ? 4 : 2) ||
        hero[val] > map[0].length - (val === 'x' ? 6 : 4)
    )
        return  camera[val] / camera.size;
    else
        return hero[val] - (val === 'x' ? 4 : 2);
}
