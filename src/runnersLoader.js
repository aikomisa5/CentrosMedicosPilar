  function RunnersLoader(url) {
      this.url = url;
      this.finishedLoad = false;

      var runners = [];
      this.loadRunnersTo = function(race, positionsLoader) {

          // recibe los runners a procesar
          function generarArrayDeRunners(runnersData) {
              console.log("generando array de runners:");
              runnersData.forEach(function(runnerData) {
                  // creamos un objeto runner porque el mismo tiene comportamiento que no viene en el json.
                  var runner = new Runner(runnerData.id,
                      runnerData.name,
                      runnerData.surname,
                      runnerData.sponsor,
                      runnerData.surname
                  );
                  console.log(runner.showDetails());
                  runners.push(runner);
              });
          }

          function cargarRunners(runnersResponse, self) {
              console.log("callback llamado");
              generarArrayDeRunners(runnersResponse.runners);

              console.log("añadiendo runners a carrera");
              runners.forEach(function(runner) {
                  race.addRunner(runner);
                  console.log(runner.showDetails() + " añadido");
              });

              // Se llama al siguiente loader para que asocie las posiciones a los corredores.
              console.log("loadPositions");
              positionsLoader.loadRunnersPositionsTo(race);
              // Se carga la lista de corredores en el documento html.
              race.loadListOfRunners();
              self.finishedLoad = true;
          }

          console.log("ejecutando request sobre url: " + url);
          requestJSON(url, cargarRunners, this);

      }
  }