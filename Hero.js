class Hero extends Humanoid {
    constructor(x, y, controls, map) {
        super(x, y, controls, new Color(0, 0, 255, 1), map)

        addEventListener('click', () => {
            const selectedX = Math.ceil(this.controls.coordinate.x / localStorage.getItem('tileSize'));
            const selectedY = Math.ceil(this.controls.coordinate.y / localStorage.getItem('tileSize'));

            if (this.controls.coordinate.y < innerHeight * .67) {
                this.moveMeTo = { x: selectedX - 1, y: selectedY - 1 };
                this.buildPath();
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
        if (this.moveMeTo) {
            const tileId = `tile-${this.moveMeTo.x}-${this.moveMeTo.y}`;
            const canGo = JSON.parse(localStorage.getItem(tileId)).canGo;

            if (
                canGo &&
                (this.moveMeTo.x !== this.x || this.moveMeTo.y !== this.y) &&
                this.path.length
            ) {
                const shifted = this.path.shift();
                this.walk(shifted)
            } else {
                this.moveMeTo = null;
                this.path = [];
            }
        }
    }
}
