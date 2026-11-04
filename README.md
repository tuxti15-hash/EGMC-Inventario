# EGMC Inventario

## Ficha de entrega

- Estudiante: **[escribe tu nombre]**
- Materia: **[escribe la materia]**
- Docente: **[escribe el nombre del docente]**
- Grupo: **[escribe tu grupo]**

## Planteamiento

En una obra se usan materiales, herramientas y equipo distintos. Si no se lleva un registro de cantidades y ubicación, cuesta saber qué hace falta reponer. EGMC Inventario es un prototipo para practicar ese control desde una página web sencilla.

## Objetivo

Registrar artículos por obra o almacén, consultar sus existencias y guardar entradas y salidas. El sistema también señala los artículos que llegaron al mínimo indicado.

## Funciones

- Agregar, editar y eliminar artículos.
- Guardar nombre, código, categoría, ubicación, unidad de medida, cantidad, mínimo y precio unitario.
- Buscar por nombre, código, categoría o ubicación.
- Filtrar por categoría y por nivel de existencias.
- Registrar entradas y salidas. Una salida mayor al inventario disponible se rechaza.
- Consultar los movimientos recientes.
- Descargar el inventario como CSV para abrirlo en Excel.
- Ver un resumen con el valor calculado del inventario y las alertas de stock bajo.

## Cómo abrirlo

Descarga el repositorio y abre `index.html` en un navegador actualizado. No hace falta instalar paquetes ni levantar un servidor.

Al abrirlo por primera vez aparecen datos de ejemplo. Puedes agregarlos, editarlos o eliminarlos desde la página. El archivo `inventario.csv` contiene esa misma lista de muestra.

## Archivos del proyecto

- `index.html`: estructura de la página y formularios.
- `styles.css`: colores, distribución y adaptación a pantallas pequeñas.
- `app.js`: datos, filtros, cálculos, movimientos y exportación.
- `inventario.csv`: inventario de muestra en formato CSV.

## Cómo funciona el cálculo

El valor del inventario se obtiene multiplicando las existencias de cada artículo por su precio unitario y sumando esos resultados. Un artículo se marca como **Stock bajo** cuando sus existencias son iguales o menores al mínimo capturado.

## Alcance y limitaciones

Es un prototipo académico que funciona en un solo navegador. Los cambios se guardan en `localStorage`, así que no se comparten con otros equipos ni usuarios. No incluye inicio de sesión, base de datos en servidor, respaldos, compras a proveedores ni control de permisos. Los artículos incluidos son ficticios y deben reemplazarse antes de usar el sistema con datos reales.

## Autoría y apoyos

Completa este apartado de acuerdo con las reglas de tu materia: indica quién participó en el desarrollo y qué herramientas de apoyo se utilizaron.

