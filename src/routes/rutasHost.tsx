import React from "react";
import { Route } from "react-router-dom";
import BandejaEntradaDelegados from "../pages/bandejaEntrada";
import EstudioPage from "../pages/estudio";
import Demo from "../pages/demo";
import ConfiguracionHost from "../pages/configuracion";

// Importar componentes remotos para sesiones
const SesionDelegados = React.lazy(() => import('delegados/SesionDelegados'));

export const RutasHost = () =>(
    <Route path="sesp/gps/delegados">
        <Route path="bandejaEntrada" element={<BandejaEntradaDelegados/>} />
        <Route path="estudio" element={<EstudioPage/> } />
        <Route path="demo" element={<Demo/> } />
        <Route path="configuracion" element={<ConfiguracionHost/> } />
        <Route path="sesion/:codigo" element={
            <React.Suspense fallback={<div>Cargando sesión...</div>}>
                <SesionDelegados/>
            </React.Suspense>
        } />
    </Route>
    
)