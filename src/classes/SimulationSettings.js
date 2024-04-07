export default class SimulationSettings {
  constructor() {
    this.canvasWidth = 800;
    this.canvasHeight = 600;
    this.numAnts = 1000;
    this.numFoodSources = 5;
    this.pheromoneDecayRate = 5;
    this.pheromoneIntensity = 255;
    this.cellSize = 5;
    this.colonies = [];
  }

  getCanvasWidth() {
    return this.canvasWidth;
  }

  setCanvasWidth(num) {
    this.canvasWidth = num;
  }

  getCanvasHeight() {
    return this.canvasHeight;
  }

  setCanvasHeight(num) {
    this.canvasHeight = num;
  }

  getNumAnts() {
    return this.numAnts;
  }

  setNumAnts(num) {
    this.numAnts = num;
  }

  getNumFoodSources() {
    return this.numFoodSources;
  }

  setNumFoodSources(num) {
    this.numFoodSources = num;
  }

  getPheromoneIntensity() {
    return this.pheromoneIntensity;
  }

  setPheromoneIntensity(num) {
    this.pheromoneIntensity = num;
  }

  getPheromoneDecayRate() {
    return this.pheromoneDecayRate;
  }

  setPheromoneDecayRate(num) {
    this.pheromoneDecayRate = num;
  }

  getCellSize() {
    return this.cellSize;
  }

  setCellSize(num) {
    this.cellSize = num;
  }

  getColonies() {
    return this.colonies;
  }

  setColonies(array) {
    this.colonies = array;
  }
}
