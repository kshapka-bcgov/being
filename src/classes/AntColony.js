import Ant from "./Ant.js";
import Pheromone from "./Pheromone.js";

export default class AntColony {
  constructor(params) {
    this.params = params;
    this.x = this.params.getCanvasWidth() / 2;
    this.y = this.params.getCanvasHeight() / 2;
    this.ants = [];
    this.pheromones = [];
    this.initializeAnts();
    this.initializePheromones();
  }

  initializeAnts() {
    for (let i = 0; i < this.params.getNumAnts(); i++) {
      const ant = new Ant(this.x, this.y, this);
      this.ants.push(ant);
    }
  }

  initializePheromones() {
    for (let x = 0; x < this.params.getCanvasWidth(); x++) {
      this.pheromones[x] = [];
      for (let y = 0; y < this.params.getCanvasHeight(); y++) {
        this.pheromones[x][y] = new Pheromone(
          x,
          y,
          0,
          this.params.getPheromoneDecayRate(),
          this.params.getCellSize()
        );
      }
    }
  }

  getPheromone(x, y) {
    return this.pheromones[x][y];
  }

  setPheromone(x, y, intensity) {
    this.pheromones[Math.round(x)][Math.round(y)].intensity = intensity;
  }

  update() {
    this.updateAnts();
    this.updatePheromones();
  }

  updateAnts() {
    this.ants.forEach((ant) => {
      ant.update();
    });
  }

  updatePheromones() {
    for(let x = 0; x < this.pheromones.length; x++) {
      let column = this.pheromones[x];
      for(let y = 0; y < column.length; y++) {
        this.pheromones[x][y].update();
      }
    }
  }

}
