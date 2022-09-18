class Enemy extends Humanoid {
    constructor(x ,y, controls) {
        super(x, y, controls);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 30);
    }
}