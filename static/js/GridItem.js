class GridItem {
    constructor() {
        this.containerGrid = new THREE.Object3D()
        for (var i = 0; i < 15; i++) {
            for (var j = 0; j < 15; j++) {
                var geometry = new THREE.PlaneGeometry(50, 50, 10, 7);
                var material = new THREE.MeshPhongMaterial({
                    color: 0xC0C8FF,
                    side: THREE.DoubleSide,

                })
                var plane = new THREE.Mesh(geometry, material);
                plane.position.x = -375 + (i * 50) + 25
                plane.position.z = -375 + (j * 50) + 25
                plane.rotation.x = Math.PI / 2
                plane.name = "podloga"
                this.containerGrid.add(plane)
                var lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
                var geometry = new THREE.Geometry();
                geometry.vertices.push(new THREE.Vector3(-375, 0, -375));
                geometry.vertices.push(new THREE.Vector3(-375 + (50 * i) + 50, 0, -375));
                geometry.vertices.push(new THREE.Vector3(-375 + (50 * i) + 50, 0, -375 + (50 * j) + 50));
                geometry.vertices.push(new THREE.Vector3(-375, 0, -375 + (50 * j) + 50));
                var line = new THREE.Line(geometry, lineMaterial);
                this.containerGrid.add(line)
            }

        }
        return this.containerGrid

    }



}