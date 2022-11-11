import Phaser from "phaser";

var bullets;
var ship;
var lastFired = 0;
var isDown = false;
var mouseX = 0;
var mouseY = 0;



export class Player extends Phaser.GameObjects.Sprite {

    constructor() {
        super({key:'Player'});
        
    }

    preload(){
        this.load.image('ship', 'assets/spaceInvader/sprites/Player.png');
        this.load.image('bullet1', 'assets/spaceInvader/sprites/Bala.png');
    }


    create(){
        
        var Bullet = new Phaser.Class({
            extends: Phaser.GameObjects.Image,
            initialize:
            
            function Bullet (scene){
                Phaser.GameObjects.Image.call(this.scene, 0, 0,'bullet1');
                this.incX = 0;
                this.incY = 0;
                this.lifespan = 0;

                this.speed = Phaser.Math.GetSpeed(600, 1);
            },

            fire: function (x, y){
                this.setActive(true);
                this.setVisible(true);
                this.setPosition(400,300);

                var angle = Phaser.Math.Angle.Between(x, y, 400, 300);

                this.setRotation(angle);

                this.incX = Math.cos(angle);
                this.incY = Math.cos(angle);

                this.lifespan = 1000;
            },

            update: function (time, delta){

                this.lifespan -=delta;
                this.x -= this.incX * (this.speed * delta);
                this.y -= this.incY * (this.speed * delta);
    
                if (this.lifespan <= 0)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            } 

        });

        bullets = this.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        });

        ship = this.add.image(100, 100, 'player').setDepth(1);

        this.input.on('pointerdown', function (pointer){

            isDown = true;
            mouseX = pointer.x;
            mouseY = pointer.y;

        });

        this.input.on('pointermove', function (pointer){

            isDown = false;

        });
    }

     update(time, delta) {
        {
            if (isDown && time > lastFired)
            {
                var bullet = bullets.get();
        
                if (bullet)
                {
                    bullet.fire(mouseX, mouseY);
        
                    lastFired = time + 50;
                }
            }
             ship.setRotation(Phaser.Math.Angle.Between(mouseX, mouseY, ship.x, ship.y)- Math.PI / 2);
     }
    }
}
