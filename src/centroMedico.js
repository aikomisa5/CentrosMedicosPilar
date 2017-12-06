var CentroMedico = function(id, nombre, especialidad, telefono, telefono2, horario, pais, provincia, localidad, calle, numero, diasAtencion, tipo) {

    this.id = id;
    this.nombre = nombre;
    this.especialidad = especialidad;
    this.telefono = telefono;
    this.telefono2 = telefono2;
    this.horario = horario;
    this.pais = pais;
    this.provincia = provincia;
    this.localidad = localidad;
    this.calle = calle;
    this.numero = numero;
    this.diasAtencion = diasAtencion;
    this.tipo = tipo;
    this.position;
    this.historyPositions = [];
    this.addPosition = function(lat, lon) {
        this.position = new Position(lat, lon);
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
        return nombre + " " + especialidad;
    }
};
