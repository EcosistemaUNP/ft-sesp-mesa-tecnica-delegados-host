
import React from 'react';

const Estudio = React.lazy(() => import('delegados/Estudio'));

const Estudiovw: React.FC = () => {
    return (
        <>
            <React.Suspense fallback={<p>Cargando Componente...</p>}>
                <Estudio/>
            </React.Suspense>
        </>
    );
}
export default Estudiovw;

