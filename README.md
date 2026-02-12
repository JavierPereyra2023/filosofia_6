# Filosofía 6to Grado

Plataforma web educativa de filosofía para estudiantes de 6to grado, diseñada con un estilo tipo revista digital periodística.

## 📚 Descripción

Este proyecto presenta 6 unidades didácticas de filosofía, cada una estructurada en 8 secciones pedagógicas:

1. **Problema Inicial** - Introducción al problema filosófico
2. **Contexto Histórico** - Historia y filósofos clave
3. **Conceptos Fundamentales** - Definiciones y ejemplos
4. **Mapa Argumental** - Estructura lógica de los argumentos
5. **Comparación de Posturas** - Diferentes perspectivas filosóficas
6. **Aplicación Contemporánea** - Relevancia en el mundo actual
7. **Actividad Interactiva** - Cuestionarios de comprensión interpretativa
8. **Síntesis y Reflexión** - Resumen y preguntas para reflexionar

## ✨ Características

- **Diseño Responsivo**: Funciona en móviles, tablets y desktop
- **Modo Oscuro**: Toggle para cambiar entre tema claro y oscuro
- **Interactividad**: Cuestionarios interpretativos con feedback inmediato
- **Accesibilidad**: Navegación por teclado, contraste adecuado
- **Sin Frameworks**: HTML, CSS y JavaScript puro
- **GitHub Pages Ready**: Fácil de desplegar

## 🚀 Estructura del Proyecto

```
filosofia_6/
├── index.html                    # Página principal
├── units/                        # Páginas de unidades
│   ├── unit-1.html
│   ├── unit-2.html
│   └── ...
├── assets/
│   ├── css/                      # Estilos
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── typography.css
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── navigation.css
│   │   └── responsive.css
│   ├── js/                       # JavaScript
│   │   ├── dark-mode.js
│   │   ├── navigation.js
│   │   ├── interactions.js
│   │   └── activities/
│   │       ├── comprehension-quiz.js
│   │       └── utils.js
│   └── images/                   # Imágenes
│       ├── hero/
│       ├── units/
│       ├── icons/
│       └── content/
├── README.md
└── .gitignore
```

## 🎨 Paleta de Colores

### Modo Claro
- Fondo primario: `#ffffff`
- Fondo secundario: `#f7f7f7`
- Texto: `#1a1a1a`
- Acento: `#0066cc`

### Modo Oscuro
- Fondo primario: `#1a1a1a`
- Fondo secundario: `#242424`
- Texto: `#e8e8e8`
- Acento: `#4d9fff`

## 📝 Uso

### Visualización Local

1. Clona este repositorio
2. Abre `index.html` en tu navegador
3. No se requiere servidor local (pero se recomienda para mejor experiencia)

### Servidor Local (Opcional)

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
http-server

# Con PHP
php -S localhost:8000
```

Luego visita `http://localhost:8000`

## 🌐 Despliegue en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y la carpeta root `/`
4. Guarda y espera unos minutos
5. Tu sitio estará disponible en `https://[tu-usuario].github.io/[nombre-repo]/`

## 🛠️ Personalización

### Cambiar Colores

Edita `assets/css/variables.css` y modifica las variables CSS:

```css
:root {
  --color-accent: #0066cc; /* Tu color de acento */
}
```

### Agregar Contenido

1. Para las unidades: Edita los archivos en `units/`
2. Para la página principal: Edita `index.html`
3. Agrega imágenes en `assets/images/`

### Cuestionarios

Edita el array `quizQuestions` en cada `unit-N.html`:

```javascript
const quizQuestions = [
  {
    text: 'Texto filosófico...',
    question: '¿Pregunta interpretativa?',
    options: [
      { text: 'Opción A', correct: false, feedback: 'Explicación...' },
      { text: 'Opción B', correct: true, feedback: 'Explicación...' }
    ]
  }
];
```

## 📱 Compatibilidad

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari iOS 14+
- Chrome Android 90+

## 📄 Licencia

Material educativo para uso académico.

## 🤝 Contribuciones

Este es un proyecto educativo. Para sugerencias o mejoras, contacta con el profesor responsable.

## 📧 Contacto

Para más información sobre este proyecto educativo, contacta con tu profesor de filosofía.

---

Desarrollado con ❤️ para estudiantes de 6to grado
