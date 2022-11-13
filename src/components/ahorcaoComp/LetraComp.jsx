import './styles/LetraCompStyle.css'

//Componente de las Letras del Alfabeto
//Cuando es descubierto cambia de color a rojo
function LetraComp({ manejarClick, children, index }) {

  const isClicked = letra => {
    return letra[Object.keys(children)];
  }

  return (
    <div
      className={`Letras ${isClicked(children) ? '' : 'clickeado'}`.trimEnd()}
      /**Manajar Click Envia el index y la Key del la letra seleccionada*/
      onClick={() => manejarClick(index, Object.keys(children))}>
      {Object.keys(children)}
    </div>
  );
}

export default LetraComp;