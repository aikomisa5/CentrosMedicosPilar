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
      var options = [
        {
          "text"  : "Seleccione..",
          "value" : "Seleccione",
          "selected" : true
        },
        {
          "text"  : "Alergología",
          "value" : "Alergología"
        },
        {
          "text"  : "Anestesiología y reanimación",
          "value" : "Anestesiología y reanimación",
        },
        {
          "text"  : "Cardiología",
          "value" : "Cardiología",
        },
        {
          "text"  : "Gastroenterología",
          "value" : "Gastroenterología",
        },
        {
          "text"  : "Endocrinología",
          "value" : "Endocrinología",
        },
        {
          "text"  : "Geriatría",
          "value" : "Geriatría",
        },
        {
          "text"  : "Hematología y hemoterapia",
          "value" : "Hematología y hemoterapia",
        },
        {
          "text"  : "Infectología",
          "value" : "Infectología",
        },
        {
          "text"  : "Nefrología",
          "value" : "Nefrología",
        },
        {
          "text"  : "Neumología",
          "value" : "Neumología",
        },
        {
          "text"  : "Neurología",
          "value" : "Neurología",
        },
        {
          "text"  : "Nutriología",
          "value" : "Nutriología",
        },
        {
          "text"  : "Oftalmología",
          "value" : "Oftalmología",
        },
        {
          "text"  : "Oncología médica",
          "value" : "Oncología médica",
        },
        {
          "text"  : "Oncología radioterápica",
          "value" : "Oncología radioterápica",
        },
        {
          "text"  : "Pediatría",
          "value" : "Pediatría",
        },
        {
          "text"  : "Psiquiatría",
          "value" : "Psiquiatría",
        },
        {
          "text"  : "Rehabilitación",
          "value" : "Rehabilitación",
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

      var optionList2 = document.getElementById('rec_mode2').options;
       var options2 = [
         {
           "text"  : "Seleccione..",
           "value" : "Seleccione",
           "selected" : true
         },
         {
           "text"  : "Cirugía cardiovascular",
           "value" : "Cirugía cardiovascular"
         },
         {
           "text"  : "Cirugía general y del aparato digestivo",
           "value" : "Cirugía general y del aparato digestivo",
         },
         {
           "text"  : "Cirugía oral y maxilofacial",
           "value" : "Cirugía oral y maxilofacial",
         },
         {
           "text"  : "Cirugía ortopédica y traumatología",
           "value" : "Cirugía ortopédica y traumatología",
         },
         {
           "text"  : "Cirugía pediátrica",
           "value" : "Cirugía pediátrica",
         },
         {
           "text"  : "Cirugía plástica, estética y reparadora",
           "value" : "Cirugía plástica, estética y reparadora",
         },
         {
           "text"  : "Cirugía torácica",
           "value" : "Cirugía torácica",
         },
         {
           "text"  : "Neurocirugía",
           "value" : "Neurocirugía",
         },
         {
           "text"  : "Proctología",
           "value" : "Proctología"
         }
       ];

       options2.forEach( (option) => optionList2.add( new Option(option.text, option.value, option.selected ) ));

       var optionList3 = document.getElementById('rec_mode3').options;
        var options3 = [
          {
            "text"  : "Seleccione..",
            "value" : "Seleccione",
            "selected" : true
          },
          {
            "text"  : "Angiología y cirugía vascular",
            "value" : "Angiología y cirugía vascular"
          },
          {
            "text"  : "Dermatología médico-quirúrgica y venereología",
            "value" : "Dermatología médico-quirúrgica y venereología",
          },
          {
            "text"  : "Odontología",
            "value" : "Odontología",
          },
          {
            "text"  : "Ginecología y obstetricia o tocología",
            "value" : "Ginecología y obstetricia o tocología",
          },
          {
            "text"  : "Oftalmología",
            "value" : "Oftalmología",
          },
          {
            "text"  : "Otorrinolaringología",
            "value" : "Otorrinolaringología",
          },
          {
            "text"  : "Urología",
            "value" : "Urología",
          },
          {
            "text"  : "Traumatología",
            "value" : "Traumatología"
          }
        ];

        options3.forEach( (option) => optionList3.add( new Option(option.text, option.value, option.selected ) ));

        var optionList4 = document.getElementById('tipoCentroSalud').options;
         var options4 = [
           {
             "text"  : "Seleccione..",
             "value" : "Seleccione",
             "selected" : true
           },
           {
             "text"  : "Público",
             "value" : "Público",
           },
           {
             "text"  : "Privado",
             "value" : "Privado"
           }
         ];

         options4.forEach( (option) => optionList4.add( new Option(option.text, option.value, option.selected ) ));


    $(document).ready(function() { // si se termino de cargar todo el html
        $("#myBtn").click(function() {
            if (cargaFinalizada()) {
              var valorTipo = obtenerValorDeCombo();
              var valorTipoCentro = $( "#tipoCentroSalud option:selected" ).text();
                centroMedicoLoader.cargarCentrosPorTipo(valorTipo, valorTipoCentro, map);
                centroMedicoLoader.obtenerResultados();
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
}

$(bootstrap);
