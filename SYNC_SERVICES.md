# 📤 Sincronización de Servicios a Firebase

Los 22 servicios con imágenes locales están listos en `clinic-data.ts`. Este documento explica cómo sincronizarlos a Firebase Firestore.

## ⚡ En 3 pasos:

### 1️⃣ Obtener Firebase Service Account Key

Ve a [Firebase Console](https://console.firebase.google.com/):
1. Selecciona tu proyecto
2. ⚙️ **Configuración** (esquina inferior izquierda)
3. Pestaña **Cuentas de Servicio**
4. Botón **Generar nueva clave privada** (en blanco)
5. Se descargará un JSON

### 2️⃣ Colocar el archivo

- Descargaste un JSON que se llama algo como `sanura-xxxxx.json`
- Renómbralo a `firebase-credentials.json`
- **Colócalo en la raíz del proyecto** (mismo nivel que `package.json`)

```
sanura/
├── firebase-credentials.json  ← AQUÍ
├── package.json
├── src/
├── public/
└── ...
```

### 3️⃣ Ejecutar sincronización

```bash
npm run sync
```

✅ Listo. Los 22 servicios se crearán/actualizarán en Firestore.

## ✨ Qué pasa:

- Importa los servicios de `clinic-data.ts`
- Crea uno nuevo en Firestore si no existe
- Actualiza si ya existe (por ID)
- Incluye nombres, descripciones, imágenes y datos clínicos

## 📋 Verificar:

Accede al Admin Panel después:
```
http://localhost:9002/admin
```

Pestaña: **"Edición de Protocolos"** → Selecciona categoría → Ves todos los servicios

## ⚠️ Importante:

1. **No committees `firebase-credentials.json`** a Git (está en `.gitignore`)
2. **Las imágenes** deben estar en `public/imagenes/` (ya están)
3. **Una sola vez**: El script es idempotente, puedes ejecutarlo varias veces sin problema

## 🔧 Alternativa (manual):

Si quieres hacerlo desde el Admin Panel sin script:
1. Accede a `/admin`
2. Pestaña "Edición de Protocolos"
3. Botón "+ Añadir Protocolo"
4. Llena manualmente cada uno

Pero `npm run sync` es mucho más rápido para 22 servicios.

## ❌ Si algo falla:

**Error: "firebase-credentials.json no encontrado"**
- Descarga nuevamente desde Firebase Console
- Asegúrate de renombrarlo exactamente así: `firebase-credentials.json`
- Colócalo en la raíz (mismo nivel que `package.json`)

**Error: "Insufficient permissions"**
- Firebase está rechazando las credenciales
- Intenta generar una nueva clave privada en Firebase Console

**Las imágenes no cargan después de sincronizar**
- Ve al Admin Panel
- Verifica que las rutas digan `/imagenes/xxx-antes.png`, `/imagenes/xxx-despues.png`
- Si faltan: verifica que esos archivos existan en `public/imagenes/`

