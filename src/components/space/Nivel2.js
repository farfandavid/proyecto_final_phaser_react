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
const minEnemigos = 1;
const maxEnemigos = 2;
const velocidadMovimiento = 5;
const tiempoAparicion = 600;

export class Nivel2 extends Phaser.Scene {

    constructor() {
        super({ key: 'nivel2' });
    }



    init() {
        this.Puntaje = new Puntaje(this);
    }

    //Aqui cargaremos e importaremos los archivos necesarios.
    preload() {
        this.load.image('fondoNivel2', 'assets/spaceInvader/background/fondoNivel2.jpg');
        this.load.image('player', 'assets/spaceInvader/sprites/Player.png');
        this.load.image('bullet1', 'assets/spaceInvader/sprites/Bala.png');
        this.load.audio('sfx', 'assets/spaceInvader/sonidos/musica2.mp3');
        this.load.image('enemy2', 'assets/spaceInvader/sprites/Enemigo2.png');
        this.load.image('regresar', 'assets/spaceInvader/background/return (1).png');
    }


    //Aqui los ubicaremos y crearemos.
    create() {

        this.add.image(400, 300, 'fondoNivel2');

        //con esta variable se crea un boton que permite regresar al menu principal
        var regresarBoton = this.add.image(760, 40, 'regresar').setInteractive();
        regresarBoton.on('pointerdown', function () {
            cargarEscena('menu')
        })
        //Agregado de musica.
        this.music = this.sound.add('sfx');
        // //Aqui haremos que la musica se reproduzca
        this.music.play({
             loop: true
         });
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

        texto = this.add.text(16, 50, '', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
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

        //aqui se crea un grupo de enemigos, maxSize permite que se guarde en memoria 50 enemigos
        enemigos = this.physics.add.group({
            defaultKey: 'enemy2',
            maxSize: 50
        });

        //se añade un evento para que los enemigos se generen segun el tiempoAparicion
        this.time.addEvent({
            delay: tiempoAparicion,
            loop: true,
            callback: () => {
                this.GenerarEnemigos()
            }
        });

        //en esta linea se añade una colision entre el jugador y el enemigo
        this.physics.add.overlap(ship, enemigos, this.colicionShipEnemigos, null, this);
        //en esta linea se añade una colision entre la bala y el enemigo
        this.physics.add.collider(bullets, enemigos, this.colicionBulletsEnemigos, null, this);

        //const que funciona para cargar la escena del menu al presionar el boton 'regresar'
        const cargarEscena = (escena) => {
            this.scene.start(escena)
        }

    }

    update(time, delta) {

        //aqui se incrementa en el ejeY el valor que le demos en 'velocidadCaida' a todos los hijos del gupo enemigos,
        Phaser.Actions.IncX(enemigos.getChildren(), velocidadMovimiento);
        // se llama a cada uno de los enemigos y verifica si su posicion en Y es mayor a la del lienzo, luego elimina al enemigo y lo vulve a poner disponible para volver a aparecer
        enemigos.children.iterate(function (enemigo) {
            if (enemigo.x > 800) {
                enemigos.killAndHide(enemigo);
            }
        });

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
        //esta variable sacara un numero de enemigos aleatorios entre los minEnemigos y maxEnemigos
        var numeroEnemigos = Phaser.Math.Between(minEnemigos, maxEnemigos);
        //por cada vez que se ejecute for, se crea un enemigo, se hace visible y se activa. 
        for (let i = 0; i < numeroEnemigos; i++) {
            var enemigo = enemigos.get();
            if (enemigo) {
                enemigo.setActive(true).setVisible(true);
                //cada enemigo comienza en y = una posicion aleatoria entre 0 y el tamaño del lienzo y en x= -100
                enemigo.y = Phaser.Math.Between(0, 600);
                enemigo.x = -100;
                // con esto verifica si hay colision entre enemigo (o sea se superponen) y se genera otra posicion asi nunca aparecen juntos
                this.physics.add.overlap(enemigo, enemigos, (enemigoEnColicion) => {
                    enemigoEnColicion.y = Phaser.Math.Between(0, 600);
                });
            }
        }
    }

    // aqui basicamente, si el enemigo esta activo y colisiona con la nave, se deactiva y destruye y vuelve a estar disponible para aparecer 
    colicionShipEnemigos(ship, enemigo) {
        if (enemigo.active) {
            enemigos.killAndHide(enemigo);
            enemigo.setActive(false);
            enemigo.setVisible(false);
            // a la vida del player se le resta en uno y si llega 0 muestra la escena GameOver 
            ship.vida--;
            this.actualizarTexto();
            if (ship.vida <= 0) {
                this.showGameOver();
            }
        }
    }
    // aqui tambien, una ves que la bala colisiona con el enemigo, se deactiva y destruye, tanto la bala como el enemigo y vuelven a estar disponible para aparecer 
    colicionBulletsEnemigos(Bullet, enemigo) {

        Bullet.destroy();
        enemigo.setActive(false);
        enemigo.setVisible(false);
        // con esta linea se aumenta en diez el puntaje por cada colision
        this.Puntaje.incrementoPuntos(10, this.scene);
        if (this.Puntaje >= 100) {
            this.ShowWin();
        }

    }

    // en esta parte solo se actualiza el numero de vidas que le quedan al jugador
    actualizarTexto() {
        texto.setText('vida:' + ship.vida);
    }



    //En caso de querer usar el texto se debe poner asi:
    //se pondria en el impacto de la bala con los enemigos.
    //this.Puntaje.incrementoPuntos(10);

    //Aqui llamaremos al "Mostrar GameOver" que nos mostrara el Game Over.
    showGameOver() {
        this.scene.start('gameOverNivel2');
    }
    ShowWin() {
        this.scene.start('Win');
    }
    //Aqui llamaremos al "Mostrar Win" que nos mostrara la pantalla de win.


}

export default Nivel2;