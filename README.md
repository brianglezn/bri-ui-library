# Bri UI Library

Librería de componentes de UI para proyectos personales. Incluye componentes reutilizables con estilos personalizados usando CSS Modules.

## Características

- 🧩 Componentes reutilizables
- 🎨 Estilos con CSS Modules
- 📱 Diseño responsive
- �� Testing con Jest
- 🔄 Soporte para TypeScript

## Instalación

```bash
npm install @brianglezn/bri-ui
```

## Uso

```jsx
import { Button } from '@brianglezn/bri-ui';

function App() {
  return (
    <div>
      <Button variant="primary" size="medium" onClick={() => console.log('Clicked!')}>
        Haz clic aquí
      </Button>
    </div>
  );
}
```

## Componentes disponibles

- Button

## Desarrollo

### Requisitos previos

- Node.js (v14 o superior)
- npm (v6 o superior)

### Comandos disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Construir la librería
npm run build
```

## Licencia

ISC
