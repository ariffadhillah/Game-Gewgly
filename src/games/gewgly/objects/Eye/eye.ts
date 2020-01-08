import { Defaulter,
		 Renderer,
		 Generator,
		 Mutator } 		from './delegates';
import { ConfigType } 	from './schema';


export class Eye extends Phaser.GameObjects.Sprite {

	private _ : ConfigType;

	constructor( config : ConfigType ) {

		console.log("config", config);

		const { scene, x, y } = config;

		super(scene, x, y, undefined, undefined);

		config = Defaulter.fillInputGapsWithDefaults( config );

		this._ = config;

		this.init( config );

		this.scene.add.existing(this);

		this.create();
	}

	private init( config : ConfigType ) : void {

		this._.offset 			= 	{ x : config.x, y : config.y };
		this.x 					= 	(this._.parent.x || 0) + this._.offset.x; // bc parent could be scene 
		this.y 					= 	(this._.parent.y || 0) + this._.offset.y; // scene has no x nor y
		this.width 				= 	this._.width;
		this.height 			= 	this._.height;
		this.scale 				= 	this._.scale;
		this._.mid 				= 	new Phaser.Math.Vector2();
		this._.graphics 		= 	this.scene.add.graphics();
		this._.eyesFrame 		= 	new Phaser.Geom.Rectangle(this.x, this.y, this.width, this.height);
	}  								// Invisible rectangle which eyes are placed. 

	private create() : void {

        this._.eyePointPosLeft 	= Generator.generateEyePointPos( this._, "left" );
		this._.eyePointPosRight = Generator.generateEyePointPos( this._, "right" );

		this._.leftWhite 		= Generator.generateWhite( this._, "left" );
		this._.rightWhite 		= Generator.generateWhite( this._, "right" );
		
		this._.left 			= Generator.generatePupil( this._, "left" );
		this._.right 			= Generator.generatePupil( this._, "right" );

		this._.leftBase 		= Generator.generateBase( this._, "left" );
		this._.rightBase 		= Generator.generateBase( this._, "right" );

        this._.leftTarget	 	= new Phaser.Geom.Line(	this._.left.x, this._.left.y, 0, 0);
		this._.rightTarget 		= new Phaser.Geom.Line(	this._.right.x, this._.right.y, 0, 0);
	}

    public update() : void {

        Mutator.changeEyeFrame( this._ );

        Mutator.changeEyePosition( this._ );

		Mutator.moveEyes( this._ );
		
		Mutator.movePupil( this._ );

		Mutator.updateTarget( this._ );

		Mutator.updateEyeWhite( this._ );

        Mutator.movePupils( this._ ); // Calculate new rotation for pupils

        Renderer.render( this._ );
	}
}
