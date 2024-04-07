import AntColony from "./AntColony.js";

import Ant from "./Ant.js";
import Pheromone from "./Pheromone.js";
import Food from "./Food.js";

export default class WorldMap {
  constructor(params) {
    this.params = params;
    this.width = this.params.getCanvasWidth();
    this.height = this.params.getCanvasHeight();
    this.cellSize = this.params.getCellSize();
    this.grid = [];
    this.colonySites = [];
    this.colonyParams = [
      { x: 400, y: 400, colour: { r: 255, g: 0, b: 0, a: 255 } },
      { x: 200, y: 200, colour: { r: 0, g: 0, b: 0, a: 255 } },
    ];
    this.foodParams = [
        { x: 50, y: 50, amount: 255 },
        { x: 51, y: 50, amount: 255 },
        { x: 52, y: 50, amount: 255 },
        { x: 53, y: 50, amount: 255 },
        { x: 50, y: 51, amount: 255 },
        { x: 50, y: 52, amount: 255 },
        { x: 50, y: 53, amount: 255 },
    ];
    this.init();
  }

  init() {
    this.initializeGrid();
    this.initializeColonies(this.colonyParams);
    this.initializeFood(this.foodParams);
  }

  initializeGrid() {
    for (let x = 0; x < this.params.getCanvasWidth(); x++) {
      this.grid[x] = [];
      for (let y = 0; y < this.params.getCanvasHeight(); y++) {
        this.grid[x][y] = {x: x, y: y};
      }
    }
  }

  initializeColonies(params) {
    params.forEach((element) => {
      this.setColony(element);
    });
  }

  getColony(x, y) {
    const colony = this.grid[x][y].colony ?? null;
    return colony;
  }

  setColony({ x, y, colour }) {
    const colony = new AntColony(this.params, x, y, colour, this.grid);
    this.grid[x][y].colony = colony;
  }

  getAnt(x, y) {
    const ant = this.grid[x][y].ant ?? null;
    return ant;
  }

  setAnt(x, y, colony) {
    const ant = new Ant(colony);
    this.grid[x][y].ant = ant;
  }

  initializeFood(params) {
    params.forEach((element) => {
        this.setFood(element);
      });
  }

  setFood({x, y, amount}) {
    const food = new Food(x, y, amount, this.cellSize, this.grid);
    this.grid[x][y].food = food;
  }

  getFood(x, y) {
    const food = this.grid[x][y].food ?? null;
    return food;
  }
}
