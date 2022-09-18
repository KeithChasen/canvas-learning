class Enemy extends Humanoid {
    constructor(x ,y) {
        super(x, y);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 30);
    }
}