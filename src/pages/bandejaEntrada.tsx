
import BandejaEntrada from 'bandejaEntrada/BandejaEntrada';
import { useNavigate } from 'react-router-dom';

const BandejaEntradaDelegados: React.FC = () => {

    const navigate = useNavigate();

    return (
        <>



            {BandejaEntrada ? <BandejaEntrada
                subtitle="Titulo de prueba desde el host"
                extraButtons={[
                    {
                        label: "Ir a Entrevista",
                        onClick: () => navigate('/sesp/gps/delegados/estudio')
                    },

                    {
                        label: "Ir a Informe",
                        onClick: () => navigate('/sesp/gps/delegados/estudio')
                    }
                ]}
            /> : <p> Cargando Componente</p>}

        </>
    );
}
export default BandejaEntradaDelegados;

