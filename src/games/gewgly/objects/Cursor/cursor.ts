// *** HELPFUL LINKS *** ///

// https://codepen.io/braelynsullivan-18/pen/bGGVwyz
// https://stackoverflow.com/questions/58152494/mouse-events-sent-as-inputs-to-phaser-scene

import { CoordinateType } from "./schema";

export class Cursor extends Phaser.GameObjects.Sprite {

    private boundryState: string;

    constructor( scene : Phaser.Scene ) {

        super( scene, null, null, null, null );
        
        scene.input.on('pointermove', (  pointer: CoordinateType  ) => {
            this.update( pointer, "inside" );
        });

        const body = document.querySelector('body');
        body.onmousemove = ( pointer: CoordinateType ) => {
            this.update( pointer, "outside" );
        };
    }

    update( pointer: CoordinateType, state: string) {

        this.x = pointer.offsetX || pointer.x;
        this.y = pointer.offsetY || pointer.y;

        this.boundryState  = state;
    }
}
