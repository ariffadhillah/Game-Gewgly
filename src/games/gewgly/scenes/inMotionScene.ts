import { Eye }      from "../objects/Eye/eye";
import { Cursor }   from "../objects/Cursor/cursor";

export class InMotionScene extends Phaser.Scene {
    
    private player;
	private playerEyes;
	private keyList;

    constructor() {
        super({ key: "InMotionScene" });
    }

    preload(): void {

        this.load.image('sky',      './src/games/gewgly/assets/images/sky.png');
        this.load.image('ground',   './src/games/gewgly/assets/images/platform.png');
        this.load.image('star',     './src/games/gewgly/assets/images/star.png');
        this.load.image('bomb',     './src/games/gewgly/assets/images/bomb.png');

        this.load.spritesheet('dude', './src/games/gewgly/assets/images/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create(): void {
		
		let stars;
		let platforms;
		
        this.add.image(400, 300, 'sky');

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Eye template
        const eyeTemplate = {
            scene           : this,
            parent          : this.player,
            target          : new Cursor( this ),   // game.input.mousePointer,
            x               : -5,                   // x, y position is the location that the eyes 
            y               : -10,                  // object is originally located within the parent
            width           : 10,                   // height/width is the total area of the eye object (subject to scaling)
            height          : 8,
            w2h             : 0.9,                  // Eye ball width to height ratio
            scale           : 1.0,
            eyeSpacing      : 2,                    // Distance between eyes
            pupilScale      : 1.0,
            pupilRotRadius  : 0.7,                  // Factor of radius pupils can rotate around eye white
            pupilColor      : 0x0f00ff
        };

        this.playerEyes = new Eye(eyeTemplate);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.keyList = this.input.keyboard.createCursorKeys();

        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        this.physics.add.collider(this.player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(this.player, stars, null, null, this);
	}
	
	update(): void {

        if (this.keyList.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);

        } else if (this.keyList.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);

        } else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.keyList.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
		}
		
        this.playerEyes.update();
    }
}