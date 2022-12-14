class Humanoid {
    constructor(x, y, controls, color, map, camera, size) {
        this.controls = controls;
        this.color = color;
        this.camera = camera;
        this.size = size;

        this.humanoidSize = 20;

        this.x = x;
        this.y = y;

        this.map = map;

        this.moveMeTo = null;
        this.path = [];
        this.pathfinder = new Pathfinder(map);

        this.nextPoint = null;

        this.speed = 2 / this.size;
    }

    buildPath() {
        this.path = this.pathfinder.findPath({
            x: parseCeil(this.x),
            y: parseCeil(this.y)
        }, this.moveMeTo);
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
        const x = ((this.x * this.size) - this.camera.x - this.humanoidSize / 2) + this.size / 2;
        const y = ((this.y * this.size) - this.camera.y - this.humanoidSize / 2) + this.size / 2;
        ctx.fillRect(x, y, this.humanoidSize, this.humanoidSize);
    }
}
