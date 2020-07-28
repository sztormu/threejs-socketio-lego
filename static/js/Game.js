class Game {
    constructor() {
        this.kontenerGrid = new THREE.Object3D()
        var grid = new GridItem()
        this.kontenerGrid.add(grid)

    }

    makeGrid() {
        //griditem 15x15
        return this.kontenerGrid
    }

}