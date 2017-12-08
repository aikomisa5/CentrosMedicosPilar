function centrosLoader(url) {
    this.url = url;
    var latlngs = [];
    var centrosLista = [];
    var centroLayer;
    var marker;
    var marcadores = [];
    var resultados = [];
    var estado;
    //var resultados = new Array();
    var indice = 0;
    this.finishedLoad = false;



    this.cargarCentrosPorTipo = function (tipo, tipoCentro, map){
      console.log("Inicializando resultados en 0");
      resultados = [];
      estado=false;
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

            if (tipoCentro != "Seleccione.."){
            if (centroMedico.especialidad == tipo && centroMedico.tipo == tipoCentro){
              console.log("SOY IF 1");

            resultados.push(new Array(centroMedico.nombre, centroMedico.calle + " " + centroMedico.numero, centroMedico.localidad, centroMedico.telefono, "-", centroMedico.diasAtencion + "/" + centroMedico.horario, centroMedico.tipo));

              marker = L.marker([centroMedico.position.lat, centroMedico.position.lon]);

              marker.bindPopup("<b>"+centroMedico.nombre+"</b>"+"<br>"+"Dirección: "+centroMedico.calle + " " + centroMedico.numero + " | " + "Localidad: " + centroMedico.localidad + " | " + "Tel: " + centroMedico.telefono + " | " + "Día y Horario At.: " + centroMedico.diasAtencion + " / "
              +  centroMedico.horario + " | " + "Tipo Centro: "+ centroMedico.tipo).openPopup();

              centroLayer.addLayer(marker);

              console.log("Guardando nuevo marcador");
              marcadores.push(marker);

              console.log("Existe un centro con esa especialidad");
            }
          }
          if (tipo == "Seleccione.."){
           if (centroMedico.tipo == tipoCentro){
            console.log("SOY IF 2");
            resultados.push(new Array(centroMedico.nombre, centroMedico.calle + " " + centroMedico.numero, centroMedico.localidad, centroMedico.telefono, "-", centroMedico.diasAtencion + "/" + centroMedico.horario, centroMedico.tipo));

              marker = L.marker([centroMedico.position.lat, centroMedico.position.lon]);

              marker.bindPopup("<b>"+centroMedico.nombre+"</b>"+"<br>"+"Dirección: "+centroMedico.calle + " " + centroMedico.numero + " | " + "Localidad: " + centroMedico.localidad + " | " + "Tel: " + centroMedico.telefono + " | " + "Día y Horario At.: " + centroMedico.diasAtencion + " / "
              +  centroMedico.horario + " | " + "Tipo Centro: "+ centroMedico.tipo).openPopup();

              centroLayer.addLayer(marker);

              console.log("Guardando nuevo marcador");
              marcadores.push(marker);

              console.log("Existe un centro con esa especialidad");
          }
        }
          if (tipoCentro == "Seleccione.."){
            if (centroMedico.especialidad == tipo){
            console.log("SOY IF 3");
            resultados.push(new Array(centroMedico.nombre, centroMedico.calle + " " + centroMedico.numero, centroMedico.localidad, centroMedico.telefono, "-", centroMedico.diasAtencion + "/" + centroMedico.horario, centroMedico.tipo));

              marker = L.marker([centroMedico.position.lat, centroMedico.position.lon]);

              marker.bindPopup("<b>"+centroMedico.nombre+"</b>"+"<br>"+"Dirección: "+centroMedico.calle + " " + centroMedico.numero + " | " + "Localidad: " + centroMedico.localidad + " | " + "Tel: " + centroMedico.telefono + " | " + "Día y Horario At.: " + centroMedico.diasAtencion + " / "
              +  centroMedico.horario + " | " + "Tipo Centro: "+ centroMedico.tipo).openPopup();

                  centroLayer.addLayer(marker);

              console.log("Guardando nuevo marcador");
              marcadores.push(marker);

              console.log("Existe un centro con esa especialidad");
            }
          }
            else {
              console.log("Uno de los centros no es de la especialidad elegida");
            }
        });
      }

      this.obtenerResultados = function(){
        if (resultados.length != 0){
          estado=true;
          console.log("Hay resultados de centros con esa especialidad: Cantidad: " + resultados.length);
        for (i = 0; i < resultados.length; i++) {
            for (j = 0; j < resultados[i].length; j++) {
              console.log(resultados[i][j]);

            }
          }
        }
        else{
          estado=false;
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

           $('#aviso').children('.alert:first-child').remove();


      }

      this.seEncontraronResultados = function(){
        return estado;
      }

      this.cargarCombo1= function(){
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
        return options;
      }

      this.cargarCombo2 = function(){
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
        return options2;
      }

      this.cargarCombo3 = function(){
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
        return options3;
      }

      this.cargarCombo4 = function(){
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
        return options4;
      }

      this.cargarComboColectivos = function(){
        var options5 = [
          {
            "text"  : "Seleccione..",
            "value" : "Seleccione",
            "selected" : true
          },
          {
            "text"  : "57",
            "value" : "57",
          },
          {
            "text"  : "501",
            "value" : "501",
          },
          {
            "text"  : "503",
            "value" : "503",
          },
          {
            "text"  : "506",
            "value" : "506",
          },
          {
            "text"  : "509",
            "value" : "509",
          },
          {
            "text"  : "510",
            "value" : "510",
          },
          {
            "text"  : "511",
            "value" : "511",
          },
          {
            "text"  : "520",
            "value" : "520"
          }
        ];
        return options5;
      }

      this.obtenerDatosColectivo = function(nombreColectivo){
        var lineaElegida = nombreColectivo;
        var tituloLinea = "<h2 class = \"tituloLineaMap\" id=\"fuente2\">Mapa de la línea de colectivo elegida</h2><hr>";
        //remueve el frame del mapa de la línea de colectivo elegida, porque si no se generan frames infinitos
        $("iframe").remove(".mapaLinea");

        $("h2").remove(".tituloLineaMap");

        console.log("LA LINEA ELEGIDA ES: " + nombreColectivo);

        if (lineaElegida != "Seleccione.."){
            $("#tituloMapaLinea").append(tituloLinea).show(500);
        if (lineaElegida == "57"){
          var m = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=1eqKHZ0yOsZbCU8T8hpVsAZBBAYI\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(m).show(500);
        }
        else if (lineaElegida == "501"){
          var n = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=1j4E6V3ozZovkqwRS0uh6p9bNfJ8\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(n).show(500);
        }
        else if (lineaElegida == "503"){
          var m = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=1DIzCNtJeTY8LZGAgbAoj0Y3-m0w\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(m).show(500);
        }
        else if (lineaElegida == "506"){
          var m = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=11CsP_Sy-SLqlQrsqGN1_MqSJKtY\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(m).show(500);
        }
        else if (lineaElegida == "509"){
          var m = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=1myhCLCiFZXDdssYXy7_DTq0ZzGc\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(m).show(500);
        }
        else if (lineaElegida == "510"){
          var m = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=1fi1Uzp4iqUehEXukaXPHIoyESCI\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(m).show(500);
        }
        else if (lineaElegida == "511"){
          var m = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=1P-rBnxLSw7bCyZZ3GTkKnx_nPVk\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(m).show(500);
        }
        else if (lineaElegida == "520"){
          var m = "<iframe class=\"mapaLinea\" src=\"https://www.google.com/maps/d/embed?mid=12yY1uVULxJ_pfAfCIVSd1CWO6Qk\" id=\"mapaCol\"></iframe>";
          $("#mapaColl").append(m).show(500);
        }
      }

        else{
          console.log("Elegiste la opción por defecto: Seleccione..");
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
                centro.pais, centro.provincia, centro.localidad, centro.calle, centro.numero, centro.diasAtencion,centro.tipo)]);
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
                centro.pais, centro.provincia, centro.localidad, centro.calle, centro.numero,centro.diasAtencion,centro.tipo);
                centroMedico.addPosition(centro.coordinate.lat, centro.coordinate.lon);
                marker = L.marker([centro.coordinate.lat, centro.coordinate.lon]);

                marker.bindPopup("<b>"+centroMedico.nombre+"</b>"+"<br>"+"Dirección: "+centroMedico.calle + " " + centroMedico.numero + " | " + "Localidad: " + centroMedico.localidad + " | " + "Tel: " + centroMedico.telefono + " | " + "Día y Horario At.: " + centroMedico.diasAtencion + " / "
                +  centroMedico.horario + " | " + "Tipo Centro: "+ centroMedico.tipo).openPopup();
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
