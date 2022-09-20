class Enemy extends Humanoid {
    constructor(x ,y, controls) {
        super(x, y, controls, new Color(255, 0, 0, 1));

        this.attackText = false

        addEventListener('mousemove', () => {
            if (
                Math.abs(this.controls.coordinate.x - this.x) < 30 &&
                Math.abs(this.controls.coordinate.y - this.y) < 30
            ) {
                this.color.A = .7;
                this.attackText = true;
            } else {
                this.color.A = 1;
                this.attackText = false;
            }
        });
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.R}, ${this.color.G}, ${this.color.B}, ${this.color.A})`;
        ctx.fillRect(this.x, this.y, 30, 30);

        if (this.attackText) {
            ctx.fillStyle = 'red';
            ctx.fillText('Attack', this.x, this.y - 10);
        }
    }

    update() {

    }
}