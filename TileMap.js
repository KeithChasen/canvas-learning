class TileMap {
    constructor(layout, size) {
        this.layout = layout.default;
        this.mapSize = this.layout.map.length
        this.size = size;

        this.tileCoordinate = { x: null, y: null }

        // addEventListener('mousemove', e => {
        //     this.tileCoordinate.x = e.x;
        //     this.tileCoordinate.y = e.y;
        //
        //     console.log(this.tileCoordinate, 'tileCoordinate')
        // })
    }

    #parseTile(code) {
        switch(code) {
            case 'g':
                return 'green'; // grass
            case 'w':
                return 'grey'; // wall
            case 's':
                return 'khaki'; // sand (currently road)
            case 'p':
                return 'sienna'; // path
            case 'b':
                return 'black'; // building
            case 'a':
                return 'deepskyblue'; // building
            default:
                return 'green'
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.layout.map.length; i++) {
            for (let j = 0; j < this.layout.map[i].length; j++) {
                // todo: replace it with tiles once they're ready
                ctx.fillStyle = this.#parseTile(this.layout.map[i][j]);
                const x = j * this.size;
                const y = i * this.size;
                ctx.fillRect(x, y, this.size, this.size);

                // todo: remove it as it is just for debugging to see the tiles
                ctx.strokeStyle = 'black';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, this.size, this.size);
            }
        }
    }
}