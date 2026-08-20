# Portfolio Web

Portfolio personal moderno y elegante construido con React.

## Caracteristicas

- **Seccion Hero**: Presentacion personal con foto y descripcion
- **Proyectos**: Grid de proyectos con links a GitHub
- **Habilidades**: Barras de progreso animadas
- **Contacto**: Formulario de contacto funcional
- **Navegacion**: Scroll suave entre secciones
- **Responsive**: Diseno adaptable a cualquier dispositivo

## Stack Tecnico

- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **CSS Modules** - Estilos encapsulados

## Arquitectura

| Nivel | Descripcion | Ejemplos |
|-------|-------------|----------|
| **Atoms** | Elementos basicos | SkillBadge, NavLink |
| **Molecules** | Combinaciones de atoms | ProjectCard, ContactForm |
| **Organisms** | Secciones completas | Hero, Projects, Skills, Contact |
| **Templates** | Layouts de pagina | PortfolioTemplate |

## Instalacion

```bash
# Clonar
git clone https://github.com/JesusMelville/portfolio-web.git

# Instalar
cd portfolio-web
npm install

# Ejecutar
npm run dev
```

## Comandos

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build para produccion |
| `npm run preview` | Vista previa del build |

## Personalizar

Edita `src/data/profile.js` para cambiar tu informacion, proyectos y habilidades.

## Licencia

MIT
