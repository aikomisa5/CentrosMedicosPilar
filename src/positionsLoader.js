  function PositionsLoader(url) {
      this.url = url;
      this.finishedLoad = false;
      var runnersPositions = [];

      // recibe los datos de posiciones a procesar
      this.loadRunnersPositionsTo = function(race) {

          function generarArrayDeRunnersPositions(runnersPositionsData) {

              console.log("generando array de positions:");
              runnersPositionsData.forEach(function(data) {
                  var positionsData = [];

                  data.positions.forEach(function(position) {
                      positionsData.push(new Position(position.lat, position.lon));
                  });

                  var runnerPosition = {
                      id: data.runner,
                      positions: positionsData
                  };
                  console.log(runnerPosition.positions);
                  runnersPositions.push(runnerPosition);
              });
          }

          function cargarRunnersPositions(RunnersPositionsResponse, self) {

              console.log("callback llamado");
              generarArrayDeRunnersPositions(RunnersPositionsResponse.positions);

              console.log("asociando posiciones a corredores");
              runnersPositions.forEach(function(runnerPosition) {
                  race.bindRunnerPosition(runnerPosition);
              });

              self.finishedLoad = true;
          }

          console.log("ejecutando request sobre url: " + url);
          requestJSON(url, cargarRunnersPositions, this);
      }
  }