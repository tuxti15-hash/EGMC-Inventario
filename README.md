# EGMC Inventario

## Presentación

EGMC Inventario es un prototipo web para llevar el control de materiales y herramientas de una constructora. La idea es facilitar una tarea cotidiana de almacén: saber qué hay, dónde está y cuándo hace falta reponerlo.

## Qué permite hacer

- Consultar el número de artículos, el valor calculado del inventario y los artículos debajo de su mínimo.
- Registrar materiales y herramientas con código, categoría, ubicación y unidad de medida.
- Editar artículos y registrar entradas o salidas de almacén.
- Buscar por nombre, código, categoría o ubicación.
- Filtrar la tabla por categoría y nivel de existencias.
- Descargar las existencias en un archivo CSV que se puede abrir en Excel.

## Cómo usarlo

Abre `index.html` en un navegador actualizado. En la primera apertura se muestran datos de ejemplo. Usa **Nuevo artículo** para registrar uno, los controles de la última columna para editar o eliminar, y **Descargar CSV** para exportar el inventario.

## Archivos y tecnologías

- `index.html`: contenido y formularios.
- `styles.css`: diseño de escritorio y móvil.
- `app.js`: inventario, filtros, movimientos y descarga CSV.
- `inventario.csv`: artículos de demostración en formato CSV.
- HTML, CSS y JavaScript sin librerías externas.

Los cambios se guardan en `localStorage` del navegador. Por eso, el prototipo funciona en un solo equipo y no sincroniza información entre usuarios.

## Alcance

Este proyecto sirve como demostración académica de un flujo de inventario. Los artículos iniciales son ficticios. No tiene cuentas de usuario, base de datos en servidor, permisos por persona ni respaldo remoto; antes de usarlo en una obra real habría que agregar esas partes.

