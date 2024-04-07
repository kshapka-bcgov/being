import SimulationSettings from './src/classes/SimulationSettings.js';
import WorldMap from './src/classes/WorldMap.js';
import AntColony from './src/classes/AntColony.js';
import Renderer from './src/classes/Renderer.js';

const params = new SimulationSettings();
const worldMap = new WorldMap(params);

const renderer = new Renderer('simulationCanvas', params);

function init() {
    worldMap.init();
}

// Main loop function to update and render the simulation.
function mainLoop() {
    update();
    draw(renderer);

    requestAnimationFrame(mainLoop, 200);
}

function update() {
    updateColonies();
    updateFood();
}

function updateColonies() {
    worldMap.colonyParams.forEach((param) => {
        const colony = worldMap.getColony(param.x, param.y);
        if (colony) {
            colony.update();
        }
    });
}

function updateFood() {
    worldMap.foodParams.forEach((param) => {
        const food = worldMap.getFood(param.x, param.y);
        food?.update();
    });
}

function draw(renderer) {
    renderer.clearCanvas();
    renderer.render(worldMap.grid);
}

// Start the simulation
init();
mainLoop();
