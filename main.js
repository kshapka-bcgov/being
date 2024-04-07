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
}

function updateColonies() {
    worldMap.colonyParams.forEach((param) => {
        const colony = worldMap.getColony(param.x, param.y);
        if (colony) {
            colony.update();
        }
    });
}

function draw(renderer) {
    renderer.clearCanvas();
    renderer.render(worldMap.grid);
    //renderColonies(renderer);
    //renderFood(renderer);
}

function renderColonies(renderer) {
    worldMap.colonyParams.forEach((param) => {
        const colony = worldMap.getColony(param.x, param.y);
        if (colony) {
            renderer.render(colony);
        }
    });
}

function renderFood(renderer) {
    worldMap.grid.forEach((cell) => {
        if (cell.food) {
            console.log(food);
            renderer.renderElement(food);
        } else if (cell.ant) {
            renderer.renderElement(ant);
        }
    });
}

// Start the simulation
init();
mainLoop();
