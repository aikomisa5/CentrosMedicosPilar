// 	ejecuta la request http llamando a esa funcion requestJSON (ajax) y despues carga las coordenadas de cicuito en el mapa
function TrackLoader(url, trackID) {
    this.url = url;
    this.trackID = trackID;
    var latlngs = [];
    this.finishedLoad = false;

    this.loadTrack = function(map) {

        // recibe el track a procesar
        function generarArrayDeTrackPositions(track) {
            console.log("generando array de coordenadas de mapa: " + track.id);
            track.coordinates.forEach(function(coordinate) {
                console.log("coordenada: " + coordinate);
                latlngs.push(coordinate);
            });
        }

        //es la funcion callback que procesa el json y dibuja en el mapa
        //las coordenadas recibidas.
        function cargarMapa(trackResponse, self) {
            console.log("callback llamado");
            generarArrayDeTrackPositions(trackResponse.track);

            console.log("añadiendo circuito a mapa");
            var circuito = L.polyline(latlngs, {
                color: '#4088ff',
                weight: "10"
            }).addTo(map);
            // zoom the map to the polygon
            map.fitBounds(circuito.getBounds());

            self.finishedLoad = true;
        }

        console.log("ejecutando request sobre url: " + url + trackID);
        // se ejecuta la request http para cargar las coordenadas del circuito.
        requestJSON(url + trackID, cargarMapa, this);
    }
}