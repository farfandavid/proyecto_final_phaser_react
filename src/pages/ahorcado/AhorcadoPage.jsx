import LetraComp from "../../components/ahorcaoComp/LetraComp";
import { useState, useEffect } from "react";
import './styles/AhorcadoStyle.css'
import LetraPalabraComp from "../../components/ahorcaoComp/LetraPalabraComp";
import Modal from "../../components/modal/Modal";
import styled from 'styled-components';
import { Howl, Howler } from 'howler'
import Sonar from '../../sounds/sonar.mp3'


function AhorcadoPage() {
  //Estados de las variables Principales
  const [ganaste, setModalGanaste] = useState(false);
  const [perdiste, setModalPerdiste] = useState(false);
  const [palabra, setPalabra] = useState([[], []]);
  const [alfabeto, setAlfabeto] = useState([]);
  const [marcardo, setMarcado] = useState(false);
  const [imagenAhorcado, setImagenAhorcado] = useState(0);

  //Sonar
  const sound = new Howl({
    src: Sonar
  })

  //Cargando el Alfabeto
  useEffect(() => {
    fetch("json/alfabeto.json")
      .then(response => response.json())
      .then(datos => {
        setAlfabeto(datos)
      });
    console.log("Alfabeto Cargado")
  }, []);
  function refreshPage() {
    window.location.reload();
  }
  //Cargando Las Palabras
  useEffect(() => {

    fetch("json/palabras.json")
      .then(response => response.json())
      .then(datos => {
        //Selecciona una palabra al Azar
        var objeto = Array.from(Object.keys(datos[Math.floor(Math.random() * datos.length)]).toString());
        console.log(objeto);
        //Carga la palabra transformada en Array y carga un Array mas para el Estado de
        //cada letra 
        setPalabra([objeto, [...new Array(objeto.length)].map(() => true)]);
      });
    console.log("Palabras Cargadas");
  }, []);
  //Al hacer click una letra del Alfabeto suena
  useEffect(() => {
    Howler.volume(0.5);
    sound.play();
    setMarcado(false);
  }, [marcardo])

  /**
   *Clickeado
   *Al clickear hace una serie de operaciones
   * @param {*} index Selecciona el array del los valores
   * @param {*} index2 Selecciona el uno de los elemente del array de los valores
   */
  const clickear = (index, index2) => {
    //Si el la Letra aun no fue seleccionada
    if (alfabeto[index][index2] === true) {
      //Cambia el valor de la Letra a false ya que fue seleccionado
      alfabeto[index][index2] = false;
      //Actualiza los valores del Alfabeto
      setAlfabeto(alfabeto);
      console.log(Object.keys(alfabeto[index]).toString());
      //Variable para saber si recorrio toda la Palabra Completamente
      let contadorError = 0;
      //Recorre cada la letra de la Palabra a descubrir
      palabra[0].forEach((element, val) => {
        //Si coincide con la Letra del Alfabeto seleccionado cambia el valor de la Letra de 
        //la Palabra
        if (Object.keys(alfabeto[index]).toString() === String(element).toUpperCase()) {
          palabra[1][val] = false;
          console.log(ganaste);
        } else {
          //Si no coincide aumenta el contador
          contadorError++;
        }
        //Comprueba que el cotador recorrio toda la palabra si no hubo coincidencia 
        //y cambia la imagen
        if ((contadorError === palabra[0].length) && (imagenAhorcado < 5)) {
          console.log(contadorError);
          setImagenAhorcado(imagenAhorcado + 1);
        } //Si erro y es su ultima vida muestra la ventana de perdiste
        else if ((contadorError === palabra[0].length) && (imagenAhorcado === 5)) {
          setImagenAhorcado(imagenAhorcado + 1);
          setModalPerdiste(true);
        }
      });
      //Comprueba si acertaste la letras
      let contadorAciertos = 0;
      palabra[0].forEach((element, index) => {
        if (palabra[1][index] === false) {
          contadorAciertos++;
        }//Si acertaste todo muestra la ventana de Ganaste
        if (contadorAciertos === palabra[1].length) {
          console.log("aciertos: " + contadorAciertos);
          console.log("de: " + palabra[1].length);
          setModalGanaste(true);
        }
      })
      setMarcado(true);
    }
  }

  return (
    <div className="Ahorcado">
      <div>
        {/** Muestra la primera imagen del Ahorcado que luego itinera */}
        <img src={`image/ahorcado/img${imagenAhorcado}.png`.trimEnd()} alt="Imagen Ahorcado" />
        <div className="Alfabeto">
          {//Muestra cada letra de la Palabra cargada con su estado
            palabra[0].map((item, index) => (
              <LetraPalabraComp key={item + "palabra" + index} isDescubierto={palabra[1][index]} index={index}>{item}</LetraPalabraComp>
            ))}
        </div>
      </div>
      <div className="Alfabeto">
        {//Muestra cada letra del Alfabeto
          alfabeto.map((item, index) => (
            <LetraComp key={index + " Letra"} manejarClick={clickear} index={index}>{item}</LetraComp>
          ))}
      </div>
      {/** Muestra una Ventana de Ganaste */}
      <Modal estado={ganaste} cambiarEstado={setModalGanaste} titulo="" mostrarHeader={true}>
        <Contenido>
          <h1>{`Ganaste!!!`}</h1>
          <button className='boton' onClick={refreshPage} >Reiniciar</button>
        </Contenido>
      </Modal>
      {/** Muestra una Ventana de Perdiste con su respectiva Respuesta */}
      <Modal estado={perdiste} cambiarEstado={setModalPerdiste} titulo="" mostrarHeader={true}>
        <Contenido>
          <h1>{`Perdiste!!!`}</h1>
          <button className='boton' onClick={refreshPage} >Reiniciar</button>
          <h2>Respuesta: </h2>
          <div className="Alfabeto">
            {palabra[0].map((item, index) => (
              <LetraPalabraComp key={item + "palabra" + index} isDescubierto={false} index={index}>{item}</LetraPalabraComp>
            ))}
          </div>
        </Contenido>
      </Modal>
    </div>
  );
}

const Contenido = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h1 {
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 10px;
	}
	p {
		font-size: 18px;
		margin-bottom: 20px;
	}
	img {
		width: 100%;
		vertical-align: top;
		border-radius: 3px;
	}
`;

export default AhorcadoPage;