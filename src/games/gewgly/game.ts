import "phaser";
import { InMotionScene } from "./scenes/inMotionScene";
import { StationaryScene } from "./scenes/stationaryScene";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [ StationaryScene ],
    physics: {
        default: "arcade",
        arcade: {
			gravity: { y: 200 },
            debug: false
        }
    }
};

// game class
export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
    var game = new Game(config);
});