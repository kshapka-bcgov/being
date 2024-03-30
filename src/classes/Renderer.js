export default class Renderer {
  constructor(canvasId, params) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.params = params;
    this.canvas.width = this.params.getCanvasWidth();
    this.canvas.height = this.params.getCanvasHeight();

    this.bufferCanvas = document.createElement("canvas"); // Create buffer canvas
    this.bufferCtx = this.bufferCanvas.getContext("2d"); // Get buffer canvas context
    this.bufferCanvas.width = this.canvas.width; // Set buffer canvas width
    this.bufferCanvas.height = this.canvas.height; // Set buffer canvas height
    this.bufferImageData = this.bufferCtx.createImageData(
      this.canvas.width,
      this.canvas.height
    ); // Initialize buffer image data
  }

  clearCanvas(x1 = 0, y1 = 0, x2 = this.canvas.width, y2 = this.canvas.height) {
    this.ctx.clearRect(x1, y1, x2, y2);
    this.bufferCtx.clearRect(x1, y1, x2, y2);
  }

  render(colony) {
    // Define canvas and context
    const ctx = this.canvas.getContext("2d");

    // Get the entire canvas image data
    const imageData = ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    for(let x = 0; x < colony.pheromones.length; x++) {
      let column = colony.pheromones[x];
      for(let y = 0; y < column.length; y++) {
        this.renderPheromone(colony.pheromones[x][y], imageData);
      }
    }

    colony.ants.forEach((ant)=>this.renderAnt(ant,imageData));


    // Put the modified image data back onto the canvas
    ctx.putImageData(imageData, 0, 0);
  }

  renderAnt(ant, imageData) {
    const color = { r: 0, g: 0, b: 0, a: 255 };
      // Draw the rectangle onto the image data
      for (let dy = 0; dy < ant.size; dy++) {
        for (let dx = 0; dx < ant.size; dx++) {
          const index = ((Math.round(ant.y) + dy) * this.canvas.width + (Math.round(ant.x) + dx)) * 4;
          imageData.data[index] = color.r; // Red channel
          imageData.data[index + 1] = color.g; // Green channel
          imageData.data[index + 2] = color.b; // Blue channel
          imageData.data[index + 3] = color.a; // Alpha channel
        }
      }
  }

  renderPheromone(pheromone, imageData) {
    const opacity = pheromone.intensity;
    
    if (opacity > 0) {
      const color = { r: 50, g: 150, b: 200, a: opacity };
      // Draw the rectangle onto the image data
      for (let dy = 0; dy < pheromone.size; dy++) {
        for (let dx = 0; dx < pheromone.size; dx++) {
          const index = ((Math.round(pheromone.y) + dy) * this.canvas.width + (Math.round(pheromone.x) + dx)) * 4;
          imageData.data[index] = color.r; // Red channel
          imageData.data[index + 1] = color.g; // Green channel
          imageData.data[index + 2] = color.b; // Blue channel
          imageData.data[index + 3] = color.a; // Alpha channel
        }
      }
    }
      


  }
}
