class Humanoid {
    constructor(x, y, controls, color, map, camera, size) {
        this.controls = controls;
        this.color = color;
        this.camera = camera;
        this.size = size;

        this.x = x;
        this.y = y;

        this.map = map;

        this.moveMeTo = null;
        this.path = [];
        this.pathfinder = new Pathfinder(map);

        this.nextPoint = null;

        this.speed = 1 / this.size;
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

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.R}, ${this.color.G}, ${this.color.B}, ${this.color.A})`;
        const x = (this.x * this.size) - this.camera.x;
        const y = (this.y * this.size) - this.camera.y;
        ctx.fillRect(x, y, 20, 20);
    }
}
