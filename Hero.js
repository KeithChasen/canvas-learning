class Hero extends Humanoid {
    constructor(x, y, controls) {
        super(x, y, controls, new Color(0, 0, 255, 1))

        addEventListener('click', () => {

            const selectedX = Math.ceil(this.controls.coordinate.x / localStorage.getItem('tileSize'));
            const selectedY = Math.ceil(this.controls.coordinate.y / localStorage.getItem('tileSize'));

            if (this.controls.coordinate.y < innerHeight * .67) {
                this.moveMeTo = { x: selectedX - 1, y: selectedY - 1 };
            }
        })
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.R}, ${this.color.G}, ${this.color.B}, ${this.color.A})`;
        const x = this.x * localStorage.getItem('tileSize') + localStorage.getItem('tileSize') / 4;
        const y = this.y * localStorage.getItem('tileSize') + localStorage.getItem('tileSize') / 4;
        ctx.fillRect(x, y, 20, 20);
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