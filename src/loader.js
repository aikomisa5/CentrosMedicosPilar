//Este modulo inicializa el mapa y pone en marcha la carrera.
function bootstrap() {

    // ejecuta un http request al server y cuando la respuesta es OK, ejecuta un
    // callback sobre los datos recibidos.
    requestJSON = function(url, callback, caller) { // no se declara var para que sea global a todas las clases
        var xhttp;
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { // Maxi: sigo sin saber por que ese 4 y 200 jaja
                console.log("Request status " + this.statusText);
                console.log("llamando funcion callback: " + callback);
                callback(JSON.parse(this.responseText), caller);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    var trackSource = "https://fastspeedster.herokuapp.com/api/tracks/";
    var runnersSource = "https://api.myjson.com/bins/14m1xf";
    //var runnersSource = "https://fastspeedster.herokuapp.com/api/runners/";
    var positionsSource = "https://fastspeedster.herokuapp.com/api/positions/";
    //var webcamsSource = "https://fastspeedster.herokuapp.com/api/webcams/"; // este es solo la camara 42 no?¿

    var centrosMedicosSource = "https://raw.githubusercontent.com/aikomisa5/TPIngenieria/master/centrosPilar.json";

    // Creación del componente mapa de Leaflet.
    var map = L.map("mapid").setView([-34.458431, -58.914743], 14); // no se declara var para que sea global a todas las clases.

    // Agregamos los Layers de OpenStreetMap.
    var baseLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        /* aca se carga el mapa de openStreetMap en LEAFLET ->>> L = objeto de leaflet*/
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Agregamos el control para seleccionar Layers al mapa
    var layersControl = L.control.layers({
        "Base": baseLayer
    });
    layersControl.addTo(map);

    map.layersControl = layersControl; // aca se setea como controlador de capas que se muestran en el mapa al objeto "layersControl":

    console.log("cargando centros");
    var centroMedicoLoader = new centrosLoader(centrosMedicosSource);
     centroMedicoLoader.loadCentros(map);


     var optionList = document.getElementById('rec_mode').options;
      var options = [
        {
          "text"  : "Seleccione..",
          "value" : "Seleccione",
          "selected" : true
        },
        {
          "text"  : "Pediatría",
          "value" : "Pediatría"
        },
        {
          "text"  : "Psicología",
          "value" : "Psicología",
        },
        {
          "text"  : "Odontología",
          "value" : "Odontología",
        },
        {
          "text"  : "Cardiología",
          "value" : "Cardiología",
        },
        {
          "text"  : "Ginecología",
          "value" : "Ginecología",
        },
        {
          "text"  : "Neurología",
          "value" : "Neurología",
        },
        {
          "text"  : "Nutrición",
          "value" : "Nutrición",
        },
        {
          "text"  : "Reumatología",
          "value" : "Reumatología",
        },
        {
          "text"  : "Toxicología",
          "value" : "Toxicología",
        },
        {
          "text"  : "Urología",
          "value" : "Urología"
        }
      ];

      options.forEach( (option) => optionList.add( new Option(option.text, option.value, option.selected ) ));


/*
    $("#runners").hide();
    console.log("creando Trackloader");
    var trackLoader = new TrackLoader(trackSource, 42);

    console.log("loadTrack");
    trackLoader.loadTrack(map);

    console.log("creando WebcamsLoader");
    var webcamsLoader = new WemcamsLoader(webcamsSource, 42);

    console.log("loadWebCams");
    webcamsLoader.loadWebcams(map);

    console.log("creando Race");
    var race1K = new Race("1K", map);

    console.log("creando Runnersloader");
    var runnersLoader = new RunnersLoader(runnersSource);

    console.log("creando Positionsloader");
    var positionsLoader = new PositionsLoader(positionsSource);

    console.log("loadRunners");
    runnersLoader.loadRunnersTo(race1K, positionsLoader);
*/
    $(document).ready(function() { // si se termino de cargar todo el html
        $("#myBtn").click(function() {
            if (cargaFinalizada()) {
              var valorTipo = $( "#rec_mode option:selected" ).text();
                centroMedicoLoader.cargarCentrosPorTipo(valorTipo, map);
                //$("#runners").show(500);
            } else {
                console.log("carga incompleta");
                // un warning de bootstrap para indicar que la carga no ha finalizado /
                var alert = "<div class=\"alert alert-warning alert-dismissable\">" +
                    "\<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">×</a>" +
                    "<strong>Atención!</strong> No se han cargado todos los elementos en el mapa.</div>";
                $("#aviso").append(alert).show(500); //y aca le decimos a jquery que lo cargue en el html

            }
        });
    });

    //determina si la carga de los datos finalizo o no.
    function cargaFinalizada() {
        return centroMedicoLoader.finishedLoad;
    }
}

$(bootstrap);
