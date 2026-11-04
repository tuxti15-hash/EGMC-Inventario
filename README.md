# EGMC Inventario

EGMC Inventario es un prototipo web para registrar materiales y herramientas de una constructora. Permite consultar qué artículos hay, dónde están y cuáles necesitan reposición.

## Funciones

- Agregar, editar y eliminar artículos.
- Registrar nombre, código, categoría, ubicación, unidad, existencias, mínimo y precio.
- Buscar artículos y filtrar por categoría o nivel de existencias.
- Registrar entradas y salidas, evitando retirar más unidades de las disponibles.
- Consultar movimientos recientes.
- Descargar el inventario como CSV para abrirlo en Excel.
- Consultar el valor estimado del inventario y las alertas de stock bajo.

## Uso

Abre `index.html` en un navegador actualizado. No requiere instalar paquetes ni levantar un servidor. El inventario de muestra aparece al abrir la página por primera vez; el archivo `inventario.csv` contiene esa misma lista.

## Archivos

- `index.html`: estructura de la página y formularios.
- `styles.css`: diseño adaptable a escritorio y móvil.
- `app.js`: artículos, filtros, cálculos, movimientos y exportación.
- `inventario.csv`: artículos de muestra en formato CSV.

## Cálculos

El valor del inventario suma las existencias de cada artículo multiplicadas por su precio unitario. Se muestra **Stock bajo** cuando las existencias llegan al mínimo o quedan por debajo.

## Alcance

Es un prototipo local. Los cambios se conservan en `localStorage` del navegador y no se sincronizan entre dispositivos. No incluye cuentas de usuario, base de datos compartida ni respaldos remotos. Los artículos iniciales son ficticios y deben sustituirse antes de usar el sistema con información real.

