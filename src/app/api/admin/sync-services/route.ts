import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { serviciosData } from '@/lib/clinic-data';

// Inicializar Firebase Admin
let db: any;

try {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');
  if (!getApps().length && Object.keys(serviceAccount).length > 0) {
    initializeApp({
      credential: cert(serviceAccount),
    });
  }
  db = getFirestore();
} catch (error) {
  console.error('Firebase Admin init error:', error);
}

export async function POST(req: NextRequest) {
  try {
    // Verificar que sea una solicitud local o autorizada
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SYNC_TOKEN}` && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Firebase not initialized' }, { status: 500 });
    }

    let syncedCount = 0;
    const errors: string[] = [];

    // Iterar sobre todas las categorías y servicios
    for (const category of serviciosData) {
      for (const treatment of category.items) {
        try {
          // Buscar si el servicio ya existe por ID
          const servicesRef = db.collection('services');
          const query = servicesRef.where('id', '==', treatment.id);
          const snapshot = await query.get();

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
            quote: treatment.resultados, // Usar resultados como quote
            updatedAt: new Date(),
          };

          if (snapshot.empty) {
            // Crear nuevo documento
            await servicesRef.add(serviceData);
            syncedCount++;
          } else {
            // Actualizar documento existente
            const docId = snapshot.docs[0].id;
            await servicesRef.doc(docId).update(serviceData);
            syncedCount++;
          }
        } catch (err: any) {
          errors.push(`Error syncing ${treatment.id}: ${err.message}`);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Sincronizados ${syncedCount} servicios`,
      syncedCount,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: error.message || 'Error syncing services' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SYNC_TOKEN}` && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json({ error: 'Firebase not initialized' }, { status: 500 });
    }

    const servicesRef = db.collection('services');
    const snapshot = await servicesRef.get();

    return NextResponse.json({
      totalServices: snapshot.size,
      services: snapshot.docs.map((doc: any) => ({
        dbId: doc.id,
        ...doc.data()
      }))
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error fetching services' },
      { status: 500 }
    );
  }
}
