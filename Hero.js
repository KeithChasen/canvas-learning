class Hero extends Humanoid {
    constructor(x, y, controls) {
        super(x, y, controls, new Color(0, 0, 255, 1))

        addEventListener('click', () => {
            if (this.controls.coordinate.y < innerHeight * .67) {
                this.moveMeTo = { ...this.controls.coordinate };
            }
        })
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.R}, ${this.color.G}, ${this.color.B}, ${this.color.A})`;
        ctx.fillRect(this.x, this.y, 30, 30);
    }

    update() {
        // todo: check there's some obstacle among alive

        if (this.moveMeTo) {
            if (this.moveMeTo.x !== this.x || this.moveMeTo.y !== this.y) {
                this.walkTowards();
            } else {
                this.moveMeTo = null;
            }
        }
    }
}