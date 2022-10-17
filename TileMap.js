class TileMap {
    constructor(layout, pictureTileSize, size, camera, texturePath, textures) {
        this.layout = layout;
        this.pictureTileSize = pictureTileSize;

        this.size = size;
        this.camera = camera;

        this.levelTileMaps = [...textures.map(texture => {
            const image = new Image();
            image.src = `textures/${texturePath}/${texture}.png`;
            return image;
        })];

        this.selectedX = null;
        this.selectedY = null;

        for (let i = 0; i < this.layout.map.length; i++) {
            for (let j = 0; j < this.layout.map.length; j++) {
                const tileDetails = this.#parseTile(this.layout.map[i][j]);
                localStorage.setItem(
                    `tile-${j}-${i}`,
                    JSON.stringify({ canGo: tileDetails.canGo })
                );
            }
        }

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

    drawNonImageTile(ctx, tileDetails, j, i) {
        ctx.fillStyle = tileDetails.color;

        const x = j * this.size - this.camera.x;
        const y = i * this.size - this.camera.y;
        ctx.fillRect(x, y, this.size, this.size);

        // todo: remove it as it is just for debugging to see the tiles
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, this.size, this.size);
    }

    parseImageTile(tile) {
        const tileArr = tile.split('-');
        const coordinates = tileArr[1].split(':');

        return {
          fileIndex: tileArr[0],
          y: coordinates[0],
          x: coordinates[1],
          canGo: tileArr[2]
        };
    }

    draw(ctx) {
        const { x_min, y_min, x_max, y_max } = this.calculateBoundaries();

        for (let i = y_min; i < y_max; i++) {
            for (let j = x_min; j < x_max; j++) {
                const tile = this.layout.map[i][j];
                // const tileDetails = tile.length > 0 ? this.parseImageTile(tile) : this.#parseTile(tile);
                const tileDetails = this.#parseTile(tile);

                if (this.selectedX + x_min === j + 1 && this.selectedY + y_min === i + 1) {
                    ctx.fillStyle = tileDetails.canGo ? 'grey' : 'salmon';
                    this.drawNonImageTile(ctx, tileDetails, j, i)
                } else if (tile.length > 1) {
                    const { fileIndex, y, x, canGo } = this.parseImageTile(tile)
                    const file = this.levelTileMaps[fileIndex];
                    const pictStartX = x * this.pictureTileSize;
                    const pictStartY = y * this.pictureTileSize;
                    const placeX = j * this.size - this.camera.x;
                    const placeY = i * this.size - this.camera.y;

                    ctx.drawImage(
                        file,
                        pictStartX,
                        pictStartY,
                        this.pictureTileSize,
                        this.pictureTileSize,
                        placeX,
                        placeY,
                        this.size,
                        this.size,
                    );
                } else {
                    this.drawNonImageTile(ctx, tileDetails, j, i)
                }
            }
        }
    }
}
