import Phaser from "phaser";
import { Puntaje } from "./Puntaje";

var bullets;
var ship;
var lastFired = 0;
var isDown = false;
var mouseX = 0;
var mouseY = 0;
var enemigos;
var texto;
const vidaShip = 3;
const minEnemigos = 2;
const maxEnemigos = 4;
const velocidadCaida = 4;
const tiempoAparicion = 600;

export class Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Game' });
    }

    init() {
        this.Puntaje = new Puntaje(this);
    }

    preload() {
        this.load.image('fondo', 'assets/spaceInvader/background/background.png');
        this.load.image('player', 'assets/spaceInvader/sprites/Player.png');
        this.load.image('bullet1', 'assets/spaceInvader/sprites/Bala.png');
        this.load.audio('sfx', 'assets/spaceInvader/sonidos/musica2.mp3');
        this.load.image('enemy', 'assets/spaceInvader/sprites/Enemigo.png');
    }


    create() {
        this.add.image(400, 300, 'fondo');
        //Agregado de musica.
        this.music = this.sound.add('sfx');
        // //Aqui haremos que la musica se reproduzca
        /* this.music.play({
             loop: true
         }); */
        //Aqui crearemos nuestra tabla de puntaje
        this.Puntaje.create();

        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet1');
                    this.incX = 0;
                    this.incY = 0;
                    this.lifespan = 0;

                    this.speed = Phaser.Math.GetSpeed(600, 1);
                },

            //Aqui se calculara el disparo.
            fire: function (x, y) {
                this.setActive(true);
                this.setVisible(true);
                this.setPosition(400, 300);

                var angle = Phaser.Math.Angle.Between(x, y, 400, 300);

                this.setRotation(angle);

                this.incX = Math.cos(angle);
                this.incY = Math.sin(angle);
                //El lifespan nos sirve para que nuestras balas salgan disparadas en cierto rango, si el rango es bajo desapareceran antes.
                this.lifespan = 500;
            },

            update: function (time, delta) {

                this.lifespan -= delta;
                this.x -= this.incX * (this.speed * delta);
                this.y -= this.incY * (this.speed * delta);

                if (this.lifespan <= 0) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }

        });


        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 50,
            runChildUpdate: true
        });
        //Aqui aremos que el player se cree.
        ship = this.physics.add.image(400, 300, 'player').setDepth(1);
        ship.vida = vidaShip;

        texto = this.add.text(10, 50, '', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setDepth(0.1);
        this.actualizarTexto();

        this.input.on('pointerdown', function (pointer) {
            //Aqui definimos los valores de las variables.
            isDown = true;
            mouseX = pointer.x;
            mouseY = pointer.y;

        });

        //En esta parte haremos que nuestra nave gire con respecto al mouse.
        this.input.on('pointermove', function (pointer) {

            mouseX = pointer.x;
            mouseY = pointer.y;

        });
        //Con esto definiremos un input para disparar y diremos que tenga un valor de "false" ya que si esta en "true" este creara infinitas balas despues de un clic.
        this.input.on('pointerup', function (pointer) {

            isDown = false;

        });

        enemigos = this.physics.add.group({
            defaultKey: 'enemy',
            maxSize: 50
        });

        this.time.addEvent({
            delay: tiempoAparicion,
            loop: true,
            callback: () => {
                this.GenerarEnemigos()
            }
        });

        this.physics.add.overlap(ship, enemigos, this.colicionShipEnemigos, null, this);

        this.physics.add.overlap(bullets, enemigos, this.colicionBulletsEnemigos, null, this)

    }

    update(time, delta) {

        Phaser.Actions.IncY(enemigos.getChildren(), velocidadCaida);
        enemigos.children.iterate(function (enemigo) {
            if (enemigo.y > 600) {
                enemigos.killAndHide(enemigo);
            }
        })

        {
            //Basicamente lo que vemos aqui es la creacion de las balas y esto comprobara si el clic fue presionado, en caso de ser correcto se creara una bala.
            if (isDown && time > lastFired) {
                var bullet = bullets.get();

                if (bullet) {
                    bullet.fire(mouseX, mouseY);
                    //El lastFired es el cooldown entre disparos (en otras palabras es una pausa entre disparos)
                    lastFired = time + 450;

                }
            }
            //Aqui se definira la rotacion de nuestra nave dependiendo de donde apunte nuestro mouse.
            ship.setRotation(Phaser.Math.Angle.Between(mouseX, mouseY, ship.x, ship.y) - Math.PI / 2);

        }
    }

    GenerarEnemigos() {
        var numeroEnemigos = Phaser.Math.Between(minEnemigos, maxEnemigos);

        for (let i = 0; i < numeroEnemigos; i++) {
            var enemigo = enemigos.get();

            if (enemigo) {
                enemigo.setActive(true).setVisible(true);
                enemigo.y = -100;
                enemigo.x = Phaser.Math.Between(0, 800);
                this.physics.add.overlap(enemigo, enemigos, (enemigoEnColicion) => {
                    enemigoEnColicion.x = Phaser.Math.Between(0, 800);
                });
            }
        }
    }

    colicionShipEnemigos(ship, enemigo) {
        if (enemigo.active) {
            enemigos.killAndHide(enemigo);
            enemigo.setActive(false);
            enemigo.setVisible(false);
            ship.vida--;
            this.actualizarTexto();
            if (ship.vida <= 0) {
                this.ShowWin();
            }
        }
    }
    colicionBulletsEnemigos(Bullet, enemigo) {

        Bullet.setActive(false);
        Bullet.setVisible(false);
        enemigo.setActive(false);
        enemigo.setVisible(false);
        this.Puntaje.incrementoPuntos(10);
   
 
      
        

    }
    actualizarTexto() {
        texto.setText('vida:' + ship.vida);
    }


    //En caso de querer usar el texto se debe poner asi:
    //se pondria en el impacto de la bala con los enemigos.
    //this.Puntaje.incrementoPuntos(10);

    //Aqui llamaremos al "Mostrar GameOver" que nos mostrara el Game Over.
    showGameOver() {
        this.scene.start('gameover');
    }
    ShowWin() {
        this.scene.start('Win');
    }
     //Aqui llamaremos al "Mostrar Win" que nos mostrara la pantalla de win.
   

}

export default Game;