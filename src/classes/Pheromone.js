export default class Pheromone {
    constructor(x, y, intensity, decayRate, size) {
        this.x = x;
        this.y = y;
        this.intensity = intensity;
        this.decayRate = decayRate;
        this.size = size;
        this.colour = { r: 50, g: 150, b: 200, a: this.intensity };
    }

    getColour() {
        return this.colour;
    }

    setColour(intensity) {
        this.colour.a = intensity;
    }

    update() {
        if (this.intensity > 0 ){
            this.intensity -= this.decayRate;
        } else {
            this.intensity = 0;
        }
        this.setColour(this.intensity);
    }
}