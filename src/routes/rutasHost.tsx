import { Route } from "react-router-dom";
import BandejaEntradaDelegados from "../pages/bandejaEntrada";
import EstudioPage from "../pages/estudio";

export const RutasHost = () =>(
    <Route path="sesp/gps/delegados">
        <Route path="bandejaEntrada" element={<BandejaEntradaDelegados/>} />
        <Route path="estudio" element={<EstudioPage/> } />
    </Route>
    
)