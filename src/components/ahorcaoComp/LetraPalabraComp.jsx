import './styles/LetraCompStyle.css'

//Componente de las Letras de las Palabras
function LetraPalabraComp({ children, isDescubierto }) {
  //Cambia de valor al ser descubierto se oculta el Span con el"-" y muestra la letra
  return (
    <div
      className={`Letras ${isDescubierto ? '' : 'clickeado'}`.trimEnd()}>
      <span className={`letra ${isDescubierto ? 'hide' : ''}`.trimEnd()}>{children}</span><span className={`letra ${isDescubierto ? '' : 'hide'}`.trimEnd()}>_</span>
    </div>
  );
}

export default LetraPalabraComp;