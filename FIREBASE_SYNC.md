# 🔄 Sincronización de Servicios - Guía Rápida

## ¿Qué pasó?

Anteriormente habías actualizado los 22 servicios en `clinic-data.ts` con imágenes locales en lugar de placeholders. 

**Problema**: Los servicios que ves en el admin panel provienen de **Firebase Firestore**, no de `clinic-data.ts`.

**Solución**: He creado herramientas para sincronizar esos 22 servicios desde `clinic-data.ts` hacia Firebase.

---

## 🚀 Cómo sincronizar:

### Paso 1: Credenciales Firebase
Accede a [Firebase Console](https://console.firebase.google.com/) y:
1. Selecciona tu proyecto
2. ⚙️ Configuración (esquina inferior)
3. Pestaña "Cuentas de Servicio"
4. "Generar nueva clave privada" → Descarga el JSON
5. Renombra a `firebase-credentials.json`
6. **Copia a la raíz del proyecto** (mismo nivel que `package.json`)

### Paso 2: Ejecutar
```bash
npm run sync
```

✅ **Listo**. Los 22 servicios se sincronizarán a Firebase automáticamente.

---

## 📍 Archivos creados:

| Archivo | Propósito |
|---------|-----------|
| `scripts/sync-to-firebase.mjs` | Script que sincroniza clinic-data.ts → Firebase |
| `src/app/api/admin/sync-services/route.ts` | Endpoint API alternativo para sincronizar |
| `SYNC_SERVICES.md` | Documentación detallada |
| `package.json` | Agregué comando: `npm run sync` |

---

## ✨ Qué hace el script:

✅ Lee los 22 servicios de `clinic-data.ts`
✅ Conecta a Firebase usando credenciales
✅ Busca si cada servicio ya existe
✅ **Crea** si es nuevo
✅ **Actualiza** si ya existe
✅ Muestra reporte con estadísticas

---

## 🎯 Después de sincronizar:

1. Accede a `http://localhost:9002/admin`
2. Pestaña "Edición de Protocolos"
3. Selecciona una categoría
4. Ves todos los 22 servicios con imágenes locales

---

## 🔧 Opción: API endpoint

También puedes sincronizar usando la API directamente:
```bash
curl -X POST http://localhost:9002/api/admin/sync-services \
  -H "Authorization: Bearer tu_token_aqui"
```

*Requiere variable `ADMIN_SYNC_TOKEN` en `.env.local`*

---

## ❌ Troubleshooting:

**"firebase-credentials.json no encontrado"**
→ Asegúrate de colocarlo en la raíz (mismo nivel que `package.json`)

**"Insufficient permissions"**
→ Genera una nueva clave privada en Firebase Console

**"Las imágenes aún no cargan"**
→ Verifica que existan en `public/imagenes/` con los nombres exactos

---

🎉 **Ya está todo listo. Solo falta: `npm run sync`**
