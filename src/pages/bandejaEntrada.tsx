
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BandejaEntrada = React.lazy(() => import('delegados/BandejaEntrada'));

const BandejaEntradaDelegados: React.FC = () => {

    const navigate = useNavigate();

    return (
        <>
            <React.Suspense fallback={<p>Cargando Componente...</p>}>
                <BandejaEntrada
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
                />
            </React.Suspense>
        </>
    );
}
export default BandejaEntradaDelegados;

