# 🏠 Microfrontend Host — Consumo de Bandeja de Entrada

Este repositorio implementa el **host** dentro de una arquitectura de **microfrontends**.  
Su función principal es **consumir vistas** expuestas por uno o varios **remotos**, como por ejemplo `BandejaEntrada`.

---

## 🚀 Tecnologías

- ⚛️ React + TypeScript  
- ⚡ Vite como bundler  
- 🔗 Vite Plugin Federation  

---

## 📦 Instalación

Instala el plugin necesario para habilitar la federación entre microfrontends:

npm install @originjs/vite-plugin-federation --save-dev

Ahora, iremos a la configuracion basica para el host dentro de vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        bandejaEntrada: "http://localhost:4173/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom", "react-router-dom"]
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false
  },
})

**Explicacion Tecnica**: Como se puede ver, dentro del host, se tiene una estructura similar al config del remoto, pero cambian cosas importantes, en este caso, se explicara parte por parte las diferencias.
**remotes en lugar de exposes**:
remotes: {
  bandejaEntrada: "http://localhost:4173/assets/remoteEntry.js"
}
En este caso, bandejaEntrada es el nombre del remoto que se va a consumir.
La url a la que apunta, es en donde se encuentra el archivo remoteEntry.js, archivo el cual es generado por el remoto, y como se menciono en la documentacion del remoto, el host, es el que consume este archivo para dar la vista dniamica.
Esta url corresponde en este caso a produccion local con el puerto de produccion definido para el remoto.
El nombre bandejaEntrada es el definido dentro del viteconfig del remoto

**aclaracion**: si se exportaron 2 vistas, se aclara mas adelante como llamarlas
**aclaracion 2**: en caso de ser vistas de diferentes repositorios, seria en este caso algo por este estilo lo que deberia estar:
*bandejaEntrada: "http://localhost:4173/assets/remoteEntry.js",*
*nombreRemoto2: "http://localhost:4174/assets/remoteEntry.js"*

**shared**:Como se menciono dentro del shared del remoto, deben estar definidas las librerias que necesitan las vistas, aunque esten instaladas en el repositorio, se deben definir en este apartado

***Creacion de archivos y ajuste en app.json***
Una vez que ya definimos las configuraciones para el viteconfig del host, tendremos que hacer unos ligeros ajustes antes de llamar las vistas al host. dado que TS no tiene forma de saber que en este caso los imports que se van a realizar para las vistas estan dentro del proyecto, ya que no existen dentro del mismo, por lo cual por eso antes de llamar las vistas, se debe de:
**1**: Crear un archivo llamado *"declarations.d.ts"* dentro de la carpeta del proyecto, donde se definiran los imports de las vistas, en este caso, se definio de la siguiente manera:
declare module "bandejaEntrada/BandejaEntrada";
**2**:Dentro del archivo tsconfig.app.json, se debe ir a la linea de include, la cual por defecto deberia estar de la siguiente manera:
*"include": ["src"]*
Entonces, para que reconozca los archivos d.ts como el que acabamos de crear en su analiiss, debemos definirlo de la siguiente manera:
*"include": ["src", "**/*.d.ts"]*


***Exportacion de las vistas***: Una vez que tenemos toda esta configuracion, podemos ir al lugar donde se quiere exporta la vista y podremos hacerlo sin problema de la siguiente manera

*import BandejaEntrada from 'bandejaEntrada/BandejaEntrada';*
y llamar dentro de la declaracion del componente funcional o vista donde se quiere ver la visual del remoto, en este caso de ejemplo fue en la vista bandeja de entrada, para este ejemplo hay mas cosas cono un navigate pero es por parametros adicionales no relacionados con el proceso puntual de microfront, definiriamos la vista que queremos llamar dentro del return


import BandejaEntrada from 'bandejaEntrada/BandejaEntrada';
const BandejaEntradaDelegados: React.FC = () => {
  return(
    <BandejaEntrada/>
  );
}

**Fin**: Si en este punto tenemos el remoto ejecutandose en produccion, podemos ejecutar npm run dev para ver la vista exportada del mismo