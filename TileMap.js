class TileMap {
    constructor(layout, size) {
        this.layout = layout.default;
        this.size = size;

        // console.log(this.layout, 'layout')
    }

    #parseTile(code) {
        switch(code) {
            case 'g':
                return 'green';
            case 'w':
                return 'grey';
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