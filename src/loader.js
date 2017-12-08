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

    var centrosMedicosSource = "https://raw.githubusercontent.com/aikomisa5/CentrosMedicosPilar/master/centrosPilar.json";

    // Creación del componente mapa de Leaflet.
    var map = L.map("mapid").setView([-34.458431, -58.914743], 12); // no se declara var para que sea global a todas las clases.

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
     var options = centroMedicoLoader.cargarCombo1();

      options.forEach( (option) => optionList.add( new Option(option.text, option.value, option.selected ) ));

      var optionList2 = document.getElementById('rec_mode2').options;
      var options2 = centroMedicoLoader.cargarCombo2();

       options2.forEach( (option) => optionList2.add( new Option(option.text, option.value, option.selected ) ));

       var optionList3 = document.getElementById('rec_mode3').options;
       var options3 = centroMedicoLoader.cargarCombo3();
        options3.forEach( (option) => optionList3.add( new Option(option.text, option.value, option.selected ) ));

        var optionList4 = document.getElementById('tipoCentroSalud').options;
        var options4 = centroMedicoLoader.cargarCombo4();

         options4.forEach( (option) => optionList4.add( new Option(option.text, option.value, option.selected ) ));

         var optionListColectivos = document.getElementById('comboColectivos').options;
         var optionsLineas = centroMedicoLoader.cargarComboColectivos();

         optionsLineas.forEach ( (option) => optionListColectivos.add (new Option (option.text, option.value, option.selected) ));

    $(document).ready(function() { // si se termino de cargar todo el html
        $("#myBtn").click(function() {
            if (cargaFinalizada()) {
              var valorTipo = obtenerValorDeCombo();
              var valorTipoCentro = $( "#tipoCentroSalud option:selected" ).text();
                centroMedicoLoader.cargarCentrosPorTipo(valorTipo, valorTipoCentro, map);
                centroMedicoLoader.obtenerResultados();
                if (centroMedicoLoader.seEncontraronResultados() == true){
                  var alertaOkey = "<div class=\"alert alert-success alert-dismissable fade in\">" +
                  "\<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times\;</a>"+
                  "<strong></strong> Se han encontrado centros de salud con esas características!</div>";
                  $("#aviso").append(alertaOkey).show(500);
                }
                else{
                  var alerta = "<div class=\"alert alert-danger alert-dismissable fade in\">" +
                  "\<a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times\;</a>" +
                  "<strong></strong> No se han encontrado centros de salud con esas características, lo siento.</div>";
                  $("#aviso").append(alerta).show(500);
                }
            } else {
                console.log("carga incompleta");
          }
        });
    });

    $(document).ready(function() { // si se termino de cargar todo el html
        $("#btnColectivo").click(function() {
              var valorLinea = obtenerValorDeLineaColectivo();
              centroMedicoLoader.obtenerDatosColectivo(valorLinea);
          });
        });

    $(document).ready(function() { // si se termino de cargar todo el html
        $("#rec_mode").click(function() {
            for (var i = 0, l = optionList2.length; i < l; i++) {
                optionList2[i].selected = optionList2[i].defaultSelected;
            }
            for (var i = 0, l = optionList3.length; i < l; i++) {
                optionList3[i].selected = optionList3[i].defaultSelected;
            }
                console.log("Presionaste el combo de especialidad clínica");

        });
    });

    $(document).ready(function() { // si se termino de cargar todo el html
        $("#rec_mode2").click(function() {
            for (var i = 0, l = optionList.length; i < l; i++) {
                optionList[i].selected = optionList[i].defaultSelected;
            }
            for (var i = 0, l = optionList3.length; i < l; i++) {
                optionList3[i].selected = optionList3[i].defaultSelected;
            }
                console.log("Presionaste el combo de especialidades quirúrgicas");

        });
    });

    $(document).ready(function() { // si se termino de cargar todo el html
        $("#rec_mode3").click(function() {
            for (var i = 0, l = optionList.length; i < l; i++) {
                optionList[i].selected = optionList[i].defaultSelected;
            }
            for (var i = 0, l = optionList2.length; i < l; i++) {
                optionList2[i].selected = optionList2[i].defaultSelected;
            }
                console.log("Presionaste el combo de especialidades médico-quirúrgicas");

        });
    });

    //determina si la carga de los datos finalizo o no.
    function cargaFinalizada() {
        return centroMedicoLoader.finishedLoad;
    }

    function obtenerValorDeCombo(){
      var valor1 = $( "#rec_mode option:selected" ).text();
      var valor2 = $( "#rec_mode2 option:selected" ).text();
      var valor3 = $( "#rec_mode3 option:selected" ).text();

      if (valor1 != "Seleccione.."){
        return valor1;
      }
      else if (valor2 != "Seleccione.."){
        return valor2;
      }
      else if (valor3 != "Seleccione.."){
        return valor3;
      }
      else {
        return "Seleccione..";
      }
    }

    function obtenerValorDeLineaColectivo(){
      var valor1 = $( "#comboColectivos option:selected" ).text();

      if (valor1 != "Seleccione.."){
        return valor1;
      }
      else {
        return "Seleccione..";
      }
    }
}

$(bootstrap);
