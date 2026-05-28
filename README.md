# Flux Ops (Offline-first)

Proyecto base: Electron + React + TypeScript + SQLite (better-sqlite3).

Quick start (Windows):

# Flux Ops (Offline-first)

Proyecto base: Electron + React + TypeScript + SQLite (sql.js in main, `better-sqlite3` for CLI scripts).

## Quick start (Windows)

1. Instalar dependencias

```powershell
npm install
```

2. Ejecutar en desarrollo

```powershell
npm run dev
```

3. Para construir y generar instalador

```powershell
npm run build
npm run dist
```

## Notas importantes

- La base de datos local `cafeteria.db` se crea en la carpeta de `userData` de la app (por ejemplo: `%APPDATA%\cafeteria-pos\cafeteria.db`).
- El main process expone APIs seguras via `preload.ts` y están disponibles en el renderer como `window.api`.
- Tablas principales: `ingredients`, `products`, `recipes`, `sales`, `users`.

## CSV Import / Export

Scripts útiles (desde la raíz del repo):

- Exportar inventario: `node scripts/export_inventory_csv.js` → genera `inventory.csv` en el repo y en `userData`.
- Importar inventario: `node scripts/import_inventory_csv.js inventory.csv`
- Exportar recetas: `node scripts/export_recipes_csv.js`
- Importar recetas: `node scripts/import_recipes_csv.js recipes.csv`
- Exportar productos: `node scripts/export_products_csv.js`

> Recomendación: hacer backup antes de importar:

```powershell
copy "$env:APPDATA\cafeteria-pos\cafeteria.db" "$env:APPDATA\cafeteria-pos\cafeteria.db.bak"
```

## Imágenes de productos

Se añadió un importador y un flujo para imágenes:

- Coloca las imágenes en `public/productos/` con nombres que coincidan (o muy similares) al nombre del producto.
- Ejecuta el importador (desde la raíz del repo):

```powershell
node scripts/import_product_images_from_repo.js public/productos
```

- El script copia las imágenes a la carpeta de la app: `%APPDATA%\cafeteria-pos\product_images\<productId>\` y opcionalmente actualiza la columna `image_url` en la tabla `products`.
- La app sirve estas imágenes con un protocolo interno `local-image://` y el renderer usará `window.api.invoke('getProductImagePath', productId)` para obtener la URL.

Si un archivo no empareja (ej. `expresso.png` vs `Espresso`), renómbralo y vuelve a ejecutar el import.

## APIs IPC expuestas (resumen)

- `getProducts()` — devuelve lista de productos.
- `getProductImagePath(productId)` — devuelve `local-image://` URL (o null).
- `sellProduct(productId, qty)` — registra venta; evita ventas si no hay stock.
- `getInventory()`, `getRecipes()`, `getUsers()`, `createUser()`, `login()` — operaciones de gestión.
- `exportInventory`, `exportRecipes`, `exportProducts` — forzar export CSV.

## Login y usuarios

- Se añadió tabla `users` y handlers de `createUser` / `login`.
- Usuario de prueba: `Admin` / `admin` (cambiar en producción).

## Notas sobre native modules (CLI scripts)

- Algunos scripts usan `better-sqlite3` (módulo nativo). Si al ejecutar los scripts obtienes errores por ABI mismatch, corre:

```powershell
npm rebuild
```

y luego reintenta el script.

## Recargar la app durante desarrollo

- Después de cambiar código del `main` o `preload`, reinicia el proceso de Electron / `npm run dev`.
- Para recargar solo el renderer en la app abierta, presiona `Ctrl+R`.

## Dónde están las imágenes en tiempo de ejecución

- Las imágenes importadas se copian a: `%APPDATA%\cafeteria-pos\product_images\<productId>\`.
- El renderer solicita la ruta mediante `getProductImagePath` y el main sirve el archivo via `local-image://`.

## Próximos pasos sugeridos

- Añadir botón en la UI para ejecutar el import de imágenes por IPC.
- Mejorar la gestión de usuarios (roles/administración) y usar hashing fuerte (bcrypt) para contraseñas.
- Optimizar y generar thumbnails WebP para servir versiones pequeñas en POS.

Si quieres, actualizo este `README.md` con ejemplos más detallados (puedo añadir una sección de troubleshooting con mensajes de error frecuentes).
