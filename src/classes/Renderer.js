export default class Renderer {
  constructor(canvasId, params) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.params = params;
    this.size = this.params.getCellSize();
    this.canvas.width = this.params.getCanvasWidth();
    this.canvas.height = this.params.getCanvasHeight();
  }

  clearCanvas(x1 = 0, y1 = 0, x2 = this.canvas.width, y2 = this.canvas.height) {
    this.ctx.clearRect(x1, y1, x2, y2);
  }

  render(grid) {
    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    grid.forEach((column) => {
      column.forEach((cell) => {
        // Draw only the topmost element of the cell, if any.
        const element = cell.ant ?? cell.food ?? cell.pheromone;
        if (element) {
          this.renderCell(element, imageData);
        }
      });
    });

    // Put the modified image data back onto the canvas (this is faster than using regular draw methods).
    this.ctx.putImageData(imageData, 0, 0);
  }

  renderCell(element, imageData) {
    const colour = element.getColour();

    let { x, y } = element.getPosition();
    const width = this.canvas.width;

    for (let dy = 0; dy < this.size; dy++) {
      for (let dx = 0; dx < this.size; dx++) {
        const index = ((y + dy) * width + (x + dx)) * 4;
        imageData.data[index] = colour.r;
        imageData.data[index + 1] = colour.g;
        imageData.data[index + 2] = colour.b;
        imageData.data[index + 3] = colour.a;
      }
    }
  }
}
