# Backend API — Cine

API REST en Node.js + Express + MySQL2 para conectar la base de datos `cine_db` con la app móvil de Expo.

## Requisitos
- Node.js instalado
- MySQL instalado y corriendo
- Base de datos `cine_db` ya creada con tus tablas (`Directores`, `Categorias`, `Peliculas`)

## Instalación

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con tus credenciales de MySQL
```

## Ejecutar

```bash
npm run dev
# El servidor escucha en http://localhost:3000
```

## Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/directores` | Lista todos los directores |
| GET | `/api/categorias` | Lista todas las categorías |
| GET | `/api/peliculas` | Lista todas las películas con director y categoría |
| GET | `/api/peliculas/:id` | Detalle de una película |
| GET | `/api/directores/:id/peliculas` | Películas de un director |
| GET | `/api/categorias/:id/peliculas` | Películas de una categoría |

## Conectar desde la app móvil

La app móvil no puede usar `http://localhost:3000` cuando corre en un emulador o dispositivo físico, porque `localhost` se refiere al propio dispositivo.

Usa la IP de tu computadora dentro de la red Wi-Fi:

- **Android Emulator:** `http://10.0.2.2:3000`
- **iOS Simulator:** `http://localhost:3000`
- **Dispositivo físico:** la IP de tu PC en el Wi-Fi, ej. `http://192.168.1.15:3000`

Configura esa URL en el archivo `.env` del proyecto Expo (ver `EXPO_PUBLIC_API_URL`).

## Datos de prueba

Si quieres poblar la base con datos de ejemplo para probar la API:

```bash
mysql -u tu_usuario -p cine_db < backend/seed.sql
```
