export default class Food {
    constructor(x, y, amount, size, grid) {
        this.x = x;
        this.y = y;
        this.grid = grid;
        this.size = size;

        this.amount = amount;
        this.colour = { r: 0, g: 200, b: 150, a: this.amount};
    }

    getColour() {
        return this.colour;
    }

    setColour(amount) {
        this.colour.a = amount;
    }

    getAmount() {
        return this.amount;
    }

    setAmount(amount) {
        this.amount = amount;
    }

    getPosition() {
        // Round for grid indexing.
        const x = Math.round(this.x);
        const y = Math.round(this.y);
    
        return { x, y };
      }

    update() {
        this.setColour(this.getAmount());
        if(!this.amount) {
            this.grid[this.x][this.y].food = null;
        }
    }
}