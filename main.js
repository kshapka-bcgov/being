import AntColony from './src/classes/AntColony.js';
import Renderer from './src/classes/Renderer.js';
import SimulationSettings from './src/classes/SimulationSettings.js';

const params = new SimulationSettings();
const colony = new AntColony(params);
const renderer = new Renderer('simulationCanvas', params);

// Main loop function to update and render the simulation.
function mainLoop() {
    colony.update();
    renderer.clearCanvas();
    renderer.render(colony);

    requestAnimationFrame(mainLoop);
}

// Start the simulation
mainLoop();
