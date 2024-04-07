import { calc_distance_to_nest, randomRadian } from "../utils/Utils.js";

export default class Ant {
  constructor(colony) {
    this.x = colony.x;
    this.y = colony.y;
    this.colony = colony;
    this.grid = colony.grid;
    this.radiansDirection = Math.random() * Math.PI * 2;
    this.confidence = 95;
    this.speed = 2;
    this.size = this.colony.params.getCellSize();
    this.pheromone = "";
    this.food = 0;
    this.capacity = 50;
    this.colour = colony.colour;
    this.init();
  }

  init() {
    const { x, y } = this.getPosition();
    this.grid[x][y].ant = this;
  }

  getColour() {
    return this.colour;
  }

  update() {
    this.navigate();
    this.move();
  }

  navigate() {
    // If you have food, go straight home while leaving a pheromone trail.
    if ("food" === this.pheromone) {
      this.emitPheromone();
      this.goHome();
    } else {
      this.search();
    }

    // Add a bit of adjustable random movement.
    this.radiansDirection += (randomRadian() * (100 - this.confidence)) / 100;

    // Calculate the potential new position based on direction.
    let potentialX = this.x + Math.cos(this.radiansDirection) * this.speed;
    let potentialY = this.y + Math.sin(this.radiansDirection) * this.speed;

    // Turn around to avoid collisions.
    if (this.checkForCollision(potentialX, potentialY)) {
      this.radiansDirection += Math.PI / 2;
    }
  }

  search() {
    let dir = this.radiansDirection;
    let targetX, targetY, targetAngle;

    const frontLeft = {
      dx: -Math.cos(dir + Math.PI / 4),
      dy: -Math.sin(dir + Math.PI / 4),
    };
    const frontCenter = {
      dx: -Math.cos(dir),
      dy: -Math.sin(dir),
    };
    const frontRight = {
      dx: -Math.cos(dir - Math.PI / 4),
      dy: -Math.sin(dir - Math.PI / 4),
    };

    const offsets = [frontLeft, frontCenter, frontRight];

    // Iterate over the offsets to search cells in specified directions
    for (const offset of offsets) {
      const dx = Math.round(offset.dx * this.size);
      const dy = Math.round(offset.dy * this.size);

      // Calculate coordinates of the cell in the specified direction
      targetX = this.x + dx;
      targetY = this.y + dy;

      if (!this.checkForCollision(targetX, targetY)) {
        const cell = this.grid[targetX][targetY];

        // Perform search operation on the cell
        if (cell?.food?.amount) {
          targetAngle = Math.atan2(targetY - this.y, targetX - this.x);
          break;
        }
      }
    }

    if (targetAngle !== undefined) {
      this.radiansDirection = targetAngle;
    }
  }

  goHome() {
    let angleToColony = Math.atan2(
      this.colony.y - this.y,
      this.colony.x - this.x
    );
    let angleDifference = angleToColony - this.radiansDirection;
    this.radiansDirection += angleDifference;
  }

  checkForCollision(x, y) {
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
    return true;
  }

  emitPheromone() {
    //
  }

  move() {
    // Calculate the new position based on direction and speed.
    let newX = this.x + Math.cos(this.radiansDirection) * this.speed;
    let newY = this.y + Math.sin(this.radiansDirection) * this.speed;

    // Check boundary conditions.
    const canvasWidth = this.colony.params.getCanvasWidth();
    const canvasHeight = this.colony.params.getCanvasHeight();

    // Move the ant.
    if (!this.checkForCollision(newX, newY)) {
      this.setPosition(newX, newY);
    }

    // Pick up any food you find (if you have room for it) and leave a trail.
    let food = this.grid[this.x][this.y].food;
    if (food?.amount && this.food < this.capacity) {
      // Pick up the food.
      const amount = Math.min(food.amount, this.capacity);
      this.food += amount;
      food.amount -= amount;
      this.pheromone = "food";
      //console.log(this.grid[this.x][this.y].food?.amount);
    }

    if (
      Math.abs(this.x - this.colony.x) < this.size &&
      Math.abs(this.y - this.colony.y) < this.size
    ) {
      this.food = 0;
      this.pheromone = "";
    }
  }

  checkBounds(newX, newY) {}

  getPosition() {
    // Round for grid indexing.
    const x = Math.round(this.x);
    const y = Math.round(this.y);

    return { x, y };
  }

  setPosition(newX, newY) {
    // Remove the ant from the old grid position.
    const { x, y } = this.getPosition();
    this.grid[x][y].ant = null;

    // Round for grid indexing.
    this.x = Math.round(newX);
    this.y = Math.round(newY);

    // Add the ant to the new grid position.
    this.grid[this.x][this.y].ant = this;
  }
}
