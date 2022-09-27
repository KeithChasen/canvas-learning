class Camera {
    constructor(x, y, w, h, size) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.size = size;
    }

    update(x, y) {
        this.x = x * this.size;
        this.y = y * this.size;
    }
}