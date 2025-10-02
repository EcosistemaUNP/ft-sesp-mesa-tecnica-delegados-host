import React from 'react';

const Configuracion = React.lazy(() => import('delegados/Configuracion'));

const ConfiguracionHost: React.FC = () => {
    return (
        <>
            <React.Suspense fallback={<p>Cargando Configuración...</p>}>
                <Configuracion/>
            </React.Suspense>
        </>
    );
}

export default ConfiguracionHost;
