class LevelLoader {
    constructor(level) {
        this.level = level
    }
    loadLevel() {
        return eval(`level${this.level}()`)
    }
}