export default class SimulationSettings {
    constructor() {
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.numAnts = 200;
        this.numFoodSources = 5;
        this.pheromoneDecayRate = 0.99;
    }

    getCanvasWidth() {
        return this.canvasWidth;
    }

    setCanvasWidth(width) {
        this.canvasWidth = width;
    }

    getCanvasHeight() {
        return this.canvasHeight;
    }

    setCanvasHeight(height) {
        this.canvasHeight = height;
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

    getPheromoneDecayRate() {
        return this.pheromoneDecayRate;
    }

    setPheromoneDecayRate(rate) {
        this.pheromoneDecayRate = rate;
    }
}
