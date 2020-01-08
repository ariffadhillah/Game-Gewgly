import { ConfigType } from "../schema";

export class Renderer {

    public static render( _ : ConfigType ) : void {

        const { graphics, eyesFrame, leftWhite, rightWhite, left, right, pupilScale, pupilColor } = _;

        graphics.clear();
		
		this.renderEyeWhite( graphics, leftWhite, rightWhite );
		
		this.renderEyeBorder( graphics, leftWhite, rightWhite, pupilScale );
		
		this.renderPupil( graphics, left, right, pupilColor );
		
        this.renderDebug( graphics, eyesFrame );
	}

    private static renderEyeWhite( graphics     : Phaser.GameObjects.Graphics, 
                                   leftWhite    : Phaser.Geom.Ellipse, 
                                   rightWhite   : Phaser.Geom.Ellipse ) : void {

        graphics.fillStyle( 0xffffff, 1 );
        graphics.fillEllipseShape( leftWhite );
		graphics.fillEllipseShape( rightWhite );
	}

	private static renderEyeBorder( graphics    : Phaser.GameObjects.Graphics, 
                                    leftWhite   : Phaser.Geom.Ellipse, 
                                    rightWhite  : Phaser.Geom.Ellipse,
                                    pupilScale  : number ) : void {

        graphics.lineStyle( pupilScale, 0x000000, 1 )
        graphics.strokeEllipseShape( leftWhite );
		graphics.strokeEllipseShape( rightWhite );
	}

	private static renderPupil( graphics        : Phaser.GameObjects.Graphics, 
                                left            : Phaser.Geom.Ellipse, 
                                right           : Phaser.Geom.Ellipse, 
                                pupilColor      : number ) : void {

        graphics.fillStyle( pupilColor, 1 );
        graphics.fillEllipseShape( left );
		graphics.fillEllipseShape( right );
	}

    private static renderDebug( graphics: Phaser.GameObjects.Graphics, 
                                eyesFrame: Phaser.Geom.Rectangle ) : void {

        graphics.fillStyle(0x00ff00, 0.4);
		graphics.fillRectShape( eyesFrame );
	}
}