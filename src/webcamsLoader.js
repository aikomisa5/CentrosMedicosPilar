  function WemcamsLoader(url, trackID) {
      this.url = url;
      this.trackID = trackID;
      var latlngs = [];
      this.finishedLoad = false;

      this.loadWebcams = function(map) {
          //modifica el html para mostrar la info de la camara
          function mostrarDatos(webcam) {
              webcam = "<h3 > Webcam " +
                  webcam.id +
                  "<small> Frecuencia: " +
                  webcam.frecuency +
                  "</small>" +
                  "</h3>";
              $("#webcam").hide();
              $("#webcam").empty();
              $("#webcam").append(webcam);
              $("#webcam").show(500);
          }

          // recibe el listado de webcams a procesar
          function generarArrayDeWebcamPositions(webcamList) {
              console.log("generando array de coordenadas de webcams:  track " + track.id);

              webcamList.forEach(function(webcam) {
                  console.log("coordenada: " + webcam.lat + ", " + webcam.lon);
                  latlngs.push([webcam.lat, webcam.lon]);
              });
          }

          function cargarMapa(webcamListResponse, self) {
              console.log("callback llamado");
              var webCamLayer = L.featureGroup().addTo(map); // es un featureGroup        
              // Agregamos el layer al control
              map.layersControl.addOverlay(webCamLayer, "WebCams");
              console.log("añadiendo webcams a mapa");
              webcamListResponse.webcams.forEach(function(webcam) {

                  marker = L.circleMarker([webcam.coordinate.lat, webcam.coordinate.lon], {
                      radius: 5,
                      fillColor: "red",
                      color: "red",
                      weight: 1,
                      opacity: 1,
                      fillOpacity: 1
                  });

                  marker.on('click', function() {
                      mostrarDatos(webcam);
                  });
                  webCamLayer.addLayer(marker);

              });

              self.finishedLoad = true;
          }

          console.log("ejecutando request sobre url: " + url + trackID);
          requestJSON(url + trackID, cargarMapa, this);

      }

  }