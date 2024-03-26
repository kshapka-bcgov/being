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
  }

  initializeAnts() {
    for (let i = 0; i < this.params.getNumAnts(); i++) {
      const ant = new Ant(this.x, this.y, this);
      this.ants.push(ant);
    }
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

  addPheromone(x, y, size) {
    const pheromone = new Pheromone(
      x,
      y,
      1,
      this.params.getPheromoneDecayRate(),
      size
    );
    this.pheromones.push(pheromone);
  }

  updatePheromones() {
    this.cleanUpPheromones();
    
    this.pheromones.forEach((pheromone) => {
      pheromone.update();
    });
  }

  cleanUpPheromones(){
    this.pheromones = this.pheromones.filter(
        (pheromone) => pheromone.intensity > 0
      );
    console.log(this.pheromones.length);
  }
}
