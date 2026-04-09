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

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  fullBio: string;
  image: string;
}

export interface TeamCategory {
  category: string;
  doctors: Doctor[];
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
        imgAntes: '/imagenes/labios-antes.png', 
        imgDespues: '/imagenes/labios-despues.png',
        nivelDolor: 'Mínimo',
        anestesia: 'Tópica de grado médico para total confort.',
        resultados: 'Restauración de volúmenes naturales y armonía facial inmediata (12-18 meses).'
      },
      { 
        id: 'hilos', 
        name: 'Hilos Tensores PDO', 
        desc: 'Lifting sin cirugía mediante suturas reabsorbibles de polidioxanona que generan tracción mecánica e inducen neocolagénesis.', 
        imgAntes: '/imagenes/hilos-tensores-antes.png', 
        imgDespues: '/imagenes/hilos-tensores-despueses.png',
        nivelDolor: 'Bajo / Controlado',
        anestesia: 'Local focalizada mediante cánulas de alta precisión.',
        resultados: 'Elevación inmediata de tejidos ptósicos (caídos) y regeneración de colágeno a largo plazo.'
      },
      { 
        id: 'botox', 
        name: 'Toxina Botulínica', 
        desc: 'Denervación química selectiva de músculos mímicos para suavizar arrugas dinámicas (frente, entrecejo, patas de galla).', 
        imgAntes: '/imagenes/armonizacion-facial-antes.png', 
        imgDespues: '/imagenes/armonizacion-facial-despues.png',
        nivelDolor: 'Mínimo (Pinchazo casi imperceptible)',
        anestesia: 'Tópica refrescante previa a la aplicación.',
        resultados: 'Mirada descansada, eliminación de fatiga visual y prevención de surcos profundos.'
      },
      { 
        id: 'aurexis', 
        name: 'Rejuvenecimiento AUREXIS', 
        desc: 'Protocolo exclusivo no invasivo con activos de grado médico que penetran hasta la dermis reticular, reactivando fibroblastos.', 
        imgAntes: '/imagenes/rejuvenecimiento-celular-antes.png', 
        imgDespues: '/imagenes/rejuvenecimiento-celular-despues.png',
        nivelDolor: 'Nulo (Experiencia relajante)',
        anestesia: 'No requiere (Procedimiento no invasivo).',
        resultados: 'Piel luminosa, reparada del sol y con textura refinada desde la primera sesión.'
      },
      { 
        id: 'labios', 
        name: 'Aumento de Labios', 
        desc: 'Volumización con AH respetando la proporción áurea y dinámica del músculo orbicular. Técnica anatómica de alta gama.', 
        imgAntes: '/imagenes/labios-antes.png', 
        imgDespues: '/imagenes/labios-despues.png',
        nivelDolor: 'Controlado',
        anestesia: 'Bloqueo dental opcional o tópica de máxima potencia.',
        resultados: 'Labios definidos, hidratados y simétricos con total naturalidad al hablar.'
      },
      { 
        id: 'menton', 
        name: 'Proyección de Mentón', 
        desc: 'AH de alta reticulación inyectado en plano supraperióstico para avanzar el pogonion y tensar la línea mandibular.', 
        imgAntes: '/imagenes/menton-antes.png', 
        imgDespues: '/imagenes/menton-despues.png',
        nivelDolor: 'Mínimo',
        anestesia: 'Tópica o local suave.',
        resultados: 'Perfil definido, corrección de papada por tracción y mandíbula esculpida.'
      },
      { 
        id: 'rinomodelacion', 
        name: 'Rinomodelación', 
        desc: 'Camuflaje óptico con AH para rectificar perfil nasal, elevar punta y disimular gibas dorsales sin cirugía.', 
        imgAntes: '/imagenes/rinoremodelacion-antes.png', 
        imgDespues: '/imagenes/rinoremodelacion-despues.png',
        nivelDolor: 'Mínimo',
        anestesia: 'Tópica o infiltrado local mínimo.',
        resultados: 'Nariz perfecta en 20 minutos con resultados inmediatos sin hematomas quirúrgicos.'
      },
      { 
        id: 'armonizacion', 
        name: 'Armonización Facial Full', 
        desc: 'Sesión sinérgica que integra AH, botox e hilos tensores con mapa topográfico tridimensional personalizado.', 
        imgAntes: '/imagenes/armonizacion-facial-antes.png', 
        imgDespues: '/imagenes/armonizacion-facial-despues.png',
        nivelDolor: 'Moderado pero controlado',
        anestesia: 'Combinación de local y tópica según la zona del rostro.',
        resultados: 'Transformación global, rejuvenecimiento de 5 a 10 años en una sola cita.'
      },
      { 
        id: 'bichectomia', 
        name: 'Bichectomía', 
        desc: 'Extracción quirúrgica de bolsas adiposas de Bichat para reducir la plenitud geniana y acentuar arcos cigomáticos.', 
        imgAntes: '/imagenes/menton-antes.png', 
        imgDespues: '/imagenes/menton-despues.png',
        nivelDolor: 'Controlable post-quirúrgico',
        anestesia: 'Local profunda (Similar a un tratamiento dental).',
        resultados: 'Rostro perfilado, pómulos marcados y apariencia de mayor delgadez facial.'
      },
      { 
        id: 'blefaroplastia-plasma', 
        name: 'Blefaroplastia (Plasma)', 
        desc: 'Plasma pen que sublima corneocitos y genera retracción tisular inmediata sin bisturí.', 
        imgAntes: '/imagenes/blefaroplastia-antes.png', 
        imgDespues: '/imagenes/blefaroplastia-despues.png',
        nivelDolor: 'Bajo (Sensación de calor)',
        anestesia: 'Tópica potente o local según sensibilidad.',
        resultados: 'Parpados elevados, eliminación de mirada cansada sin cicatrices quirúrgicas.'
      },
      { 
        id: 'limpieza', 
        name: 'Limpieza Facial Profunda', 
        desc: 'Eliminación exhaustiva de impurezas para revitalizar la epidermis y optimizar la permeabilidad cutánea.', 
        imgAntes: '/imagenes/limpieza-facial-antes.bmp', 
        imgDespues: '/imagenes/limpieza-facial-despues.png',
        nivelDolor: 'Mínimo (Solo extracción)',
        anestesia: 'Vapor de ozono y productos calmantes.',
        resultados: 'Piel limpia, oxigenada y lista para absorber tratamientos avanzados.'
      },
      { 
        id: 'peeling', 
        name: 'Peeling Médico', 
        desc: 'Exfoliación química controlada que genera renovación celular acelerada y mejora la textura cutánea.', 
        imgAntes: '/imagenes/peeling-antes.jpg', 
        imgDespues: '/imagenes/peeling-despues.png',
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
      { id: 'depilacion', name: 'Depilación Definitiva', desc: 'Destrucción fototérmica permanente de la papila dérmica.', imgAntes: '/imagenes/labios-antes.png', imgDespues: '/imagenes/labios-despues.png', nivelDolor: 'Mínimo (Cabezal frío)', anestesia: 'Sistema de enfriamiento integrado.', resultados: 'Libertad total del vello y piel suave permanente.' },
      { id: 'tatuajes', name: 'Remoción de Tatuajes', desc: 'Tecnología Q-Switched para fragmentación pigmentaria sin daño tisular colateral.', imgAntes: '/imagenes/acne-antes.png', imgDespues: '/imagenes/acne-despues.png', nivelDolor: 'Moderado', anestesia: 'Tópica o local.', resultados: 'Borrado progresivo del pigmento hasta la eliminación total.' },
      { id: 'acne-laser', name: 'Secuelas de Acné', desc: 'Láser fraccional que destruye tejido cicatricial y estimula colágeno organizado.', imgAntes: '/imagenes/acne-antes.png', imgDespues: '/imagenes/acne-despues.png', nivelDolor: 'Bajo', anestesia: 'Tópica refrescante.', resultados: 'Piel lisa, reducción de "pocitos" y cicatrices visibles.' },
      { id: 'manchas', name: 'Manchas & Pigmentación IPL', desc: 'Luz Pulsada Intensa que fragmenta la melanina para reabsorción linfática.', imgAntes: '/imagenes/peeling-antes.jpg', imgDespues: '/imagenes/peeling-despues.png', nivelDolor: 'Mínimo', anestesia: 'Gel conductor frío.', resultados: 'Tono uniforme y piel radiante sin manchas solares.' },
      { id: 'estrias', name: 'Reducción de Estrías', desc: 'Láser que induce formación de tejido conectivo nuevo en zonas de ruptura de fibras.', imgAntes: '/imagenes/hidrolipoclasia-antes.png', imgDespues: '/imagenes/hidrolipoclasia-despues.png', nivelDolor: 'Mínimo', anestesia: 'Tópica de confort.', resultados: 'Mejora visible del 70-80% en la textura de las estrías.' },
      { id: 'rejuvenecimiento-laser', name: 'Rejuvenecimiento Cutáneo', desc: 'Fototermólisis controlada para remodelación del colágeno dérmico.', imgAntes: '/imagenes/rejuvenecimiento-celular-antes.png', imgDespues: '/imagenes/rejuvenecimiento-celular-despues.png', nivelDolor: 'Mínimo', anestesia: 'No requiere.', resultados: 'Piel tensa, poros cerrados y frescura inmediata.' },
      { id: 'lunares-laser', name: 'Remoción de Lunares (Láser)', desc: 'Ablación láser capa por capa de nevos melanocíticos benignos.', imgAntes: '/imagenes/acne-antes.png', imgDespues: '/imagenes/acne-despues.png', nivelDolor: 'Nulo', anestesia: 'Local inyectada mínima.', resultados: 'Piel limpia de lesiones sin rastro de cicatriz.' }
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
        imgAntes: '/imagenes/rinoplastia-antes.png', 
        imgDespues: '/imagenes/rinoplastia-despues.png',
        nivelDolor: 'Muy Bajo (Sin taponamiento)',
        anestesia: 'General o Sedación con tecnología ultrasónica menos traumática.',
        resultados: 'Nariz perfecta, armonía facial y recuperación ultra rápida (7 días).'
      },
      { 
        id: 'abdominoplastia', 
        name: 'Abdominoplastia', 
        desc: 'Intervención en tres planos: plicatura muscular, resección dermograsa y ombligo.', 
        imgAntes: '/imagenes/abdominoplastia-antes.png', 
        imgDespues: '/imagenes/abdominoplastia-despues.png',
        nivelDolor: 'Moderado (Controlado)',
        anestesia: 'General con protocolos de analgesia avanzada post-op.',
        resultados: 'Abdomen plano, cintura definida y reparación de músculos separados.'
      },
      { 
        id: 'lipoescultura', 
        name: 'Lipoescultura Tumescente', 
        desc: 'Técnica vanguardista que minimiza sangrado y permite esculpir contornos.', 
        imgAntes: '/imagenes/abdominoplastia-antes.png', 
        imgDespues: '/imagenes/abdominoplastia-despues.png',
        nivelDolor: 'Bajo post-operatorio',
        anestesia: 'Tumescente (Lidocaína + Epinefrina) de alta seguridad.',
        resultados: 'Cuerpo atlético, eliminación de grasa rebelde y piel adherida.'
      },
      { 
        id: 'otoplastia', 
        name: 'Otoplastia', 
        desc: 'Corrección de prominencia auricular remodelando el cartílago conchal.', 
        imgAntes: '/imagenes/Otoplastia-antes.png', 
        imgDespues: '/imagenes/Otoplastia-despues.png',
        nivelDolor: 'Mínimo',
        anestesia: 'Local con sedación leve.',
        resultados: 'Orejas en posición natural y fin a los complejos estéticos.'
      },
      { id: 'cicatrices', name: 'Resección de Cicatrices', desc: 'Zetaplastia para reorientar líneas de tensión en cicatrices hipertróficas.', imgAntes: '/imagenes/acne-antes.png', imgDespues: '/imagenes/acne-despues.png', nivelDolor: 'Bajo', anestesia: 'Local.', resultados: 'Cicatriz casi imperceptible y mejora de textura.' },
      { id: 'blefaroplastia-qx', name: 'Blefaroplastia Quirúrgica', desc: 'Resección de exceso de piel y bolsas adiposas de parpados.', imgAntes: '/imagenes/blefaroplastia-antes.png', imgDespues: '/imagenes/blefaroplastia-despues.png', nivelDolor: 'Mínimo', anestesia: 'Local con sedación.', resultados: 'Mirada joven y eliminación de bolsas pesadas permanentemente.' }
    ]
  },
  {
    id: 'dermatologia',
    title: 'Dermatología Clínica',
    items: [
      { id: 'acne', name: 'Acné & Rosácea', desc: 'Control de sebogénesis y reparación cromática con fórmulas magistrales.', imgAntes: '/imagenes/acne-antes.png', imgDespues: '/imagenes/acne-despues.png', nivelDolor: 'Nulo', anestesia: 'Fórmulas tópicas.', resultados: 'Piel sana, libre de granitos y rojeces.' },
      { id: 'lunares', name: 'Remoción de Lunares', desc: 'Extirpación de nevos con imperativo oncológico y análisis de biopsia.', imgAntes: '/imagenes/acne-antes.png', imgDespues: '/imagenes/acne-despues.png', nivelDolor: 'Mínimo', anestesia: 'Local.', resultados: 'Seguridad oncológica y estética dérmica impecable.' },
      { id: 'acrocordones', name: 'Lunares de Carne', desc: 'Cauterización rápida de fibromas en zonas de fricción.', imgAntes: '/imagenes/peeling-antes.jpg', imgDespues: '/imagenes/peeling-despues.png', nivelDolor: 'Mínimo', anestesia: 'Tópica previa.', resultados: 'Adiós a las protuberancias molestas en cuello y axilas.' },
      { id: 'pigmentacion-labios', name: 'Micropigmentación de Labios', desc: 'Tatuaje paramédico para restaurar tono uniforme y definir arco de Cupido.', imgAntes: '/imagenes/micropigmentacion-labial-antes.png', imgDespues: '/imagenes/micropigmentacion-labial-despues.png', nivelDolor: 'Moderado (Molestia leve)', anestesia: 'Tópica de alta potencia.', resultados: 'Labios con color natural radiante todo el día.' },
      { id: 'dermatitis', name: 'Dermatitis & Manchas', desc: 'Manejo de procesos eccematosos y discromías asistido por IPL.', imgAntes: '/imagenes/limpieza-facial-antes.bmp', imgDespues: '/imagenes/limpieza-facial-despues.png', nivelDolor: 'Nulo', anestesia: 'Cuidado tópico.', resultados: 'Alivio de picazón y piel de tono parejo.' }
    ]
  },
  {
    id: 'corporal',
    title: 'Estética Corporal',
    items: [
      { id: 'hidrolipoclasia', name: 'Hidrolipoclasia Ultrasónica', desc: 'Lisis de células grasas mediante inyección hipotónica + cavitación.', imgAntes: '/imagenes/hidrolipoclasia-antes.png', imgDespues: '/imagenes/hidrolipoclasia-despues.png', nivelDolor: 'Mínimo (Solo pinchazo inicial)', anestesia: 'Infiltración local anestésica.', resultados: 'Reducción de medidas reales sin entrar a quirófano.' },
      { id: 'carboxiterapia', name: 'Carboxiterapia', desc: 'Inyección de CO₂ médico que activa el Efecto Bohr para oxigenación tisular.', imgAntes: '/imagenes/abdominoplastia-antes.png', imgDespues: '/imagenes/abdominoplastia-despues.png', nivelDolor: 'Sensación de burbujeo controlada', anestesia: 'No requiere.', resultados: 'Menos celulitis y piel mucho más firme.' },
      { id: 'hiperhidrosis', name: 'Hiperhidrosis (Toxina)', desc: 'Bloqueo de glándulas sudoríparas mediante toxina botulínica intradermal.', imgAntes: '/imagenes/labios-antes.png', imgDespues: '/imagenes/labios-despues.png', nivelDolor: 'Mínimo', anestesia: 'Tópica o frío local.', resultados: 'Adiós al sudor excesivo por 6 a 8 meses.' },
      { id: 'depilacion-corporal', name: 'Depilación Láser Corporal', desc: 'Destrucción fototérmica selectiva en grandes áreas del cuerpo.', imgAntes: '/imagenes/labios-antes.png', imgDespues: '/imagenes/labios-despues.png', nivelDolor: 'Mínimo', anestesia: 'Frío integrado.', resultados: 'Cuerpo libre de vello permanentemente.' }
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
        imgAntes: '/imagenes/implante-capilar-antes.png', 
        imgDespues: '/imagenes/implante-capilar-despues.png',
        nivelDolor: 'Nulo durante cirugía',
        anestesia: 'Local profunda con sedación opcional.',
        resultados: 'Recuperar tu cabello de forma definitiva y natural.'
      },
      { 
        id: 'estimulacion', 
        name: 'Estimulación Capilar Avanzada', 
        desc: 'Mesoterapia con vitaminas y fototerapia LLLT para frenar caída.', 
        imgAntes: '/imagenes/implante-capilar-antes.png', 
        imgDespues: '/imagenes/implante-capilar-despues.png',
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
      { id: 'sonrisa', name: 'Diseño de Sonrisa Digital', desc: 'Protocolo CAD/CAM que calcula dimensiones exactas para armonía facial.', imgAntes: '/imagenes/labios-antes.png', imgDespues: '/imagenes/labios-despues.png', nivelDolor: 'Mínimo', anestesia: 'Varies según procedimiento.', resultados: 'La sonrisa de tus sueños, perfecta y simétrica.' },
      { id: 'carillas', name: 'Carillas Estéticas', desc: 'Láminas ultrafinas adheridas para corregir fracturas o discromías.', imgAntes: '/imagenes/menton-antes.png', imgDespues: '/imagenes/menton-despues.png', nivelDolor: 'Bajo', anestesia: 'Local.', resultados: 'Dientes blancos y alineados sin ortodoncia.' },
      { id: 'implantes', name: 'Implantes Osteointegrados', desc: 'Tornillos de titanio que sustituyen la raíz dental para soporte de coronas.', imgAntes: '/imagenes/blefaroplastia-antes.png', imgDespues: '/imagenes/blefaroplastia-despues.png', nivelDolor: 'Bajo (Controlado)', anestesia: 'Local profunda.', resultados: 'Dientes fijos que se sienten como naturales.' },
      { id: 'blanqueamiento', name: 'Blanqueamiento Dental', desc: 'Blanqueamiento clínico activado por luz de alta seguridad y control de pH.', imgAntes: '/imagenes/labios-antes.png', imgDespues: '/imagenes/labios-despues.png', nivelDolor: 'Mínimo (Sensibilidad temporal)', anestesia: 'Gel desensibilizante previo.', resultados: 'Dientes varios tonos más blancos en una sesión.' }
    ]
  }
];

export const teamData: TeamCategory[] = [
  { 
    category: 'Cirugía Plástica & Reconstructiva', 
    doctors: [
      { 
        id: 'sofia-gualpa',
        name: 'Dra. Sofía Gualpa', 
        specialty: 'Cirugía Plástica & Reconstructiva',
        bio: 'Médica Especialista en Cirugía Plástica (UCE), 10+ años de experiencia clínica.',
        fullBio: 'La Dra. Sofía Gualpa es una referente en cirugía plástica de alta complejidad. Con más de una década de experiencia, se especializa en armonización facial avanzada y cirugía reconstructiva, integrando las últimas tecnologías ultrasónicas para resultados naturales y recuperaciones aceleradas.',
        image: 'https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800'
      },
      { 
        id: 'gery-sanchez',
        name: 'Dr. Gery Sánchez', 
        specialty: 'Cirugía General & Medicina Estética',
        bio: 'Médico Cirujano, Especialista en Cirugía General y Medicina Estética Avanzada (17 años exp).',
        fullBio: 'El Dr. Gery Sánchez combina la precisión de la cirugía general con el arte de la medicina estética. Su enfoque se centra en procedimientos mínimamente invasivos que ofrecen transformaciones significativas sin largos tiempos de recuperación.',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'
      }
    ] 
  },
  { 
    category: 'Medicina Estética & Regenerativa', 
    doctors: [
      { 
        id: 'yoselin-mota',
        name: 'Dra. Yoselin Mota', 
        specialty: 'Medicina Estética & Salud Ocupacional',
        bio: '14+ años de práctica integrando Medicina Estética y Salud Ocupacional.',
        fullBio: 'La Dra. Yoselin Mota es experta en medicina preventiva y regenerativa. Su visión integral garantiza tratamientos que no solo mejoran la estética, sino que promueven la salud a largo plazo de la piel y los tejidos.',
        image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800'
      },
      { 
        id: 'eddymar-lucena',
        name: 'Dra. Eddymar Lucena', 
        specialty: 'Medicina Estética Mínimamente Invasiva',
        bio: 'Especialista en intervenciones estéticas mínimamente invasivas (8 años como cirujano).',
        fullBio: 'La Dra. Eddymar Lucena se especializa en técnicas de inyectables y hilos tensores, logrando un rejuvenecimiento facial armonioso mediante el dominio anatómico y la sensibilidad estética.',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800'
      }
    ] 
  },
  { 
    category: 'Dermatología Clínica & Oncológica', 
    doctors: [
      { 
        id: 'gabriela-torres',
        name: 'Dra. Gabriela Torres', 
        specialty: 'Dermatología & Oncología Cutánea',
        bio: 'Dermatóloga con subespecialidad en Oncología (U. de Barcelona) y maestría en preparados magistrales.',
        fullBio: 'La Dra. Gabriela Torres aporta un rigor oncológico a la dermatología estética. Su especialización en la Universidad de Barcelona le permite diagnosticar y tratar lesiones cutáneas con la máxima seguridad clínica.',
        image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800'
      }
    ] 
  },
  { 
    category: 'Odontología Estética & Rehabilitación', 
    doctors: [
      { 
        id: 'alicia-yepez',
        name: 'Dra. Alicia Yepez', 
        specialty: 'Periodoncia e Implantes',
        bio: 'Periodoncia e Implantes (Formación avanzada en NYU Training).',
        fullBio: 'Con formación en la New York University, la Dra. Alicia Yepez es experta en la restauración de la salud gingival y la colocación de implantes de última generación.',
        image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=800'
      },
      { 
        id: 'arturo-marquez',
        name: 'Dr. Arturo Marquez', 
        specialty: 'Ortodoncia Invisible & Autoligado',
        bio: 'Experto en Ortodoncia y sistemas modernos de ortodoncia invisible autoligada.',
        fullBio: 'El Dr. Arturo Marquez se dedica a alinear sonrisas de forma discreta y eficiente mediante sistemas de ortodoncia invisible, priorizando la comodidad y la estética del paciente.',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800'
      }
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