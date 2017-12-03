function centrosLoader(url) {
    this.url = url;
    var latlngs = [];
    var centrosLista = [];
    this.finishedLoad = false;

  /*  this.cargarCiertoTipoDeCentro = function(enum tipoCentro){

  }*/

    this.cargarCentrosPorTipo = function (tipo, map){
      var centroLayer = L.featureGroup().addTo(map); // es un featureGroup
      map.layersControl.removeLayer(centroLayer);
        map.layersControl.addOverlay(centroLayer, "Centros Medicos");
        console.log("here", tipo);
        if(centrosLista.length==0){
          console.log("VACIO");
        }
        function buscandoCentros(){
        for (var i = 0; i <= centrosLista.length; i++) {
          if (centrosLista[i].especialidad.equals(tipo)){
            console.log("HERE3");
          }
        else {
          console.log("No matchea ningun centro");
        }};
        }
      }

        /*$.each(centrosLista, function(index, value) {
          console.log(value);
        });*/
          /*if (item.especialidad.equals(tipo)){
            console.log("here2:");
          }*/

      /*centrosLista.forEach( (cent) => {if (cent.especialidad.equals(tipo)){
          var centroLayer = L.featureGroup().addTo(map);
          consolo.log("here2: ", cent.especialidad);
          marker = L.marker([cent.coordinate.lat, cent.coordinate.lon]);

          marker.bindPopup("<b>"+cent.nombre+"</b>"+"<br>"+cent.calle + " " + cent.numero).openPopup();

          centroLayer.addLayer(marker);
        }});*/


    this.loadCentros = function(map) {
        //modifica el html para mostrar la info del centro
      /*  function mostrarDatos(centro) {
            centro = "<h3 > Centro " +
                centro.id +
                "<small> Nombre: " +
                centro.nombre +
                "</small>" +
                "<small> Calle: " +
                centro.calle +
                "</small>" +
                "<small> Numero: " +
                centro.numero +
                "</small>" +
                "</h3>";
            $("#centro").hide();
            $("#centro").empty();
            $("#centro").append(centro);
            $("#centro").show(500);
        }
*/
        // recibe el listado de centros a procesar
        function generarArrayDeCentrosPositions(centrosList) {
            console.log("generando array de coordenadas de centros");

            centrosList.forEach(function(centro) {
                console.log("coordenada centro: " + centro.lat + ", " + centro.lon);
                latlngs.push([centro.lat, centro.lon]);
                centrosLista.push([new centroMedico(centro.id, centro.nombre, centro.especialidad, centro.telefono, centro.telefono2, centro.horario,
                centro.pais, centro.provincia, centro.localidad, centro.calle, centro.numero, centro.addPosition(centro.lat, centro.lon))]);
            });
        }

        function cargarMapa(centrosListResponse, self) {
            console.log("callback llamado");
            var centroLayer = L.featureGroup().addTo(map); // es un featureGroup
            // Agregamos el layer al control
            map.layersControl.addOverlay(centroLayer, "Centros Medicos");
            console.log("Añadiendo Centros Medicos al Mapa");
            centrosListResponse.centros.forEach(function(centro) {

                marker = L.marker([centro.coordinate.lat, centro.coordinate.lon]);

                marker.bindPopup("<b>"+centro.nombre+"</b>"+"<br>"+centro.calle + " " + centro.numero).openPopup();
              //  "<b>Hello world!</b><br>I am a popup."
                /*marker.on('click', function() {
                    mostrarDatos(centro);
                });*/
                centroLayer.addLayer(marker);
                centrosLista.push([new centroMedico(centro.id, centro.nombre, centro.especialidad, centro.telefono, centro.telefono2, centro.horario,
                centro.pais, centro.provincia, centro.localidad, centro.calle, centro.numero, centro.addPosition(centro.lat, centro.lon))]);

            });

            self.finishedLoad = true;
        }

        console.log("ejecutando request sobre url: " + url);
        requestJSON(url , cargarMapa, this);

    }

}
