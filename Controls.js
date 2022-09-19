class Controls {
    constructor() {
        this.coordinate = { x: null, y: null };

        addEventListener('mousemove', e => {
            this.coordinate.x = e.clientX;
            this.coordinate.y = e.clientY;

            if (this.coordinate.y < innerHeight * .67) {
                // console.log('TOP')
            }

            if (this.coordinate.y > innerHeight * .68) {
                // console.log('BOTTOM')
            }
        });
    }
}