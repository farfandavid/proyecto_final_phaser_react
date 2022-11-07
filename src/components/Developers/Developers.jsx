import InfoDevelopers from "./infoDevelopers";
import desarrolladores from './json/desarrolladores.json';
//import '../stylesheets/InfoDevelopers.css';



function Developers() {
    return (
        /** Esta porcion de codigo contiene un <h1> que es un titulo y se usa la funcion map() para tomar el arreglo de "desarrolladores" que es importado desde un archivo externo llamado "desarrolladores.json", devulve el componente <InfoDevelopers> y le pasa las propiedades que seran mostradas en dicho componentes por "props". Hay algunas etiquetas div para poder darle diferentes estilos en CSS  */
        <div className="Contenedor-dev">
            <h1 className="Titulo">Desarrolladores</h1>
            <div className="Developers">
                {desarrolladores.map((info,i) =>
                    <InfoDevelopers
                        key = {i}
                        img={info.img}
                        nombre={info.nombre}
                        Edad={info.Edad}
                        intereses={info.intereses}
                        GitHub={info.GitHub} />

                )
                }
            </div>
        </div>

    );
}

//----------Exportaciones---------//

export default Developers;