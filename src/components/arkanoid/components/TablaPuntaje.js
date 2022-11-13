export class TablaPuntaje{
    constructor(scene) {
        this.relatedScene = scene;
        this.puntaje = 0;
    }

    create(){
        this.TablaPuntaje = this.relatedScene.add.text(16,16, 'Puntos: 0', {
            fontSize: '20px',
            fill: '#fff',
            fontFamily: 'verdana, arial, sans-serif'
        });
    }

    incrementoPuntaje(puntaje){
        this.puntaje += puntaje;
        this.TablaPuntaje.setText('Puntos:'+this.puntaje);
    }
    
    

}