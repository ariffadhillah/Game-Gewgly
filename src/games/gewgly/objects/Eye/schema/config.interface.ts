import { CoordinateType } 	from './coordinate.interface';

export interface ConfigType {
	scene 				 : Phaser.Scene;
	parent 				 : any; // Phaser.Scene | Phaser.GameObjects.Sprite;
	target 				?: Phaser.GameObjects.Sprite;
	x 					?: number;
	y 					?: number;
	width 				?: number;
	height 				?: number;
	w2h 				?: number;
	scale 				?: number;
	eyeSpacing 			?: number;
	pupilScale 			?: number;
	pupilRotRadius 		?: number;
	pupilColor 		 	?: number;
	offset 				?: CoordinateType;
	left				?: Phaser.Geom.Ellipse;
	right				?: Phaser.Geom.Ellipse;
	leftTarget			?: Phaser.Geom.Line;
	rightTarget			?: Phaser.Geom.Line;
	leftBase			?: Phaser.Geom.Ellipse;
	rightBase			?: Phaser.Geom.Ellipse;
	mid					?: Phaser.Math.Vector2;
	graphics			?: Phaser.GameObjects.Graphics;
	eyesFrame  			?: Phaser.Geom.Rectangle;
	eyePointPosLeft 	?: CoordinateType;
	eyePointPosRight 	?: CoordinateType;
	leftWhite 			?: Phaser.Geom.Ellipse;
	rightWhite 			?: Phaser.Geom.Ellipse;
}