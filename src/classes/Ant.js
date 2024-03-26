import { calc_distance, randomRadian } from "../utils/Utils.js";

export default class Ant {
  constructor(x, y, colony) {
    this.x = x;
    this.y = y;
    this.colony = colony;
    this.radiansDirection = Math.random() * Math.PI * 2;
    this.confidence = 95;
    this.speed = 1;
    this.size = 5;
    this.pheromone = '';
    this.food = 0;
  }

  update() {
    this.navigate();
    this.move();
  }

  navigate() {
    // Add a bit of adjustable random movement.
    this.radiansDirection += (randomRadian() * (100 - this.confidence)) / 100;

    // Calculate the potential new position based on direction.
    let potentialX = this.x + Math.cos(this.radiansDirection) * this.speed;
    let potentialY = this.y + Math.sin(this.radiansDirection) * this.speed;

    // Turn around to avoid collisions.
    if (this.checkCollision(potentialX, potentialY)) {
      this.radiansDirection += Math.PI / 2;
      this.emitPheromone();
      this.food = 1;
    }
  }

  checkCollision(x, y) {
    const canvasWidth = this.colony.params.getCanvasWidth();
    const canvasHeight = this.colony.params.getCanvasHeight();

    if (
      x >= 0 &&
      x < canvasWidth - this.size &&
      y >= 0 &&
      y < canvasHeight - this.size
    ) {
      return false;
    }
    this.pheromone = 'food';
    return true;
  }

  emitPheromone() {
    this.colony.addPheromone(this.x, this.y, this.size);
  }

  move() {
    const canvasWidth = this.colony.params.getCanvasWidth();
    const canvasHeight = this.colony.params.getCanvasHeight();

    // Calculate the new position based on direction and speed.
    let newX = this.x + Math.cos(this.radiansDirection) * this.speed;
    let newY = this.y + Math.sin(this.radiansDirection) * this.speed;

    // Update the ant's position only if conditions are met.
    if (this.pheromone) {
      this.emitPheromone();
    }

    this.x = newX;
    this.y = newY;
  }
}
