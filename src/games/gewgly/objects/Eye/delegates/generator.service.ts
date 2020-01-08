import { CoordinateType, ConfigType } from '../schema';

export class Generator {
	
    public static generateEyePointPos( _ : ConfigType, direction: string ) : CoordinateType { // Position of eyes relative to EyeFrame

        const { eyesFrame, scale, eyeSpacing } = _;

		if( direction != "left" && direction != "right" ) { throw "generateEyePointPos Error"; }

		return {
			y : eyesFrame.y + eyesFrame.height,
			x : direction == "left" ? eyesFrame.x - eyeSpacing * scale
									: eyesFrame.x + eyesFrame.width + eyeSpacing * scale
		}
	}

    public static generateWhite( _ : ConfigType, direction: string ) : Phaser.Geom.Ellipse {

        const { height, width, w2h, scale, eyePointPosLeft, eyePointPosRight } = _;

        const eyePointPos = direction == "left" ? eyePointPosLeft : eyePointPosRight;

		return new Phaser.Geom.Ellipse(	eyePointPos.x, eyePointPos.y, width * w2h * scale, height/w2h * scale );
	}

	public static generatePupil( _ : ConfigType, direction: string ) : Phaser.Geom.Ellipse {

        const { pupilScale, scale, eyePointPosLeft, eyePointPosRight } = _;

        const eyePointPos = direction == "left" ? eyePointPosLeft : eyePointPosRight;

		return new Phaser.Geom.Ellipse(	eyePointPos.x, eyePointPos.y, 4 * pupilScale * scale, 4 * pupilScale * scale);
	}

	public static generateBase( _ : ConfigType, direction: string ) : Phaser.Geom.Ellipse {

        const { left, right, leftWhite, pupilRotRadius } = _;

        const coor = direction == "left" ? left : right;

		return new Phaser.Geom.Ellipse(	coor.x, coor.y,
										leftWhite.width * pupilRotRadius,
										leftWhite.height * pupilRotRadius);
	} // Circle for pupils to follow
}