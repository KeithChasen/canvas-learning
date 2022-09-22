class Humanoid {
    constructor(x, y, controls, color) {
        this.x = x;
        this.y = y;
        this.controls = controls;
        this.color = color;
        this.moveMeTo = null;
        this.speed = 1;
    }

    parsePosition() {
        return { x: Math.floor(this.x), y: Math.floor(this.y) };
    }

    getNextXTile(){
        const { x, y } = this.parsePosition();

        const tileId = `tile-${x + 1}-${y}`;
        return JSON.parse(localStorage.getItem(tileId));
    }

    getPrevXTile(){
        const { x, y } = this.parsePosition();

        const tileId = `tile-${x - 1}-${y}`;
        return JSON.parse(localStorage.getItem(tileId));
    }

    getNextYTile(){
        const { x, y } = this.parsePosition();

        const tileId = `tile-${x}-${y + 1}`;
        return JSON.parse(localStorage.getItem(tileId));
    }

    getPrevYTile(){
        const { x, y } = this.parsePosition();

        const tileId = `tile-${x}-${y - 1}`;
        return JSON.parse(localStorage.getItem(tileId));
    }

    increaseX() {
        const nextX = this.getNextXTile();

        if (nextX.canGo) {
            this.x += this.speed / localStorage.getItem('tileSize');
        } else {
            // todo: check +1 Y and -1 Y and make a decision
        }
    }

    decreaseX() {
        const prevX = this.getPrevXTile();

        if (prevX.canGo) {
            this.x -= this.speed / localStorage.getItem('tileSize');
        } else {
            // todo: check +1 Y and -1 Y and make a decision
        }
    }

    increaseY() {
        const nextY = this.getNextYTile();

        if (nextY.canGo) {
            this.y += this.speed / localStorage.getItem('tileSize');
        } else {
            // todo: check +1 X and -1 X and make a decision
        }
    }

    decreaseY() {
        const prevY = this.getPrevYTile();

        if (prevY.canGo) {
            this.y -= this.speed / localStorage.getItem('tileSize');
        } else {
            // todo: check +1 X and -1 X and make a decision
        }
    }

    walkCheckX() {
        const { x } = this.parsePosition();

        if (x < this.moveMeTo.x) {
            this.increaseX();
        }

        // todo: check where I messed up these measurements
        if (x + 1 > this.moveMeTo.x) {
            this.decreaseX();
        }
    }

    walkCheckY() {
        const { y } = this.parsePosition();

        if (y < this.moveMeTo.y) {
            this.increaseY();
        }

        // todo: check where I messed up these measurements
        if (y + 1 > this.moveMeTo.y) {
            this.decreaseY();
        }
    }

    walkTowards() {
        if (this.moveMeTo.x !== this.x) {
            this.walkCheckX();
        }

        if (this.moveMeTo.y !== this.y) {
            this.walkCheckY();
        }
    }
}
