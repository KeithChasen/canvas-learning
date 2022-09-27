class Controls {
    constructor() {
        this.coordinate = { x: null, y: null };

        addEventListener('mousemove', e => {
            this.coordinate.x = e.x;
            this.coordinate.y = e.y;
        });
    }
}