class Pathfinder {
    constructor(map) {
        this.map = map
        this.map_width = this.map[0].length
        this.map_height = this.map.length
    }

    findPath(start, end) {
        start.parent = null

        let pointsToVisit = [start]

        let neighbors = []

        let visited = []

        let current_point = start

        while (pointsToVisit.length > 0 && (current_point.x !== end.x || current_point.y !== end.y)) {
            current_point = pointsToVisit.shift()

            if (visited.hasOwnProperty(`${current_point.x}_${current_point.y}`)) {
                continue
            }

            neighbors = this.getTileNeighbors(current_point)

            neighbors.forEach(tile => {
                if(!visited.hasOwnProperty(`${tile.x}_${tile.y}`)) {
                    pointsToVisit.push(tile)
                }
            })
            
            visited[`${current_point.x}_${current_point.y}`] = current_point
        }

        let path = []
        while(current_point.x !== start.x || current_point.y !== start.y) {
            path.unshift(current_point)
            if(current_point.parent == null) {
                break
            }
            current_point = current_point.parent
        }

        return path
    }

    getTileNeighbors(tile) {
        let neighbors = []

        // left
        if (tile.x > 0 && this.isFreeTile(tile.x - 1, tile.y)) {
            neighbors.push({ x: tile.x - 1, y: tile.y, parent: tile })
        }

        // left up
        if (tile.x > 0 && tile.y > 0 && this.isFreeTile(tile.x - 1, tile.y - 1)) {
            neighbors.push({ x: tile.x - 1, y: tile.y - 1, parent: tile })
        }

        // left down
        if (tile.y < this.map_height - 1 && tile.x > 0  && this.isFreeTile(tile.x - 1, tile.y + 1)) {
            neighbors.push({ x: tile.x - 1, y: tile.y + 1, parent: tile })
        }

        // up
        if (tile.y > 0 && this.isFreeTile(tile.x, tile.y - 1)) {
            neighbors.push({ x: tile.x, y: tile.y - 1, parent: tile })
        }

        // down
        if (tile.y < this.map_height - 1 && this.isFreeTile(tile.x, tile.y + 1)) {
            neighbors.push({ x: tile.x, y: tile.y + 1, parent: tile})
        }

        // right
        if (tile.x < this.map_width - 1 && this.isFreeTile(tile.x + 1, tile.y)) {
            neighbors.push({ x: tile.x + 1, y: tile.y, parent: tile})
        }

        // right up
        if (tile.x < this.map_width - 1 && tile.y > 0 && this.isFreeTile(tile.x + 1, tile.y - 1)) {
            neighbors.push({ x: tile.x + 1, y: tile.y - 1, parent: tile })
        }

        // right down
        if (tile.x < this.map_height - 1 && tile.y < this.map_height - 1  && this.isFreeTile(tile.x + 1, tile.y + 1)) {
            neighbors.push({ x: tile.x + 1, y: tile.y + 1, parent: tile })
        }

        return neighbors
    }

    isFreeTile(x, y) {
        x = parseFloor(x);
        y = parseFloor(y);

        const tileId = `tile-${x}-${y}`;
        const tile = JSON.parse(localStorage.getItem(tileId));
        return tile.canGo;
    }
}