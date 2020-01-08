import { ConfigType } from '../schema';

export class Defaulter {

    public static fillInputGapsWithDefaults( _: ConfigType ) : ConfigType {

        _.target 				= _.target 				|| null, 
        _.x 					= _.x  					|| 0, 
        _.y 					= _.y 					|| 0, 
        _.width 				= _.width 				|| 10, 
        _.height 				= _.height 				|| 10, 
        _.w2h 					= _.w2h 				|| 1, 
        _.scale 				= _.scale 				|| 1.0, 
        _.eyeSpacing 			= _.eyeSpacing			|| 0, 
        _.pupilScale 			= _.pupilScale 			|| 1.0, 
        _.pupilRotRadius 		= _.pupilRotRadius 		|| 0.5, 
        _.pupilColor 			= _.pupilColor 			|| 0x000000
    
        return _;
    }
}