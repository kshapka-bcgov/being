export default class Renderer {
  constructor(canvasId, params) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.params = params;
    this.canvas.width = this.params.getCanvasWidth();
    this.canvas.height = this.params.getCanvasHeight();
    this.antPaths = new Path2D();
    this.bufferCanvas = document.createElement("canvas"); // Create buffer canvas
    this.bufferCtx = this.bufferCanvas.getContext("2d"); // Get buffer canvas context
    this.bufferCanvas.width = this.canvas.width; // Set buffer canvas width
    this.bufferCanvas.height = this.canvas.height; // Set buffer canvas height
  }

  clearCanvas(x1 = 0, y1 = 0, x2 = this.canvas.width, y2 = this.canvas.height) {
    this.ctx.clearRect(x1, y1, x2, y2);
  }

  render(colony) {
    // Render pheromones to buffer canvas
    this.bufferCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    colony.pheromones.forEach((pheromone) => {
      this.renderPheromoneToBuffer(pheromone);
    });

    // Draw buffer canvas to main canvas
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    // Draw ants.
    this.ctx.fillStyle = "black";
    this.antPaths = new Path2D();
    colony.ants.forEach((ant) => {
      this.renderAnt(this.antPaths, ant);
    });
    this.ctx.fill(this.antPaths);
  }

  renderPheromoneToBuffer(pheromone) {
    const opacity = pheromone.intensity;
    this.bufferCtx.fillStyle = `rgba(100, 100, 255, ${opacity})`;
    this.bufferCtx.fillRect(pheromone.x, pheromone.y, pheromone.size, pheromone.size);
  }

  renderAnt(antPaths, ant) {
    antPaths.rect(ant.x, ant.y, ant.size, ant.size);
  }
}
