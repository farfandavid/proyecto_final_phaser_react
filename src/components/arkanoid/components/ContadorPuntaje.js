export class ContadorPuntaje {
    constructor(scene){
        this.relatedScene = scene;
        this.puntaje = 0;
    }
    //En el create haremos que se cree nuestro texto con sus respectivas caracteristicas.
    create(){
        this.puntajeTexto = this.add.text(16, 16, 'Puntaje: 0',{
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
    }
    //Aqui lo que haremos es que el texto del puntaje vaya aumentado
    incrementoPuntos(puntos){
        this.puntaje +=puntos;
        this.puntajeTexto.setText('Puntos: ' + this.puntajeTexto);
    }
}