var Runner = function(id, name, surname, sponsor) {

    this.id = id;
    this.name = name;
    this.surname = surname;
    this.sponsor = sponsor;
    this.historyPositions = [];
    this.addPosition = function(lat, lon) {
        this.historyPositions.push(new Position(lat, lon));
    }

    //inicialización del indice para recorrer el arreglo de posiciones
    //historicas
    var indiceActual = 0;
    //function que recorre las posiciones una a una
    //ejecutando la function callback pasada como parametro  
    this.run = function(mapUpdaterCorredor) {
        var self = this;
        setTimeout(function() {
            mapUpdaterCorredor(self.historyPositions[indiceActual]);
            indiceActual++;
            if (indiceActual < self.historyPositions.length)
                self.run(mapUpdaterCorredor);
        }, 1000); //1000 ms -> 1 s, la function se ejecuta cada 1 segundo.
    }

    this.showDetails = function() {
        return name + " " + surname + " sponsor: " + sponsor.name;
    }
};