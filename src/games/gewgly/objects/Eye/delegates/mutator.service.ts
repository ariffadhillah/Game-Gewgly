import { ConfigType } from '../schema';

export class Mutator {

	public static changeEyeFrame( { eyesFrame, parent, offset } : ConfigType ) : void {

		eyesFrame.x = (parent.x || 0) + offset.x; // bc parent could be scene 
		eyesFrame.y = (parent.y || 0) + offset.y; // scene has no x nor y
	}

	public static changeEyePosition( _ : ConfigType ) : void {

        const { eyesFrame, eyeSpacing, scale } = _;

        _.eyePointPosLeft  = {
            x: eyesFrame.x - eyeSpacing * scale,
            y: eyesFrame.y + eyesFrame.height * scale
        };

        _.eyePointPosRight = {
            x: eyesFrame.x + eyesFrame.width + eyeSpacing * scale,
            y: eyesFrame.y + eyesFrame.height * scale
        };
	}

	public static moveEyes( _ : ConfigType ) : void {

        const { eyePointPosLeft, eyePointPosRight } = _;

        _.left.x 			= eyePointPosLeft.x;
        _.left.y 			= eyePointPosLeft.y;
        _.right.x 			= eyePointPosRight.x;
        _.right.y 			= eyePointPosRight.y;
	}

	public static movePupil( _ : ConfigType ) : void {
			
        const { left, right } = _;

        _.leftBase.x  		= left.x;
        _.leftBase.y  		= left.y;
        _.rightBase.x 		= right.x;
        _.rightBase.y 		= right.y;
	}

	public static updateTarget( _ : ConfigType ) : void {

        const { left, target } = _;

        _.leftTarget.x1 	= left.x;
        _.leftTarget.y1 	= left.y;
        _.leftTarget.x2 	= target.x;
        _.leftTarget.y2 	= target.y;
	}

	public static updateEyeWhite( _ : ConfigType ) : void {

        const { eyePointPosLeft, eyePointPosRight } = _;

        _.leftWhite.x 		= eyePointPosLeft.x;
        _.leftWhite.y 		= eyePointPosLeft.y;
        _.rightWhite.x 	    = eyePointPosRight.x;
        _.rightWhite.y 	    = eyePointPosRight.y;
    }

    public static movePupils( _ : ConfigType ) : void {

        const { mid, right, target } = _;

        this.performIntrospection( "left", _ );

        _.left.x = mid.x;
        _.left.y = mid.y;

        _.rightTarget.x1 = right.x;
        _.rightTarget.y1 = right.y;
        _.rightTarget.x2 = target.x;
        _.rightTarget.y2 = target.y;

        this.performIntrospection( "right", _ );

        _.right.x = mid.x;
        _.right.y = mid.y;
    }
    
    private static performIntrospection( direction: string, _ : ConfigType ) { // Within the left or right eye?

        const { leftTarget, leftBase, mid, rightTarget, rightBase } = _;

        const dirTarget = direction == "left" ? leftTarget : rightTarget;
        const dirBase   = direction == "left" ? leftBase   : rightBase;

        if( dirBase.contains(dirTarget.x2, dirTarget.y2)) {
            _.mid.x = dirTarget.x2;
            _.mid.y = dirTarget.y2;
        } else {
			Phaser.Geom.Ellipse.CircumferencePoint(	dirBase, Phaser.Geom.Line.Angle( dirTarget ), mid);
        }
    }
}