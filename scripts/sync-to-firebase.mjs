#!/usr/bin/env node

/**
 * Script para sincronizar servicios de clinic-data.ts a Firebase Firestore
 * Uso: node scripts/sync-to-firebase.mjs
 */

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function syncServices() {
  try {
    // Buscar credenciales
    const credPath = path.resolve(process.cwd(), 'firebase-credentials.json');
    
    if (!fs.existsSync(credPath)) {
      console.error('❌ No encontré firebase-credentials.json en la raíz del proyecto');
      console.error('📍 Esperado en:', credPath);
      console.error('\n📖 Instrucciones:');
      console.error('1. Ve a https://console.firebase.google.com/');
      console.error('2. Selecciona tu proyecto');
      console.error('3. ⚙️ Configuración → Cuentas de Servicio');
      console.error('4. "Generar nueva clave privada"');
      console.error('5. Guarda como firebase-credentials.json en la raíz\n');
      process.exit(1);
    }

    const credentials = JSON.parse(fs.readFileSync(credPath, 'utf-8'));

    // Inicializar Firebase Admin
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
    }

    const db = admin.firestore();
    
    // Cargar datos de clinic-data.ts
    const dataPath = path.resolve(process.cwd(), 'src/lib/clinic-data.ts');
    
    // Parseador simple para extraer serviciosData del archivo TypeScript
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    
    // Importar dinámicamente (esto es un workaround para TS)
    console.log('📂 Leyendo clinic-data.ts...\n');

    // Crear un módulo temporal que podamos importar
    const tmpFile = path.resolve(process.cwd(), '.tmp-clinic-data.mjs');
    const clinicDataContent = fileContent
      .replace(/export const serviciosData/, 'export const serviciosData')
      .replace(/export const teamData/, 'export const teamData')
      .replace(/export const clinicStats/, 'export const clinicStats')
      .replace(/export const clinicContact/, 'export const clinicContact')
      .replace(/export const guiaData/, 'export const guiaData')
      .replace(/interface /g, '// interface ')
      .replace(/: Category\[\]/, '')
      .replace(/: TeamCategory\[\]/, '')
      .replace(/: any\[\]/, '')
      .replace(/: {/, ': {');

    fs.writeFileSync(tmpFile, clinicDataContent);
    
    const { serviciosData } = await import(tmpFile);
    
    // Limpiar archivo temporal
    fs.unlinkSync(tmpFile);

    let syncedCount = 0;
    let createdCount = 0;
    let updatedCount = 0;
    const errors = [];

    // Sincronizar cada categoría
    for (const category of serviciosData) {
      console.log(`📂 ${category.title}`);

      for (const treatment of category.items) {
        try {
          // Buscar documento existente
          const query = await db.collection('services').where('id', '==', treatment.id).get();

          const serviceData = {
            id: treatment.id,
            categoryId: category.id,
            name: treatment.name,
            desc: treatment.desc,
            imgAntes: treatment.imgAntes,
            imgDespues: treatment.imgDespues,
            nivelDolor: treatment.nivelDolor,
            anestesia: treatment.anestesia,
            resultados: treatment.resultados,
            quote: treatment.resultados,
            updatedAt: new Date(),
          };

          if (query.empty) {
            // Crear nuevo
            await db.collection('services').add(serviceData);
            createdCount++;
            console.log(`   ✅ NUEVO: ${treatment.name}`);
          } else {
            // Actualizar existente
            const docId = query.docs[0].id;
            await db.collection('services').doc(docId).update(serviceData);
            updatedCount++;
            console.log(`   ✏️  ACTUALIZADO: ${treatment.name}`);
          }

          syncedCount++;
        } catch (err) {
          const msg = `❌ ${treatment.id}: ${err.message}`;
          errors.push(msg);
          console.error(`   ${msg}`);
        }
      }
      console.log('');
    }

    // Resumen
    console.log('\n═══════════════════════════════════════════════');
    console.log('✨ SINCRONIZACIÓN COMPLETADA');
    console.log('═══════════════════════════════════════════════\n');
    console.log(`📊 Resultados:`);
    console.log(`   ✅ Total procesados: ${syncedCount}`);
    console.log(`   ✨ Creados: ${createdCount}`);
    console.log(`   ✏️  Actualizados: ${updatedCount}`);

    if (errors.length > 0) {
      console.log(`   ❌ Errores: ${errors.length}\n`);
      errors.forEach(e => console.error(`      ${e}`));
    }

    console.log('\n🎉 Los servicios ya están en Firestore');
    console.log('📧 Ve a http://localhost:9002/admin para editarlos\n');

    // Desconectar de Firebase
    await admin.app().delete();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error fatal:', error);
    process.exit(1);
  }
}

syncServices();
