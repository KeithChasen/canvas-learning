class Humanoid {
    constructor(x, y, controls, color) {
        this.x = x;
        this.y = y;
        this.controls = controls;
        this.color = color;
        this.moveMeTo = null;
        this.speed = 1;
    }

    walkTowards() {
        if (this.moveMeTo.x !== this.x) {
            this.x += this.x < this.moveMeTo.x ? this.speed : -this.speed
        }

        if (this.moveMeTo.y !== this.y) {
            this.y += this.y < this.moveMeTo.y ? this.speed : -this.speed
        }
    }

    getPosition() {
        return {
            x: this.x,
            y: this.y
        }
    }
}