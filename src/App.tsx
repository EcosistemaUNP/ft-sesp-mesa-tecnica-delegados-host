import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./shared/home";
import { RutasHost } from "../src/routes/rutasHost";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {RutasHost()}
    </Routes>
  );
}

export default App;
