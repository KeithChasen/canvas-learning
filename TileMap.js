class TileMap {
    constructor(layout, size, camera) {
        this.layout = layout;
        this.size = size;
        this.camera = camera;

        this.selectedX = null;
        this.selectedY = null;

        addEventListener('mousemove', e => {
            this.selectedX = Math.ceil(e.x / this.size) ;
            this.selectedY = Math.ceil(e.y / this.size);
        })
    }

    #parseTile(code) {
        switch(code) {
            case 'g':
                return { color: 'green', canGo: true }; // grass
            case 'w':
                return { color: 'grey', canGo: false }; // wall
            case 's':
                return { color: 'khaki', canGo: true }; // sand (currently road)
            case 'p':
                return { color: 'sienna', canGo: true }; // path
            case 'b':
                return { color: 'black', canGo: false }; // building
            case 'a':
                return { color: 'deepskyblue', canGo: false }; // water
            default:
                return { color: 'green', canGo: true };
        }
    }

    calculateBoundaries() {
        const x_min = Math.floor(this.camera.x / this.size);
        const y_min = Math.floor(this.camera.y / this.size);
        const x_max = Math.ceil((this.camera.x + this.camera.w) / this.size);
        const y_max = Math.ceil((this.camera.y + this.camera.h) / this.size);

        return { x_min, y_min, x_max, y_max };
    }

    draw(ctx) {
        const { x_min, y_min, x_max, y_max } = this.calculateBoundaries();

        for (let i = y_min; i < y_max; i++) {
            for (let j = x_min; j < x_max; j++) {
                // todo: replace it with tiles once they're ready
                const tileDetails = this.#parseTile(this.layout.map[i][j]);

                localStorage.setItem(
                    `tile-${j}-${i}`,
                    JSON.stringify({ canGo: tileDetails.canGo })
                );

                if (this.selectedX + x_min === j + 1 && this.selectedY + y_min === i + 1) {
                    ctx.fillStyle = tileDetails.canGo ? 'grey' : 'salmon';
                } else {
                    ctx.fillStyle = tileDetails.color;
                }

                const x = j * this.size - this.camera.x;
                const y = i * this.size - this.camera.y;
                ctx.fillRect(x, y, this.size, this.size);

                // todo: remove it as it is just for debugging to see the tiles
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, this.size, this.size);
            }
        }
    }
}
