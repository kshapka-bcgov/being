export default class Pheromone {
    constructor(x, y, intensity, decayRate, size) {
        this.x = x,
        this.y = y,
        this.intensity = intensity;
        this.decayRate = decayRate;
        this.size = size;
    }

    update() {
        if (this.intensity > 0.05 ){
            this.intensity *= this.decayRate;
        } else {
            this.intensity = 0;
        }
    }
}