class Hero extends Humanoid {
    constructor(x, y) {
        super(x, y, 'blue')

        this.speed = 1;

        this.coordinate = { x: 0, y: 0 };
        this.moveMeTo = null;

        addEventListener('mousemove', e => {
            this.coordinate.x = e.clientX;
            this.coordinate.y = e.clientY;
        });

        addEventListener('click', () => {
            this.moveMeTo = this.coordinate;
        })
    }

    walkTowards() {
        if (this.moveMeTo.x !== this.x) {
            this.x += this.x < this.moveMeTo.x ? this.speed : -this.speed
        }

        if (this.moveMeTo.y !== this.y) {
            this.y += this.y < this.moveMeTo.y ? this.speed : -this.speed
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 30, 30);
    }

    update() {
        if (
            this.moveMeTo &&
            (this.moveMeTo.x !== this.x || this.moveMeTo.y !== this.y)
        ) {
            this.walkTowards();
        } else {
            if (this.moveMeTo) {
                this.moveMeTo = null;
            }
        }
    }
}