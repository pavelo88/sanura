/**
 * @fileOverview Master Data para Clínica Sanura - Edición Editorial 2026.
 */

export interface Treatment {
  id: string;
  name: string;
  desc: string;
  imgAntes: string;
  imgDespues: string;
  nivelDolor: string;
  anestesia: string;
  resultados: string;
}

export interface Category {
  id: string;
  title: string;
  items: Treatment[];
}

export const serviciosData: Category[] = [
  {
    id: 'facial',
    title: 'Estética Facial',
    items: [
      { 
        id: 'hialuronico', 
        name: 'Ácido Hialurónico', 
        desc: 'Rellenos de alta reticulación para volumetría labial, proyección de mentón y surcos nasogenianos. Biocompatible y con efecto hidratante inmediato.', 
        imgAntes: 'https://picsum.photos/seed/facial1/800/800', 
        imgDespues: 'https://picsum.photos/seed/facial2/800/800',
        nivelDolor: 'Mínimo',
        anestesia: 'Tópica de grado médico para total confort.',
        resultados: 'Restauración de volúmenes naturales y armonía facial inmediata (12-18 meses).'
      },
      { 
        id: 'hilos', 
        name: 'Hilos Tensores PDO', 
        desc: 'Lifting sin cirugía mediante suturas reabsorbibles de polidioxanona que generan tracción mecánica e inducen neocolagénesis.', 
        imgAntes: 'https://picsum.photos/seed/facial3/800/800', 
        imgDespues: 'https://picsum.photos/seed/facial4/800/800',
        nivelDolor: 'Bajo / Controlado',
        anestesia: 'Local focalizada mediante cánulas de alta precisión.',
        resultados: 'Elevación inmediata de tejidos ptósicos (caídos) y regeneración de colágeno a largo plazo.'
      },
      { 
        id: 'botox', 
        name: 'Toxina Botulínica', 
        desc: 'Denervación química selectiva de músculos mímicos para suavizar arrugas dinámicas (frente, entrecejo, patas de gallo).', 
        imgAntes: 'https://picsum.photos/seed/facial5/800/800', 
        imgDespues: 'https://picsum.photos/seed/facial6/800/800',
        nivelDolor: 'Mínimo (Pinchazo casi imperceptible)',
        anestesia: 'Tópica refrescante previa a la aplicación.',
        resultados: 'Mirada descansada, eliminación de fatiga visual y prevención de surcos profundos.'
      },
      { 
        id: 'aurexis', 
        name: 'Rejuvenecimiento AUREXIS', 
        desc: 'Protocolo exclusivo no invasivo con activos de grado médico que penetran hasta la dermis reticular, reactivando fibroblastos.', 
        imgAntes: 'https://picsum.photos/seed/celular1/800/800', 
        imgDespues: 'https://picsum.photos/seed/celular2/800/800',
        nivelDolor: 'Nulo (Experiencia relajante)',
        anestesia: 'No requiere (Procedimiento no invasivo).',
        resultados: 'Piel luminosa, reparada del sol y con textura refinada desde la primera sesión.'
      },
      { 
        id: 'labios', 
        name: 'Aumento de Labios', 
        desc: 'Volumización con AH respetando la proporción áurea y dinámica del músculo orbicular. Técnica anatómica de alta gama.', 
        imgAntes: 'https://picsum.photos/seed/lip1/800/800', 
        imgDespues: 'https://picsum.photos/seed/lip2/800/800',
        nivelDolor: 'Controlado',
        anestesia: 'Bloqueo dental opcional o tópica de máxima potencia.',
        resultados: 'Labios definidos, hidratados y simétricos con total naturalidad al hablar.'
      },
      { 
        id: 'menton', 
        name: 'Proyección de Mentón', 
        desc: 'AH de alta reticulación inyectado en plano supraperióstico para avanzar el pogonion y tensar la línea mandibular.', 
        imgAntes: 'https://picsum.photos/seed/chin1/800/800', 
        imgDespues: 'https://picsum.photos/seed/chin2/800/800',
        nivelDolor: 'Mínimo',
        anestesia: 'Tópica o local suave.',
        resultados: 'Perfil definido, corrección de papada por tracción y mandíbula esculpida.'
      },
      { 
        id: 'rinomodelacion', 
        name: 'Rinomodelación', 
        desc: 'Camuflaje óptico con AH para rectificar perfil nasal, elevar punta y disimular gibas dorsales sin cirugía.', 
        imgAntes: 'https://picsum.photos/seed/naso1/800/800', 
        imgDespues: 'https://picsum.photos/seed/naso2/800/800',
        nivelDolor: 'Mínimo',
        anestesia: 'Tópica o infiltrado local mínimo.',
        resultados: 'Nariz perfecta en 20 minutos con resultados inmediatos sin hematomas quirúrgicos.'
      },
      { 
        id: 'armonizacion', 
        name: 'Armonización Facial Full', 
        desc: 'Sesión sinérgica que integra AH, botox e hilos tensores con mapa topográfico tridimensional personalizado.', 
        imgAntes: 'https://picsum.photos/seed/harm1/800/800', 
        imgDespues: 'https://picsum.photos/seed/harm2/800/800',
        nivelDolor: 'Moderado pero controlado',
        anestesia: 'Combinación de local y tópica según la zona del rostro.',
        resultados: 'Transformación global, rejuvenecimiento de 5 a 10 años en una sola cita.'
      },
      { 
        id: 'bichectomia', 
        name: 'Bichectomía', 
        desc: 'Extracción quirúrgica de bolsas adiposas de Bichat para reducir la plenitud geniana y acentuar arcos cigomáticos.', 
        imgAntes: 'https://picsum.photos/seed/bich1/800/800', 
        imgDespues: 'https://picsum.photos/seed/bich2/800/800',
        nivelDolor: 'Controlable post-quirúrgico',
        anestesia: 'Local profunda (Similar a un tratamiento dental).',
        resultados: 'Rostro perfilado, pómulos marcados y apariencia de mayor delgadez facial.'
      },
      { 
        id: 'blefaroplastia-plasma', 
        name: 'Blefaroplastia (Plasma)', 
        desc: 'Plasma pen que sublima corneocitos y genera retracción tisular inmediata sin bisturí.', 
        imgAntes: 'https://picsum.photos/seed/bleph1/800/800', 
        imgDespues: 'https://picsum.photos/seed/bleph2/800/800',
        nivelDolor: 'Bajo (Sensación de calor)',
        anestesia: 'Tópica potente o local según sensibilidad.',
        resultados: 'Parpados elevados, eliminación de mirada cansada sin cicatrices quirúrgicas.'
      },
      { 
        id: 'limpieza', 
        name: 'Limpieza Facial Profunda', 
        desc: 'Eliminación exhaustiva de impurezas para revitalizar la epidermis y optimizar la permeabilidad cutánea.', 
        imgAntes: 'https://picsum.photos/seed/clean1/800/800', 
        imgDespues: 'https://picsum.photos/seed/clean2/800/800',
        nivelDolor: 'Mínimo (Solo extracción)',
        anestesia: 'Vapor de ozono y productos calmantes.',
        resultados: 'Piel limpia, oxigenada y lista para absorber tratamientos avanzados.'
      },
      { 
        id: 'peeling', 
        name: 'Peeling Médico', 
        desc: 'Exfoliación química controlada que genera renovación celular acelerada y mejora la textura cutánea.', 
        imgAntes: 'https://picsum.photos/seed/peel1/800/800', 
        imgDespues: 'https://picsum.photos/seed/peel2/800/800',
        nivelDolor: 'Mínimo (Sensación de picor leve)',
        anestesia: 'No requiere (Aplicación tópica de ácidos).',
        resultados: 'Adiós a las manchas superficiales y piel de porcelana.'
      }
    ]
  },
  {
    id: 'laser',
    title: 'Medicina Láser',
    items: [
      { id: 'depilacion', name: 'Depilación Definitiva', desc: 'Destrucción fototérmica permanente de la papila dérmica.', imgAntes: 'https://picsum.photos/seed/laser1/800/800', imgDespues: 'https://picsum.photos/seed/laser2/800/800', nivelDolor: 'Mínimo (Cabezal frío)', anestesia: 'Sistema de enfriamiento integrado.', resultados: 'Libertad total del vello y piel suave permanente.' },
      { id: 'tatuajes', name: 'Remoción de Tatuajes', desc: 'Tecnología Q-Switched para fragmentación pigmentaria sin daño tisular colateral.', imgAntes: 'https://picsum.photos/seed/laser3/800/800', imgDespues: 'https://picsum.photos/seed/laser4/800/800', nivelDolor: 'Moderado', anestesia: 'Tópica o local.', resultados: 'Borrado progresivo del pigmento hasta la eliminación total.' },
      { id: 'acne-laser', name: 'Secuelas de Acné', desc: 'Láser fraccional que destruye tejido cicatricial y estimula colágeno organizado.', imgAntes: 'https://picsum.photos/seed/laser5/800/800', imgDespues: 'https://picsum.photos/seed/laser6/800/800', nivelDolor: 'Bajo', anestesia: 'Tópica refrescante.', resultados: 'Piel lisa, reducción de "pocitos" y cicatrices visibles.' },
      { id: 'manchas', name: 'Manchas & Pigmentación IPL', desc: 'Luz Pulsada Intensa que fragmenta la melanina para reabsorción linfática.', imgAntes: 'https://picsum.photos/seed/laser7/800/800', imgDespues: 'https://picsum.photos/seed/laser8/800/800', nivelDolor: 'Mínimo', anestesia: 'Gel conductor frío.', resultados: 'Tono uniforme y piel radiante sin manchas solares.' },
      { id: 'estrias', name: 'Reducción de Estrías', desc: 'Láser que induce formación de tejido conectivo nuevo en zonas de ruptura de fibras.', imgAntes: 'https://picsum.photos/seed/laser9/800/800', imgDespues: 'https://picsum.photos/seed/laser10/800/800', nivelDolor: 'Mínimo', anestesia: 'Tópica de confort.', resultados: 'Mejora visible del 70-80% en la textura de las estrías.' },
      { id: 'rejuvenecimiento-laser', name: 'Rejuvenecimiento Cutáneo', desc: 'Fototermólisis controlada para remodelación del colágeno dérmico.', imgAntes: 'https://picsum.photos/seed/laser11/800/800', imgDespues: 'https://picsum.photos/seed/laser12/800/800', nivelDolor: 'Mínimo', anestesia: 'No requiere.', resultados: 'Piel tensa, poros cerrados y frescura inmediata.' },
      { id: 'lunares-laser', name: 'Remoción de Lunares (Láser)', desc: 'Ablación láser capa por capa de nevos melanocíticos benignos.', imgAntes: 'https://picsum.photos/seed/laser13/800/800', imgDespues: 'https://picsum.photos/seed/laser14/800/800', nivelDolor: 'Nulo', anestesia: 'Local inyectada mínima.', resultados: 'Piel limpia de lesiones sin rastro de cicatriz.' }
    ]
  },
  {
    id: 'cirugia',
    title: 'Cirugía Plástica',
    items: [
      { 
        id: 'rinoplastia', 
        name: 'Rinoplastia Ultrasónica', 
        desc: 'Osteotomía piezoeléctrica que corta el hueso sin dañar tejidos blandos.', 
        imgAntes: 'https://picsum.photos/seed/surg1/800/800', 
        imgDespues: 'https://picsum.photos/seed/surg2/800/800',
        nivelDolor: 'Muy Bajo (Sin taponamiento)',
        anestesia: 'General o Sedación con tecnología ultrasónica menos traumática.',
        resultados: 'Nariz perfecta, armonía facial y recuperación ultra rápida (7 días).'
      },
      { 
        id: 'abdominoplastia', 
        name: 'Abdominoplastia', 
        desc: 'Intervención en tres planos: plicatura muscular, resección dermograsa y ombligo.', 
        imgAntes: 'https://picsum.photos/seed/surg5/800/800', 
        imgDespues: 'https://picsum.photos/seed/surg6/800/800',
        nivelDolor: 'Moderado (Controlado)',
        anestesia: 'General con protocolos de analgesia avanzada post-op.',
        resultados: 'Abdomen plano, cintura definida y reparación de músculos separados.'
      },
      { 
        id: 'lipoescultura', 
        name: 'Lipoescultura Tumescente', 
        desc: 'Técnica vanguardista que minimiza sangrado y permite esculpir contornos.', 
        imgAntes: 'https://picsum.photos/seed/surg3/800/800', 
        imgDespues: 'https://picsum.photos/seed/surg4/800/800',
        nivelDolor: 'Bajo post-operatorio',
        anestesia: 'Tumescente (Lidocaína + Epinefrina) de alta seguridad.',
        resultados: 'Cuerpo atlético, eliminación de grasa rebelde y piel adherida.'
      },
      { 
        id: 'otoplastia', 
        name: 'Otoplastia', 
        desc: 'Corrección de prominencia auricular remodelando el cartílago conchal.', 
        imgAntes: 'https://picsum.photos/seed/surg7/800/800', 
        imgDespues: 'https://picsum.photos/seed/surg8/800/800',
        nivelDolor: 'Mínimo',
        anestesia: 'Local con sedación leve.',
        resultados: 'Orejas en posición natural y fin a los complejos estéticos.'
      },
      { id: 'cicatrices', name: 'Resección de Cicatrices', desc: 'Zetaplastia para reorientar líneas de tensión en cicatrices hipertróficas.', imgAntes: 'https://picsum.photos/seed/surg9/800/800', imgDespues: 'https://picsum.photos/seed/surg10/800/800', nivelDolor: 'Bajo', anestesia: 'Local.', resultados: 'Cicatriz casi imperceptible y mejora de textura.' },
      { id: 'blefaroplastia-qx', name: 'Blefaroplastia Quirúrgica', desc: 'Resección de exceso de piel y bolsas adiposas de parpados.', imgAntes: 'https://picsum.photos/seed/surg11/800/800', imgDespues: 'https://picsum.photos/seed/surg12/800/800', nivelDolor: 'Mínimo', anestesia: 'Local con sedación.', resultados: 'Mirada joven y eliminación de bolsas pesadas permanentemente.' }
    ]
  },
  {
    id: 'dermatologia',
    title: 'Dermatología Clínica',
    items: [
      { id: 'acne', name: 'Acné & Rosácea', desc: 'Control de sebogénesis y reparación cromática con fórmulas magistrales.', imgAntes: 'https://picsum.photos/seed/derm1/800/800', imgDespues: 'https://picsum.photos/seed/derm2/800/800', nivelDolor: 'Nulo', anestesia: 'Fórmulas tópicas.', resultados: 'Piel sana, libre de granitos y rojeces.' },
      { id: 'lunares', name: 'Remoción de Lunares', desc: 'Extirpación de nevos con imperativo oncológico y análisis de biopsia.', imgAntes: 'https://picsum.photos/seed/derm3/800/800', imgDespues: 'https://picsum.photos/seed/derm4/800/800', nivelDolor: 'Mínimo', anestesia: 'Local.', resultados: 'Seguridad oncológica y estética dérmica impecable.' },
      { id: 'acrocordones', name: 'Lunares de Carne', desc: 'Cauterización rápida de fibromas en zonas de fricción.', imgAntes: 'https://picsum.photos/seed/derm5/800/800', imgDespues: 'https://picsum.photos/seed/derm6/800/800', nivelDolor: 'Mínimo', anestesia: 'Tópica previa.', resultados: 'Adiós a las protuberancias molestas en cuello y axilas.' },
      { id: 'pigmentacion-labios', name: 'Micropigmentación de Labios', desc: 'Tatuaje paramédico para restaurar tono uniforme y definir arco de Cupido.', imgAntes: 'https://picsum.photos/seed/derm7/800/800', imgDespues: 'https://picsum.photos/seed/derm8/800/800', nivelDolor: 'Moderado (Molestia leve)', anestesia: 'Tópica de alta potencia.', resultados: 'Labios con color natural radiante todo el día.' },
      { id: 'dermatitis', name: 'Dermatitis & Manchas', desc: 'Manejo de procesos eccematosos y discromías asistido por IPL.', imgAntes: 'https://picsum.photos/seed/derm9/800/800', imgDespues: 'https://picsum.photos/seed/derm10/800/800', nivelDolor: 'Nulo', anestesia: 'Cuidado tópico.', resultados: 'Alivio de picazón y piel de tono parejo.' }
    ]
  },
  {
    id: 'corporal',
    title: 'Estética Corporal',
    items: [
      { id: 'hidrolipoclasia', name: 'Hidrolipoclasia Ultrasónica', desc: 'Lisis de células grasas mediante inyección hipotónica + cavitación.', imgAntes: 'https://picsum.photos/seed/body1/800/800', imgDespues: 'https://picsum.photos/seed/body2/800/800', nivelDolor: 'Mínimo (Solo pinchazo inicial)', anestesia: 'Infiltración local anestésica.', resultados: 'Reducción de medidas reales sin entrar a quirófano.' },
      { id: 'carboxiterapia', name: 'Carboxiterapia', desc: 'Inyección de CO₂ médico que activa el Efecto Bohr para oxigenación tisular.', imgAntes: 'https://picsum.photos/seed/body3/800/800', imgDespues: 'https://picsum.photos/seed/body4/800/800', nivelDolor: 'Sensación de burbujeo controlada', anestesia: 'No requiere.', resultados: 'Menos celulitis y piel mucho más firme.' },
      { id: 'hiperhidrosis', name: 'Hiperhidrosis (Toxina)', desc: 'Bloqueo de glándulas sudoríparas mediante toxina botulínica intradermal.', imgAntes: 'https://picsum.photos/seed/body5/800/800', imgDespues: 'https://picsum.photos/seed/body6/800/800', nivelDolor: 'Mínimo', anestesia: 'Tópica o frío local.', resultados: 'Adiós al sudor excesivo por 6 a 8 meses.' },
      { id: 'depilacion-corporal', name: 'Depilación Láser Corporal', desc: 'Destrucción fototérmica selectiva en grandes áreas del cuerpo.', imgAntes: 'https://picsum.photos/seed/body7/800/800', imgDespues: 'https://picsum.photos/seed/body8/800/800', nivelDolor: 'Mínimo', anestesia: 'Frío integrado.', resultados: 'Cuerpo libre de vello permanentemente.' }
    ]
  },
  {
    id: 'capilar',
    title: 'Medicina Capilar',
    items: [
      { 
        id: 'implante', 
        name: 'Implante Capilar FUE', 
        desc: 'Extracción microfolicular e implantación milimétrica en áreas despobladas.', 
        imgAntes: 'https://picsum.photos/seed/hair1/800/800', 
        imgDespues: 'https://picsum.photos/seed/hair2/800/800',
        nivelDolor: 'Nulo durante cirugía',
        anestesia: 'Local profunda con sedación opcional.',
        resultados: 'Recuperar tu cabello de forma definitiva y natural.'
      },
      { 
        id: 'estimulacion', 
        name: 'Estimulación Capilar Avanzada', 
        desc: 'Mesoterapia con vitaminas y fototerapia LLLT para frenar caída.', 
        imgAntes: 'https://picsum.photos/seed/hair3/800/800', 
        imgDespues: 'https://picsum.photos/seed/hair4/800/800',
        nivelDolor: 'Mínimo (Solo micro-pinchazos)',
        anestesia: 'No requiere.',
        resultados: 'Cabello más grueso, denso y fin a la caída activa.'
      }
    ]
  },
  {
    id: 'odontologia',
    title: 'Odontología Estética',
    items: [
      { id: 'sonrisa', name: 'Diseño de Sonrisa Digital', desc: 'Protocolo CAD/CAM que calcula dimensiones exactas para armonía facial.', imgAntes: 'https://picsum.photos/seed/dent1/800/800', imgDespues: 'https://picsum.photos/seed/dent2/800/800', nivelDolor: 'Mínimo', anestesia: 'Varies según procedimiento.', resultados: 'La sonrisa de tus sueños, perfecta y simétrica.' },
      { id: 'carillas', name: 'Carillas Estéticas', desc: 'Láminas ultrafinas adheridas para corregir fracturas o discromías.', imgAntes: 'https://picsum.photos/seed/dent3/800/800', imgDespues: 'https://picsum.photos/seed/dent4/800/800', nivelDolor: 'Bajo', anestesia: 'Local.', resultados: 'Dientes blancos y alineados sin ortodoncia.' },
      { id: 'implantes', name: 'Implantes Osteointegrados', desc: 'Tornillos de titanio que sustituyen la raíz dental para soporte de coronas.', imgAntes: 'https://picsum.photos/seed/dent5/800/800', imgDespues: 'https://picsum.photos/seed/dent6/800/800', nivelDolor: 'Bajo (Controlado)', anestesia: 'Local profunda.', resultados: 'Dientes fijos que se sienten como naturales.' },
      { id: 'blanqueamiento', name: 'Blanqueamiento Dental', desc: 'Blanqueamiento clínico activado por luz de alta seguridad y control de pH.', imgAntes: 'https://picsum.photos/seed/dent7/800/800', imgDespues: 'https://picsum.photos/seed/dent8/800/800', nivelDolor: 'Mínimo (Sensibilidad temporal)', anestesia: 'Gel desensibilizante previo.', resultados: 'Dientes varios tonos más blancos en una sesión.' }
    ]
  }
];

export const teamData = [
  { 
    category: 'Cirugía Plástica & Reconstructiva', 
    doctors: [
      { name: 'Dra. Sofía Gualpa', bio: 'Médica Especialista en Cirugía Plástica (UCE), 10+ años de experiencia clínica.' },
      { name: 'Dr. Gery Sánchez', bio: 'Médico Cirujano, Especialista en Cirugía General y Medicina Estética Avanzada (17 años exp).' }
    ] 
  },
  { 
    category: 'Medicina Estética & Regenerativa', 
    doctors: [
      { name: 'Dra. Yoselin Mota', bio: '14+ años de practice integrando Medicina Estética y Salud Ocupacional.' },
      { name: 'Dra. Eddymar Lucena', bio: 'Especialista en intervenciones estéticas mínimamente invasivas (8 años como cirujano).' }
    ] 
  },
  { 
    category: 'Dermatología Clínica & Oncológica', 
    doctors: [
      { name: 'Dra. Gabriela Torres', bio: 'Dermatóloga con subespecialidad en Oncología (U. de Barcelona) y maestría en preparados magistrales.' }
    ] 
  },
  { 
    category: 'Odontología Estética & Rehabilitación', 
    doctors: [
      { name: 'Dra. Alicia Yepez', bio: 'Periodoncia e Implantes (Formación avanzada en NYU Training).' },
      { name: 'Dr. Arturo Marquez', bio: 'Experto en Ortodoncia y sistemas modernos de ortodoncia invisible autoligada.' },
      { name: 'Dra. Heidy González', bio: 'Especialista en Endodoncia y Microcirugía Apical (10 años exp).' },
      { name: 'Dra. Yumali Murillo', bio: 'Rehabilitación Oral, Orofacial y Prótesis Implantosoportada.' }
    ] 
  }
];

export const clinicStats = [
  { label: 'Casos de Éxito', value: '15.000+' },
  { label: 'Especialistas', value: '10' },
  { label: 'Recomendación', value: '100%' },
  { label: 'Años de Excelencia', value: '15+' }
];

export const clinicContact = {
  phone: '02 600 1785',
  whatsapp: '096 220 4998',
  address: 'Italia N32-25 y Mariana de Jesús, Quito',
  email: 'info@clinicasanura.com',
  hours: 'L-V: 09:00 - 19:00 | Sáb: 09:00 - 14:00',
  appointmentHours: 'Citas Médicas: 10:00 - 18:00'
};

export const guiaData = [
  {
    id: 1,
    necesidad: "Armonización Facial",
    solucion: "Protocolos de Rejuvenecimiento Celular y ácido hialurónico para una arquitectura de proporciones naturales.",
    recuperacion: "Inmediata (24-48h)",
    duracion: "12 - 18 meses"
  },
  {
    id: 2,
    necesidad: "Remodelación Estructural",
    solucion: "Cirugía Plástica avanzada (Rinoplastia Ultrasónica / Lipoescultura HD) bajo rigor hospitalario.",
    recuperacion: "5-10 días (Quirúrgico)",
    duracion: "Permanente"
  },
  {
    id: 3,
    necesidad: "Salud Dermatológica",
    solucion: "Tratamientos específicos para Acné, Rosácea y remoción oncológica de lesiones cutáneas.",
    recuperacion: "3 - 5 días",
    duracion: "Progresiva / Terapéutica"
  }
];