function centrosLoader(url) {
    this.url = url;
    var latlngs = [];
    var centrosLista = [];
    var centroLayer;
    var marker;
    var marcadores = [];
    var resultados = [];
    //var resultados = new Array();
    var indice = 0;
    this.finishedLoad = false;



    this.cargarCentrosPorTipo = function (tipo, map){
      console.log("Inicializando resultados en 0");
      resultados = [];
      this.indice=0;
      marcadores.forEach(function(mark){
        console.log("Borrando marcadores");
        centroLayer.removeLayer(mark);
      });
      //centroLayer = L.featureGroup().addTo(map); // es un featureGroup

        if(centrosLista.length==0){
          console.log("No hay centros cargados!");
        }
        else {
          console.log("Hay centros cargados!");
        }

        centrosLista.forEach(function(cent) {
          var centroMedico = new CentroMedico(cent.id, cent.nombre, cent.especialidad,
                cent.telefono, cent.telefono2, cent.horario, cent.pais, cent.provincia, cent.localidad, cent.calle, cent.numero,
                cent.diasAtencion, cent.tipo
            );
            centroMedico.addPosition(cent.position.lat, cent.position.lon);
            console.log("Datos del Centro: "+centroMedico.showDetails());

            if (centroMedico.especialidad == tipo){

            resultados.push(new Array(centroMedico.nombre, centroMedico.calle + " " + centroMedico.numero, centroMedico.localidad, centroMedico.telefono, "-", centroMedico.diasAtencion + "/" + centroMedico.horario, centroMedico.tipo));

              marker = L.marker([centroMedico.position.lat, centroMedico.position.lon]);

              marker.bindPopup("<b>"+centroMedico.nombre+"</b>"+"<br>"+centroMedico.calle + " " + centroMedico.numero).openPopup();

              centroLayer.addLayer(marker);

              console.log("Guardando nuevo marcador");
              marcadores.push(marker);

              console.log("Existe un centro con esa especialidad");
            }
            else {
              console.log("Uno de los centros no es de la especialidad elegida");
            }
        });
      }

      this.obtenerResultados = function(){
        if (resultados.length != 0){
          console.log("Hay resultados de centros con esa especialidad: Cantidad: " + resultados.length);
        for (i = 0; i < resultados.length; i++) {
            for (j = 0; j < resultados[i].length; j++) {
              console.log(resultados[i][j]);

            }
          }
        }
        else{
          console.log("No hay resultados de centros de esa especialidad!")
        }

        var myTableDiv = document.getElementById("tablaID");
        var table = document.getElementById("tablaCentros");
        var tableBody = document.getElementById("tablaBody");

        //Eliminando filas al momento de generar los datos de la tabla de nuevo
         while(tableBody.rows.length > 0) {
           console.log("Eliminando filas porque se hizo click en boton buscar");
            tableBody.deleteRow(0);
          }
            //TABLE ROWS
            for (i = 0; i < resultados.length; i++) {
              var tr = document.createElement('TR');
              for (j = 0; j < resultados[i].length; j++) {
                  var td = document.createElement('TD')
                  td.appendChild(document.createTextNode(resultados[i][j]));
                  tr.appendChild(td)
              }
              tableBody.appendChild(tr);
          }


      }


    this.loadCentros = function(map) {
        // recibe el listado de centros a procesar
        function generarArrayDeCentrosPositions(centrosList) {
            console.log("Generando array de coordenadas de centros");

            centrosList.forEach(function(centro) {
                console.log("coordenada centro: " + centro.lat + ", " + centro.lon);
                latlngs.push([centro.lat, centro.lon]);
                centrosLista.push([new centroMedico(centro.id, centro.nombre, centro.especialidad, centro.telefono, centro.telefono2, centro.horario,
                centro.pais, centro.provincia, centro.localidad, centro.calle, centro.numero)]);
            });
        }

        function cargarMapa(centrosListResponse, self) {
            console.log("callback llamado");
            centroLayer = L.featureGroup().addTo(map); // es un featureGroup
            // Agregamos el layer al control
            //Sirve para activar y descativar todos los marcadores pertenecientes al layer
            //map.layersControl.addOverlay(centroLayer, "Centros Medicos");
            console.log("Añadiendo Centros Medicos al Mapa");
            centrosListResponse.centros.forEach(function(centro) {
                var centroMedico = new CentroMedico(centro.id, centro.nombre, centro.especialidad, centro.telefono, centro.telefono2, centro.horario,
                centro.pais, centro.provincia, centro.localidad, centro.calle, centro.numero);
                centroMedico.addPosition(centro.coordinate.lat, centro.coordinate.lon);
                marker = L.marker([centro.coordinate.lat, centro.coordinate.lon]);

                marker.bindPopup("<b>"+centro.nombre+"</b>"+"<br>"+centro.calle + " " + centro.numero).openPopup();

                centroLayer.addLayer(marker);
                marcadores.push(marker);
                centrosLista.push(centroMedico);
                console.log(centroMedico.showDetails());
            });

            self.finishedLoad = true;
        }

        console.log("Ejecutando request sobre url: " + url);
        requestJSON(url , cargarMapa, this);

    }

}
