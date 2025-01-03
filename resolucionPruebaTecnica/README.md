
# Beer Filter Project

Este es un proyecto donde puedes filtrar cervezas por diferentes categorías (Rubia, Morena, Roja). Utiliza Handlebars para la renderización de productos, y mantiene los filtros seleccionados en el almacenamiento local para mantener la persistencia entre recargas de página.

## Características

- Filtro de cervezas por tipo (Rubia, Morena, Roja).
- Visualización de la cantidad de cervezas filtradas.
- Persistencia de filtros a través de `localStorage` para mantener la selección de filtros entre recargas de la página.
- Botón para limpiar todos los filtros aplicados.
- Modal para mostrar las opciones de filtro.

## Tecnologías Utilizadas

- **HTML**
- **CSS**
- **JavaScript**
- **Handlebars** (para la generación dinámica de HTML)
- **localStorage** (para persistir la selección de filtros)
  
## Estructura del Proyecto

El proyecto está organizado en las siguientes carpetas y archivos:

```
/src
  /components
    /Button
      Button.js     # Componente del botón
  /data
    data.json       # Datos de las cervezas
  /styles
    styles.css      # Estilos CSS
  /template
    productTemplate.hbs # Plantilla Handlebars para productos
  index.js         # Lógica principal del proyecto
  index.html       # Página principal
```

## Instalación

### Requisitos previos

Para comenzar, asegúrate de tener **Node.js** instalado. Si no lo tienes, descárgalo e instálalo desde su [página oficial](https://nodejs.org/).

### Pasos para ejecutar el proyecto

1. **Clonar el repositorio**:

   ```
   git clone https://github.com/tu-usuario/beer-filter.git
   ```

2. **Instalar dependencias**:

   Navega a la carpeta del proyecto y ejecuta:

   ```
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:

   Si estás utilizando un servidor de desarrollo, puedes usar:

   ```
   npm start
   ```

4. Abre tu navegador y navega a `http://localhost:3000` para ver el proyecto en acción.

## Uso

1. Al cargar la página, todos los productos (cervezas) serán mostrados.
2. Puedes filtrar las cervezas utilizando los checkboxes disponibles en el modal, que se abre al hacer clic en el botón de "Filtrar".
3. El número de cervezas filtradas se mostrará junto al botón "Filtrar".
4. Puedes limpiar los filtros haciendo clic en el botón "Limpiar" (se encuentra dentro del modal).
5. Los filtros aplicados se guardarán en el almacenamiento local, lo que garantiza que cuando recargues la página, los filtros seleccionados se mantendrán.

## Funcionalidades Clave

### Filtro de cervezas
El filtro permite al usuario seleccionar uno o más tipos de cervezas (Rubia, Morena, Roja). Los resultados se actualizan dinámicamente cuando se cambia la selección.

### Persistencia con Local Storage
Los filtros seleccionados se almacenan en el almacenamiento local del navegador. Esto significa que si recargas la página, los filtros aplicados anteriormente se mantendrán activos.

### Modal de Filtros
El modal que contiene las opciones de filtro se abre al hacer clic en el botón de "Filtrar", y se cierra cuando el usuario hace clic en el botón de cierre.

### Deshabilitar el botón de limpiar
El botón "Limpiar" está deshabilitado hasta que al menos un filtro esté seleccionado.

## Mejoras Futuras

- Agregar más categorías de filtros.
- Añadir un sistema de paginación para mostrar más productos.
- Mejorar la accesibilidad, como agregar descripciones a los botones y enlaces.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b nueva-funcionalidad`).
3. Haz tus cambios y confírmalos (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin nueva-funcionalidad`).
5. Crea un pull request describiendo tus cambios.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
