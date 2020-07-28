class Block extends THREE.Mesh {

    constructor(kolor) {
        super()
        this.color = kolor
        var geometry = new THREE.BoxGeometry(50, 25, 50);
        var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry);
        cube.position.y = 13

        var geometry = new THREE.CylinderGeometry(5, 5, 5, 10);
        var cylinder1 = new THREE.Mesh(geometry);
        cylinder1.position.x = -12
        cylinder1.position.z = 12
        cylinder1.position.y = 27


        var cylinder2 = new THREE.Mesh(geometry);
        cylinder2.position.x = 12
        cylinder2.position.z = -12
        cylinder2.position.y = 27


        var cylinder3 = new THREE.Mesh(geometry);
        cylinder3.position.x = 12
        cylinder3.position.z = 12
        cylinder3.position.y = 27


        var cylinder4 = new THREE.Mesh(geometry);
        cylinder4.position.x = -12
        cylinder4.position.z = -12
        cylinder4.position.y = 27

        var singleGeometry = new THREE.Geometry();

        cube.updateMatrix(); // bez tego pozycja geometrii jest zawsze 0,0,0
        singleGeometry.merge(cube.geometry, cube.matrix);

        cylinder1.updateMatrix();
        singleGeometry.merge(cylinder1.geometry, cylinder1.matrix);

        cylinder2.updateMatrix();
        singleGeometry.merge(cylinder2.geometry, cylinder2.matrix);

        cylinder3.updateMatrix();
        singleGeometry.merge(cylinder3.geometry, cylinder3.matrix);

        cylinder4.updateMatrix();
        singleGeometry.merge(cylinder4.geometry, cylinder4.matrix);

        this.geometry = singleGeometry
        this.material = material
        this.name = "kloc"

        return this



        // budowa elementów klocka (prostopadłościan i odpowiednia ilość cylindrów)
    }

    set kolor(val) {
        console.log("setter")
        this.color = val
    }
    get kolor() {
        console.log("getter")
        return this.color
    }
}