class Humanoid {
    constructor(x, y, controls, color, map) {
        this.x = x;
        this.y = y;
        this.controls = controls;
        this.color = color;
        this.map = map;

        this.moveMeTo = null;
        this.path = [];
        this.pathfinder = new Pathfinder(map);

        this.speed = 1;
    }

    buildPath() {
        this.path = this.pathfinder.findPath({ x: this.x, y: this.y }, this.moveMeTo);
    }

    walk(step) {
        if (this.x < step.x) {
            this.x += this.speed;
        }

        if (this.x > step.x) {
            this.x -= this.speed;
        }

        if (this.y < step.y) {
            this.y += this.speed;
        }

        if (this.y > step.y) {
            this.y -= this.speed;
        }
    }
}
