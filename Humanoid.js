class Humanoid {
    constructor(x, y, controls, color) {
        this.x = x;
        this.y = y;
        this.controls = controls;
        this.color = color;
        this.moveMeTo = null;
        this.speed = 1;
    }

    parseFloorX() {
        return Math.floor(this.x);
    }

    parseFloorY() {
        return Math.floor(this.y);
    }

    parseCeilX() {
        return Math.ceil(this.x);
    }

    parseCeilY() {
        return Math.ceil(this.y);
    }

    getNextXTile(){
        const x = this.parseFloorX();
        const y = this.parseFloorY();

        const tileId = `tile-${x + 1}-${y}`;
        return JSON.parse(localStorage.getItem(tileId));
    }

    getPrevXTile(){
        const x = this.parseCeilX();
        const y = this.parseCeilY();

        const tileId = `tile-${x - 1}-${y}`;
        return JSON.parse(localStorage.getItem(tileId));
    }

    getNextYTile(){
        const x = this.parseFloorX();
        const y = this.parseFloorY();

        const tileId = `tile-${x}-${y + 1}`;
        return JSON.parse(localStorage.getItem(tileId));
    }

    getPrevYTile(){
        const x = this.parseCeilX();
        const y = this.parseCeilY();

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
        if (this.x < this.moveMeTo.x) {
            this.increaseX();
        }

        if (this.x > this.moveMeTo.x) {
            this.decreaseX();
        }
    }

    walkCheckY() {
        if (this.y < this.moveMeTo.y) {
            this.increaseY();
        }

        if (this.y > this.moveMeTo.y) {
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
