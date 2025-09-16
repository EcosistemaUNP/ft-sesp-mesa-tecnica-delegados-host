# 📘 Documentación de Usabilidad — Microfrontend Host: Bandeja de Entrada

Este documento describe cómo configurar e integrar un **host** dentro de una arquitectura de **microfrontends** utilizando Vite y React. El objetivo es consumir vistas remotas, como `BandejaEntrada`, desde otros repositorios.

---

## 🧰 Tecnologías Utilizadas

- ⚛️ **React + TypeScript**  
- ⚡ **Vite** como bundler  
- 🔗 **Vite Plugin Federation** para federación de módulos

---

## 🛠️ Instalación y Configuración Inicial

### 1. Instalar el plugin de federación

```bash
npm install @originjs/vite-plugin-federation --save-dev
```

### 2. Configurar el host en `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        bandejaEntrada: 'http://localhost:4173/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
});
```

---

## 🔍 Explicación Técnica

### 🔗 `remotes` vs `exposes`

```ts
remotes: {
  bandejaEntrada: 'http://localhost:4173/assets/remoteEntry.js'
}
```

- `bandejaEntrada` es el nombre del remoto definido en su `vite.config.ts`.
- La URL apunta al archivo `remoteEntry.js` generado por el remoto.
- Si hay múltiples remotos:

```ts
remotes: {
  bandejaEntrada: 'http://localhost:4173/assets/remoteEntry.js',
  nombreRemoto2: 'http://localhost:4174/assets/remoteEntry.js'
}
```

### 📦 `shared`

Las librerías necesarias para las vistas deben definirse explícitamente, aunque ya estén instaladas localmente:

```ts
shared: ['react', 'react-dom', 'react-router-dom']
```

---

## 🧩 Integración de Vistas Remotas

### 1. Crear archivo de declaraciones

Crea `declarations.d.ts` en la raíz del proyecto:

```ts
declare module 'bandejaEntrada/BandejaEntrada';
```

### 2. Ajustar `tsconfig.app.json`

Modifica la propiedad `include`:

```json
"include": ["src", "**/*.d.ts"]
```

Esto permite que TypeScript reconozca los módulos remotos.

---

## 📤 Importar y Renderizar la Vista Remota

Ejemplo de uso en un componente React:

```tsx
import BandejaEntrada from 'bandejaEntrada/BandejaEntrada';

const BandejaEntradaDelegados: React.FC = () => {
  return <BandejaEntrada />;
};
```

> 💡 Asegúrate de que el remoto esté corriendo en el puerto definido. Luego ejecuta `npm run dev` en el host para visualizar la vista integrada.

---

## ✅ Consideraciones Finales

- Verifica que el remoto esté activo y accesible desde la URL configurada.
- Las vistas deben estar correctamente expuestas en el `vite.config.ts` del remoto.
- Las dependencias compartidas deben coincidir entre host y remoto para evitar conflictos.

---

## 🏁 Resultado Esperado

Una vez completados estos pasos, el host podrá consumir y renderizar dinámicamente las vistas remotas como si fueran locales, manteniendo la independencia de cada microfrontend.
