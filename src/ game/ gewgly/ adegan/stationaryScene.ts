import { Cursor } from "../objects/Cursor/cursor";
import { Eye } from "../objects/Eye/eye";
import { ConfigType } from "../objects/Eye/schema";
import { GameObject } from "../../../../patterns/behavioral-design-patterns/command/gameobject";
import { Input } from "phaser";

export class StationaryScene extends Phaser.Scene {

    private balls: Phaser.GameObjects.Group;
    private dance;
    private charactorA: Eye;
    private charactorB: Eye;
    private inputA: ConfigType;
    private inputB: ConfigType;
    private buttonA;
    private buttonB;
    private downButton;
    private upButton;
    private spinSpeed:number;
    private highlight;

  
    constructor() {
        super({ key: "StationaryScene" });
    }
  
    preload(): void {

        this.load.image('sky', './src/games/gewgly/assets/images/sky.png');
        this.load.image('up-bubble', './src/games/gewgly/assets/images/up-bubble.png');
        this.load.image('down-bubble', './src/games/gewgly/assets/images/down-bubble.png');
        this.load.image('play', './src/games/gewgly/assets/images/play.png');

        this.load.spritesheet('balls', './src/games/gewgly/assets/images/balls.png', { frameWidth: 17, frameHeight: 17 });
    }
  
    create(): void {

        this.add.image(400, 300, 'sky');
        // this.add.image(345, 365, 'play');

    
        this.balls = this.generateBalls();
    
        this.dance = this.generateDance();

        // this.buttonContoll();

        this.inputA = this.generateEyeArg( 340, 300, 3.0 );
        this.inputB = this.generateEyeArg( 460, 300, 3.0 );

        this.charactorA = new Eye( this.inputA );
        this.charactorB = new Eye( this.inputB );
    }

    generateEyeArg( xCoor: number, yCoor: number, sScale: number) {

        return {
            scene           : this,
            parent          : this,
            target          : new Cursor( this ),   // game.input.mousePointer,
            x               : xCoor,                // x, y position is the location that the eyes 
            y               : yCoor,                // object is originally located within the parent
            width           : 10,                   // height/width is the total area of the eye object (subject to scaling)
            height          : 8,
            w2h             : 0.9,                  // Eye ball width to height ratio
            scale           : sScale,
            eyeSpacing      : 3.5,                    // Distance between eyes
            pupilScale      : 1.0,
            pupilRotRadius  : 0.7,                  // Factor of radius pupils can rotate around eye white
            pupilColor      : 0x0f00ff
        };
    }

    
    generateBalls() {

        const hitArea = new Phaser.Geom.Rectangle(0, 0, 32, 32);
        const hitAreaCallback = Phaser.Geom.Rectangle.Contains;
        
        const circle = new Phaser.Geom.Circle(400, 300, 220);
        const balls  = this.add.group(null, { 
            key: 'balls', 
            frame: [0, 1, 5], 
            repeat: 5, 
            setScale: { x: 3, y: 3 },
            hitArea: hitArea,
            hitAreaCallback: hitAreaCallback,
        });
       
              
        let that = this;

        this.input.on('gameobjectdown', function (pointer, gameObject) {

            if( that[that.highlight] ) {
                 that[that.highlight].target = gameObject
                }
        
            })

                this.buttonA = this.add.image(345, 365, 'play',).setInteractive();
                this.buttonB = this.add.image(465, 365, 'play').setInteractive();        
                this.buttonA.on('pointerdown', () => {
                    this.buttonB.setTint();
                    if(this.highlight === "inputA") {
                        this.buttonA.setTint();
                        this.highlight = null;
                    } else {
                        this.buttonA.setTint(0x0000ff);
                        this.highlight = "inputA";
                    }
                    });

                    this.buttonB.on('pointerdown', () => {
                    this.buttonA.setTint();
                    if(this.highlight === "inputB") {
                        this.buttonB.setTint();
                        this.highlight = null;
                    } else {
                        this.buttonB.setTint(0x0000ff);
                        this.highlight = "inputB";
                    }
                    });
        
                                   
    
        this.input.on('gameobjectover', function (pointer, gameObject) {
            document.body.style.cursor = 'pointer';             
        });
        
        this.input.on('gameobjectout', function (pointer, gameObject) {
            document.body.style.cursor = 'default';           
        });

      
        balls.getChildren().forEach(
            s => s.setInteractive({ cursor: 'url(./src/games/gewgly/assets/images/balls.png), pointer' })
        );


        Phaser.Actions.PlaceOnCircle( balls.getChildren(), circle);

        return balls;
    }


    generateDance() {

        this.downButton = this.add.image(230, 530, 'up-bubble').setInteractive();       

        this.upButton = this.add.image( 80, 530, 'down-bubble').setInteractive();

        this.spinSpeed = 0.003;
    
        this.downButton.on ('pointerdown', (event) => {

            if (this.spinSpeed < 1) { 
                this.spinSpeed += 0.002;             
            }
        });

        this.upButton.on('pointerdown', (event) => {

            if (this.spinSpeed > 0 ) {
                this.spinSpeed -= 0.001;
            }
        }); 
                        
        return this.tweens.addCounter({
            from: 220,
            to: 160,
            duration: 9000,
            delay: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true            
        });
    }

   

    update() {
        
        this.charactorA.update();
        this.charactorB.update();

        Phaser.Actions.RotateAroundDistance( this.balls.getChildren(), { x: 400, y: 300 }, this.spinSpeed, this.dance.getValue());
    }
}
