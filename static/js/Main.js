var stats
var game
var gridItem
$(document).ready(function () {
    var client = io();
    var prevServ
    var tabServ = []
    var klocek1s
    var klocek2s
    var klocek3s

    client.on("onconnect", function (data) {
        console.log(data.clientName)
    })

    client.on("klocZserwera", function (data) {
        var klocekS = new Block(0xff0000)
        klocekS.position.set(data.posX, data.posY, data.posZ)
        scene.add(klocekS)
        prevServ = klocekS
        tabServ = []
    })

    client.on("kolorZserwera", function (data) {
        if (tabServ.length == 0) {
            if (prevServ != undefined) {

                prevServ.material.color.setHex(data.color)

            }
        }
        else {

            for (let i = 0; i < tabServ.length; i++) {
                tabServ[i].material.color.setHex(data.color)
            }

        }

    })

    client.on("wielkoscZserwera", function (data) {
        if (tabServ.length == 0) {
            tabServ.push(prevServ)
            klocek1s = new Block(0xff0000)
            klocek1s.position.set(data.posX, data.posY, data.posZ)
            scene.add(klocek1s)
            tabServ.push(klocek1s)


        }
        else if (tabServ.length == 2) {
            klocek2s = new Block(0xff0000)
            klocek2s.position.set(data.posX, data.posY, data.posZ)
            scene.add(klocek2s)
            tabServ.push(klocek2s)

        }
        else if (tabServ.length == 3) {
            klocek3s = new Block(0xff0000)
            klocek3s.position.set(data.posX, data.posY, data.posZ)
            scene.add(klocek3s)
            tabServ.push(klocek3s)

        }
        else if (tabServ.length == 4) {
            scene.remove(klocek1s)
            klocek1s.geometry.dispose();
            klocek1s.material.dispose();
            klocek1s = undefined
            scene.remove(klocek2s)
            klocek2s.geometry.dispose();
            klocek2s.material.dispose();
            klocek2s = undefined
            scene.remove(klocek3s)
            klocek3s.geometry.dispose();
            klocek3s.material.dispose();
            klocek3s = undefined
            tabServ = []

        }

    })

    client.on("obrotZserwera", function (data) {
        if (data.licznik == 0) {
            tabServ[1].position.x -= 50
            tabServ[1].position.z -= 50
            if (tabServ[2] != undefined) {
                tabServ[2].position.x -= 100
                tabServ[2].position.z -= 100
            }
            if (tabServ[3] != undefined) {
                tabServ[3].position.x -= 150
                tabServ[3].position.z -= 150
            }
        }
        else if (data.licznik == 1) {
            tabServ[1].position.x -= 50
            tabServ[1].position.z += 50
            if (tabServ[2] != undefined) {
                tabServ[2].position.x -= 100
                tabServ[2].position.z += 100
            }
            if (tabServ[3] != undefined) {
                tabServ[3].position.x -= 150
                tabServ[3].position.z += 150
            }
        }
        else if (data.licznik == 2) {
            tabServ[1].position.x += 50
            tabServ[1].position.z += 50
            if (tabServ[2] != undefined) {
                tabServ[2].position.x += 100
                tabServ[2].position.z += 100
            }
            if (tabServ[3] != undefined) {
                tabServ[3].position.x += 150
                tabServ[3].position.z += 150
            }
        }
        else if (data.licznik == 3) {
            tabServ[1].position.x += 50
            tabServ[1].position.z -= 50
            if (tabServ[2] != undefined) {
                tabServ[2].position.x += 100
                tabServ[2].position.z -= 100
            }
            if (tabServ[3] != undefined) {
                tabServ[3].position.x += 150
                tabServ[3].position.z -= 150
            }
        }


    })

    client.on("movingZserwera", function (data) {
        if (tabServ.length == 0) {
            if (prevServ != undefined) {
                prevServ.position.z = data.posZ
                prevServ.position.x = data.posX



            }
        }
        else {

            if (data.namber == 0) {
                tabServ[0].position.z = data.posZ
                tabServ[0].position.x = data.posX

            }
            else if (data.namber == 1) {
                tabServ[1].position.z = data.posZ
                tabServ[1].position.x = data.posX

            }
            else if (data.namber == 2) {
                tabServ[2].position.z = data.posZ
                tabServ[2].position.x = data.posX

            }
            else if (data.namber == 3) {
                tabServ[3].position.z = data.posZ
                tabServ[3].position.x = data.posX

            }


        }
    })



    // $(document).mousedown(function (event) {
    //     client.emit("kloc", {
    //         posX: event.clientX,
    //         posY: event.clientY
    //     })
    //     console.log()
    // })

    var raycaster = new THREE.Raycaster()
    var mouseVector = new THREE.Vector2()
    var next
    var prev
    var tab
    var licznik = 0
    var klocek1
    var klocek2
    var klocek3
    stats = new Stats()
    stats.showPanel(0);// 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom);
    //block = new Block()
    gridItem = new GridItem()
    game = new Game()

    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        0, // minimalny zasięg musi być >= 0
        10000);

    camera.position.set(1000, 1000, 1000)
    camera.lookAt(scene.position)
    camera.fov = 60;
    camera.updateProjectionMatrix();
    var renderer = new THREE.WebGLRenderer();

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '0x';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function onDocumentKeyDown(event) {
        event.preventDefault();
        if (event.key == "D" || event.key == "d") {

            camera.position.x = camera.position.x * Math.cos(0.01) + camera.position.z * Math.sin(0.01);
            camera.position.z = camera.position.z * Math.cos(0.01) - camera.position.x * Math.sin(0.01);

            //console.log(camera.position)
            camera.lookAt(scene.position)

        }
        else if (event.key == "A" || event.key == "a") {

            camera.position.x = camera.position.x * Math.cos(0.01) - camera.position.z * Math.sin(0.01);
            camera.position.z = camera.position.z * Math.cos(0.01) + camera.position.x * Math.sin(0.01);

            //console.log(camera.position)
            camera.lookAt(scene.position)

        }
        else if (event.key == "S" || event.key == "s") {

            camera.position.y -= 100

            //console.log(camera.position)
            camera.lookAt(scene.position)

        }
        else if (event.key == "W" || event.key == "w") {

            camera.position.y += 100

            //console.log(camera.position)
            camera.lookAt(scene.position)

        }
        else if (event.keyCode == 38) {
            if (tab.length == 0) {
                if (prev != undefined) {
                    prev.position.z -= 50
                    client.emit("moving", { posX: prev.position.x, posZ: prev.position.z });

                }
            }
            else {

                for (let i = 0; i < tab.length; i++) {
                    tab[i].position.z -= 50
                    client.emit("moving", { namber: i, posX: tab[i].position.x, posZ: tab[i].position.z });
                }


            }

        }
        else if (event.keyCode == 40) {

            if (tab.length == 0) {
                if (prev != undefined) {
                    prev.position.z += 50
                    client.emit("moving", { posX: prev.position.x, posZ: prev.position.z });

                }
            }
            else {
                for (let i = 0; i < tab.length; i++) {
                    tab[i].position.z += 50
                    client.emit("moving", { namber: i, posX: tab[i].position.x, posZ: tab[i].position.z });
                }
            }
        }
        else if (event.keyCode == 37) {

            if (tab.length == 0) {
                if (prev != undefined) {
                    prev.position.x -= 50
                    client.emit("moving", { posX: prev.position.x, posZ: prev.position.z });

                }
            }
            else {
                for (let i = 0; i < tab.length; i++) {
                    tab[i].position.x -= 50
                    client.emit("moving", { namber: i, posX: tab[i].position.x, posZ: tab[i].position.z });
                }
            }
        }
        else if (event.keyCode == 39) {

            if (tab.length == 0) {
                if (prev != undefined) {
                    prev.position.x += 50
                    client.emit("moving", { posX: prev.position.x, posZ: prev.position.z });

                }
            }
            else {
                for (let i = 0; i < tab.length; i++) {
                    tab[i].position.x += 50
                    client.emit("moving", { namber: i, posX: tab[i].position.x, posZ: tab[i].position.z });
                }

            }
        }
        else if (event.keyCode == 32 && event.ctrlKey) {
            event.preventDefault()
            // console.log("elo")

            if (prev != undefined) {

                if (tab.length == 0) {

                    tab.push(prev)
                    klocek1 = new Block(0xff0000)
                    if (licznik == 0) {
                        klocek1.position.set(prev.position.x + 50, prev.position.y, prev.position.z)
                        client.emit("wielkosc", { posX: prev.position.x + 50, posY: prev.position.y, posZ: prev.position.z });
                    }
                    else if (licznik == 1) {
                        klocek1.position.set(prev.position.x, prev.position.y, prev.position.z - 50)
                        client.emit("wielkosc", { posX: prev.position.x, posY: prev.position.y, posZ: prev.position.z - 50 });
                    }
                    else if (licznik == 2) {
                        klocek1.position.set(prev.position.x - 50, prev.position.y, prev.position.z)
                        client.emit("wielkosc", { posX: prev.position.x - 50, posY: prev.position.y, posZ: prev.position.z });
                    }
                    else if (licznik == 3) {
                        klocek1.position.set(prev.position.x, prev.position.y, prev.position.z + 50)
                        client.emit("wielkosc", { posX: prev.position.x, posY: prev.position.y, posZ: prev.position.z + 50 });
                    }
                    // klocek1.name = "klocek1"
                    scene.add(klocek1)
                    tab.push(klocek1)
                    //console.log(klocek1)
                    //console.log(tab)

                }
                else if (tab.length == 2) {
                    klocek2 = new Block(0xff0000)
                    if (licznik == 0) {
                        klocek2.position.set(tab[1].position.x + 50, prev.position.y, tab[1].position.z)
                        client.emit("wielkosc", { posX: tab[1].position.x + 50, posY: prev.position.y, posZ: tab[1].position.z });
                    }
                    else if (licznik == 1) {
                        klocek2.position.set(tab[1].position.x, prev.position.y, tab[1].position.z - 50)
                        client.emit("wielkosc", { posX: tab[1].position.x, posY: prev.position.y, posZ: tab[1].position.z - 50 });
                    }
                    else if (licznik == 2) {
                        klocek2.position.set(tab[1].position.x - 50, prev.position.y, tab[1].position.z)
                        client.emit("wielkosc", { posX: tab[1].position.x - 50, posY: prev.position.y, posZ: tab[1].position.z });
                    }
                    else if (licznik == 3) {
                        klocek2.position.set(tab[1].position.x, prev.position.y, tab[1].position.z + 50)
                        client.emit("wielkosc", { posX: tab[1].position.x, posY: prev.position.y, posZ: tab[1].position.z + 50 });
                    }
                    //klocek2.name = "klocek2"
                    scene.add(klocek2)
                    tab.push(klocek2)
                    //console.log(tab)
                }
                else if (tab.length == 3) {
                    klocek3 = new Block(0xff0000)
                    if (licznik == 0) {
                        klocek3.position.set(tab[2].position.x + 50, prev.position.y, tab[2].position.z)
                        client.emit("wielkosc", { posX: tab[2].position.x + 50, posY: prev.position.y, posZ: tab[2].position.z });
                    }
                    else if (licznik == 1) {
                        klocek3.position.set(tab[2].position.x, prev.position.y, tab[2].position.z - 50)
                        client.emit("wielkosc", { posX: tab[2].position.x, posY: prev.position.y, posZ: tab[2].position.z - 50 });
                    }
                    else if (licznik == 2) {
                        klocek3.position.set(tab[2].position.x - 50, prev.position.y, tab[2].position.z)
                        client.emit("wielkosc", { posX: tab[2].position.x - 50, posY: prev.position.y, posZ: tab[2].position.z });
                    }
                    else if (licznik == 3) {
                        klocek3.position.set(tab[2].position.x, prev.position.y, tab[2].position.z + 50)
                        client.emit("wielkosc", { posX: tab[2].position.x, posY: prev.position.y, posZ: tab[2].position.z + 50 });
                    }
                    //klocek3.name = "klocek3"
                    scene.add(klocek3)
                    tab.push(klocek3)
                    //console.log(scene.children)
                }
                else if (tab.length == 4) {
                    scene.remove(klocek1)
                    klocek1.geometry.dispose();
                    klocek1.material.dispose();
                    klocek1 = undefined
                    scene.remove(klocek2)
                    klocek2.geometry.dispose();
                    klocek2.material.dispose();
                    klocek2 = undefined
                    scene.remove(klocek3)
                    klocek3.geometry.dispose();
                    klocek3.material.dispose();
                    klocek3 = undefined
                    tab = []
                    client.emit("wielkosc", { posX: 0, posY: 0, posZ: 0 });
                }

            }
        }
        else if (event.key == "Escape") {
            //zmiana koloru
            if (tab.length == 0) {
                if (prev != undefined) {

                    var elo = getRandomColor()
                    //console.log(elo)
                    prev.material.color.setHex(elo)
                    client.emit("kolor", { color: elo });

                }
            }
            else {
                var elo = getRandomColor()
                //console.log(elo)
                for (let i = 0; i < tab.length; i++) {
                    tab[i].material.color.setHex(elo)
                }
                client.emit("kolor", { color: elo });
            }

        }
        else if (event.keyCode == 32) {
            //obrót wokół 1 klocka
            if (tab.length == 0) {
                if (prev != undefined) {
                    console.log("obrót 1 klocka lol")

                }
            }
            else {
                if (licznik == 0) {

                    tab[1].position.x -= 50
                    tab[1].position.z -= 50
                    if (tab[2] != undefined) {
                        tab[2].position.x -= 100
                        tab[2].position.z -= 100
                    }
                    if (tab[3] != undefined) {
                        tab[3].position.x -= 150
                        tab[3].position.z -= 150
                    }
                    client.emit("obrot", { licznik: licznik });
                    licznik++
                }
                else if (licznik == 1) {
                    tab[1].position.x -= 50
                    tab[1].position.z += 50
                    if (tab[2] != undefined) {
                        tab[2].position.x -= 100
                        tab[2].position.z += 100
                    }
                    if (tab[3] != undefined) {
                        tab[3].position.x -= 150
                        tab[3].position.z += 150
                    }
                    client.emit("obrot", { licznik: licznik });
                    licznik++
                }
                else if (licznik == 2) {
                    tab[1].position.x += 50
                    tab[1].position.z += 50
                    if (tab[2] != undefined) {
                        tab[2].position.x += 100
                        tab[2].position.z += 100
                    }
                    if (tab[3] != undefined) {
                        tab[3].position.x += 150
                        tab[3].position.z += 150
                    }
                    client.emit("obrot", { licznik: licznik });
                    licznik++

                }
                else if (licznik == 3) {
                    tab[1].position.x += 50
                    tab[1].position.z -= 50
                    if (tab[2] != undefined) {
                        tab[2].position.x += 100
                        tab[2].position.z -= 100
                    }
                    if (tab[3] != undefined) {
                        tab[3].position.x += 150
                        tab[3].position.z -= 150
                    }
                    client.emit("obrot", { licznik: licznik });
                    licznik = 0
                }




            }

        }
    }
    document.addEventListener('keydown', onDocumentKeyDown, false);

    $(document).mousedown(function (event) {

        mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;

        raycaster.setFromCamera(mouseVector, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            //console.log(intersects[0].object);
            clickedVect = intersects[0].point
            //console.log(clickedVect)
            if (intersects[0].object.name == "kloc") {
                licznik = 0
                tab = []
                next = intersects[0].object.position.y + 25
                //console.log(intersects[0].object);
                var klocek = new Block(0xff0000)
                klocek.position.set(intersects[0].object.position.x, next, intersects[0].object.position.z)
                scene.add(klocek)
                prev = klocek
                client.emit("kloc", { posX: intersects[0].object.position.x, posY: next, posZ: intersects[0].object.position.z });

            }
            if (intersects[0].object.name == "podloga") {
                tab = []
                //console.log(intersects[0].object);
                var klocek = new Block(0xff0000)
                klocek.position.set(intersects[0].object.position.x, 0, intersects[0].object.position.z)
                scene.add(klocek)//
                prev = klocek
                client.emit("kloc", { posX: intersects[0].object.position.x, posY: 0, posZ: intersects[0].object.position.z });

            }

        }
    })

    scene.add(game.makeGrid());


    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.x = -200
    directionalLight.position.y = 200
    directionalLight.position.z = 200
    scene.add(directionalLight);

    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight2.position.x = 200
    directionalLight2.position.y = 100
    directionalLight2.position.z = -200
    scene.add(directionalLight2);


    renderer.setClearColor(0x000000);

    renderer.setSize(window.innerWidth, window.innerHeight);

    $("#root").append(renderer.domElement);

    var axes = new THREE.AxesHelper(500);
    scene.add(axes);

    console.log(scene.children)

    function render() {
        stats.begin();
        renderer.render(scene, camera);
        stats.end();
        requestAnimationFrame(render);

        console.log("render leci")


    }
    render();

})