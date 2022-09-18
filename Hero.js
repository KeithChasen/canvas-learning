class Hero extends Humanoid {
    constructor(x, y, controls) {
        super(x, y, controls, 'blue')

        this.speed = 1;
        this.moveMeTo = null;

        addEventListener('click', () => {
            this.moveMeTo = { ...this.controls.coordinate };
        })
    }

    walkTowards() {
        if (this.moveMeTo.x !== this.x) {
            this.x += this.x < this.moveMeTo.x ? this.speed : -this.speed
        }

        if (this.moveMeTo.y !== this.y) {
            this.y += this.y < this.moveMeTo.y ? this.speed : -this.speed
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 30);
    }

    update() {
        if (
            this.moveMeTo &&
            (this.moveMeTo.x !== this.x || this.moveMeTo.y !== this.y)
        ) {
            this.walkTowards();
        } else {
            if (this.moveMeTo) {
                this.moveMeTo = null;
            }
        }
    }
}