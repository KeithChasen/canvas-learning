class TileMap {
    constructor(
        layout,
        pictureTileSize,
        size,
        camera,
        texturePath,
        textures,
        textureMapping
    ) {
        this.layout = layout;
        this.pictureTileSize = pictureTileSize;
        this.size = size;
        this.camera = camera;
        this.textureMapping = textureMapping;

        this.levelTileMaps = [...textures.map(texture => {
            const image = new Image();
            image.src = `textures/${texturePath}/${texture}.png`;
            return image;
        })];
        this.selectedX = null;
        this.selectedY = null;

        this.#loadMapRestrictions();

        addEventListener('mousemove', e => {
            this.selectedX = Math.ceil(e.x / this.size) ;
            this.selectedY = Math.ceil(e.y / this.size);
        })
    }

    #loadMapRestrictions() {
        for (let i = 0; i < this.layout.map.length; i++) {
            for (let j = 0; j < this.layout.map.length; j++) {
                const tile = this.layout.map[i][j];
                const tileDetails = tile.length > 1 ? this.parseImageTile(tile) : this.#parseTile(tile);
                localStorage.setItem(
                    `tile-${j}-${i}`,
                    JSON.stringify({ canGo: tileDetails.canGo })
                );
            }
        }
    }

    #parseTile(code) {
        switch(code) {
            case 'g':
                return { color: 'green', canGo: true }; // grass - will be used mostly for drawing levels
            case 'b':
                return { color: 'black', canGo: false }; // black (empty) - to fill some gaps and spaces
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
        const { x, y } = this.#findRelativeCoordinate(j, i);
        ctx.fillRect(x, y, this.size, this.size);
    }

    parseImageTile(tile) {
        const tileArr = tile.split('-');
        const coordinates = tileArr[1].split(':');
        const fileIndex = this.textureMapping.indexOf(tileArr[0]);

        return {
            fileIndex,
            y: coordinates[0],
            x: coordinates[1],
            canGo: tileArr[2] === '1',
            interact: tileArr[2] === '2',
            // todo: fetch interact script from level json (x, y)
            interactScript: typeof tileArr[3] !== "undefined" ? tileArr[3] : null
        };
    }

    #findRelativeCoordinate(j, i) {
        return {
            x: j * this.size - this.camera.x,
            y: i * this.size - this.camera.y
        };
    }

    #drawPossibleWayTile(ctx, tileDetails, j, i) {
        ctx.fillStyle = tileDetails.canGo ? 'grey' : 'salmon';
        const { x, y } = this.#findRelativeCoordinate(j, i)
        ctx.fillRect(x, y, this.size, this.size);
    }

    #drawImageTile(ctx, tileDetails, j, i) {
        const { fileIndex, y, x } = tileDetails
        const file = this.levelTileMaps[fileIndex];
        const pictStartX = x * this.pictureTileSize;
        const pictStartY = y * this.pictureTileSize;
        const { x: placeX, y: placeY } = this.#findRelativeCoordinate(j, i)

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
    }

    draw(ctx) {
        const { x_min, y_min, x_max, y_max } = this.calculateBoundaries();

        for (let i = y_min; i < y_max; i++) {
            for (let j = x_min; j < x_max; j++) {
                const tile = this.layout.map[i][j];
                const tileDetails = tile.length > 1 ? this.parseImageTile(tile) : this.#parseTile(tile);

                if (this.selectedX + x_min === j + 1 && this.selectedY + y_min === i + 1) {
                    this.#drawPossibleWayTile(ctx, tileDetails, j, i);
                    continue;
                }

                if (tile.length > 1) {
                    this.#drawImageTile(ctx, tileDetails, j, i)
                    continue;
                }

                this.drawNonImageTile(ctx, tileDetails, j, i)
            }
        }
    }
}
