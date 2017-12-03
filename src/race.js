var Race = function(name, map) {
    this.name = name; // nombre de la carrera
    this.map = map; // mapa de la carrera
    this.runnersData = []; //arreglo de corredores, aca se agregan instancias de runner.
    this.finishedLoad; // en un boolean, como es null, te lo devuelve con false por defecto

    // dada una posición, busca el runner al que le corresponde
    // y la asocia al mismo.
    this.bindRunnerPosition = function(runnerPosition) {
        this.runnersData.forEach(function(data) {
            var runner = data.runner;
            if (runner.id == runnerPosition.id) {

                runnerPosition.positions.forEach(function(position) {
                    runner.addPosition(position.lat, position.lon);
                });

                console.log("posiciones asociadas a " + runner.showDetails() + " posiciones:");
                runner.historyPositions.forEach(function(position) {
                    console.log(position);
                });
            }
        });
        this.finishedLoad = true;
    }

    this.addRunner = function(runner) {
        // Creamos el layer en el mapa para ese runner
        var runnerLayer = L.featureGroup().addTo(this.map); // es un featureGroup
        // porque el mismo permite bindear comportamiento a todos los elementos del layer.
        runnerLayer.bindPopup(runner.showDetails()); // bindeo de un popup a todos los markers del grupo.
        // Agregamos el layer al control
        this.map.layersControl.addOverlay(runnerLayer, runner.name);
        // funcion que dibuja al corredor en el mapa.
        var updater = function(newPosition) {
            if (typeof newPosition != "undefined") {
                console.log("Updating view for runner: " + runner.name + "!!");
                console.log(newPosition);
                // borando los markers ya mostrados.
                runnerLayer.clearLayers();

                //actualizando la posiciones del runner en el mapa.
                runnerLayer.addLayer(L.circleMarker(newPosition, {
                    radius: 10,
                    fillColor: "#00AA00",
                    color: "#DDD",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.5
                }));
            }
        }

        // agregar a la carrera cada corredor, con el updater asociado
        this.runnersData.push({
            runner: runner,
            updater: updater
        })
    }

    // funcion que carga el listado de corredores en el documento html
    this.loadListOfRunners = function() {
        console.log("cargando lista de corredores length: " + this.runnersData.length);
        this.runnersData.forEach(function(data) {
            var runner = data.runner;
            var itemList = "<a class=\"list-group-item\"><h4 class=\"list-group-item-heading\">" + runner.name + " " + runner.surname + "</h4><p class=\"list-group-item-text\">" + runner.sponsor.name + "</p></a>";
            $("#runners").append(itemList);
        });
    }

    // toma cada uno de esos runners que estan en runnersdata y lo dibuja en el mapa
    this.start = function() {
        this.runnersData.forEach(function(data) {
            var runner = data.runner;
            runner.run(data.updater);
        });
    }
};