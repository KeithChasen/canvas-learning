class Enemy extends Humanoid {
    constructor(x ,y, controls, map, camera, size) {
        super(x, y, controls, new Color(255, 0, 0, 1), map, camera, size);
    }
}