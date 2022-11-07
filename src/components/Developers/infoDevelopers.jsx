//------Importaciones-------//

//import '../stylesheets/InfoDevelopers.css'

//-------------------------//


/* Componente de funcion llamado "InfoDevelopers" que acepta un solo argumento de objeto "props" (que significa propiedades) con datos, devuelve elementos y sera exportado hacia el componente Developers.jsx */
function InfoDevelopers(props) {
    return (
        /** fragment que permite devolver mas de un elemento, devuelve una imagen, un <h4> y tres parrafos, todos estos reciben propiedades desde la funcion Developers.jsx. Este codigo es la estructura para la informacion de los desarrolladores de la pagina y hay algunas etiquetas div para poder darle diferentes estilos en CSS   */ 
        <>
            <div className='info'>
                <div className='propiedades'>
                <img className='imagen' src={props.img} alt="Desarrolladores" />
                    <h4>{props.nombre}</h4>
                    <p>Edad: {props.Edad}</p>
                    <p>Intereses: {props.intereses}</p>
                    <p>GitHub: {props.GitHub}</p>
                </div>
            </div>
        </>
    );
}

//-------Exportacion del componente-----//

export default InfoDevelopers;
