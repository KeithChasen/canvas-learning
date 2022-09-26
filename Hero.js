class Hero extends Humanoid {
    constructor(x, y, controls, map) {
        super(x, y, controls, new Color(0, 0, 255, 1), map)

        addEventListener('click', () => {
            const selectedX = Math.ceil(this.controls.coordinate.x / localStorage.getItem('tileSize'));
            const selectedY = Math.ceil(this.controls.coordinate.y / localStorage.getItem('tileSize'));
            if (this.controls.coordinate.y < innerHeight) {
                const x = selectedX - 1;
                const y = selectedY - 1;
                const tileId = `tile-${x}-${y}`;
                const canGo = JSON.parse(localStorage.getItem(tileId)).canGo;
                if (canGo) {
                    this.moveMeTo = { x, y };
                    this.buildPath();
                }
            }
        })
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(${this.color.R}, ${this.color.G}, ${this.color.B}, ${this.color.A})`;
        const x = this.x * localStorage.getItem('tileSize') + localStorage.getItem('tileSize') / 4;
        const y = this.y * localStorage.getItem('tileSize') + localStorage.getItem('tileSize') / 4;
        ctx.fillRect(x, y, 20, 20);
    }

    checkMovement() {
        if (this.moveMeTo) {
            const notThere = this.moveMeTo.x !== this.x || this.moveMeTo.y !== this.y;

            if (!notThere) {
                this.moveMeTo = null;
                this.path = [];
                this.nextPoint =  null;
            }

            if (!this.nextPoint && this.path.length) {
                this.nextPoint = this.path.shift();
            }

            if (!this.nextPoint && !this.path.length) {
                this.moveMeTo = null;
            }

            if (notThere && this.nextPoint) {
                this.walk();
            }

            const arrivedToNext = this.nextPoint && this.nextPoint.x === this.x && this.nextPoint.y === this.y;

            if (notThere && arrivedToNext) {
                this.nextPoint = null;
            }
        }
    }

    update() {
        this.checkMovement();
    }
}
