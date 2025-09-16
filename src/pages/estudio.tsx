
import Estudio from 'bandejaEntrada/Estudio';


const Estudiovw: React.FC = () => {


    return (
        <>



            {Estudio ? <Estudio/> : <p> Cargando Componente</p>}

        </>
    );
}
export default Estudiovw;

