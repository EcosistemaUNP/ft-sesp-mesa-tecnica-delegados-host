import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({ //Import del mcirofront
      name:"host",
      remotes:{
        delegados:"http://localhost:4173/assets/remoteEntry.js"
      },
      shared: [
        "react", 
        "react-dom", 
        "react-router-dom"
      ]
    }),
  ],

  build: { //Configuracion de compilacion
    modulePreload:false,
    target:"esnext",
    minify:false,
    cssCodeSplit:false
  },
});
