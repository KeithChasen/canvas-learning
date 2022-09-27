class Hero extends Humanoid {
    constructor(x, y, controls, map, camera, size) {
        super(x, y, controls, new Color(0, 0, 255, 1), map, camera, size)

        addEventListener('click', () => {
            const initX = this.controls.coordinate.x / this.size + this.camera.x / this.size;
            const initY = this.controls.coordinate.y / this.size + this.camera.y / this.size;

            const selectedX = Math.ceil(initX);
            const selectedY = Math.ceil(initY);

            if (this.controls.coordinate.y < innerHeight && this.controls.coordinate.x < innerWidth) {
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
