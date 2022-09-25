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

        this.nextPoint = null;

        this.speed = 1 / localStorage.getItem('tileSize');
    }

    buildPath() {
        this.path = this.pathfinder.findPath({ x: this.x, y: this.y }, this.moveMeTo);
    }

    walk() {
        if (this.x < this.nextPoint.x) {
            this.x += this.speed;
        }

         if (this.x > this.nextPoint.x) {
            this.x -= this.speed;
        }

         if (this.y < this.nextPoint.y) {
            this.y += this.speed;
        }

         if (this.y > this.nextPoint.y) {
            this.y -= this.speed;
        }
    }
}
