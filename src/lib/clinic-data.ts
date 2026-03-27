
/**
 * @fileOverview Data maestra de la clínica N-VITALITY.
 * Centraliza los 26 servicios, la guía rápida y las estadísticas de experiencia.
 */

export interface Treatment {
  id: string;
  name: string;
  desc: string;
  imgAntes: string;
  imgDespues: string;
}

export interface Category {
  id: string;
  title: string;
  items: Treatment[];
}

export const serviciosData: Category[] = [
  {
    id: '01_medicina_estetica_facial',
    title: 'Estética Facial & Inyectables',
    items: [
      { id: '01_botox', name: 'Neuromoduladores', desc: 'Prevención y tratamiento de rítides dinámicas (frente, entrecejo, patas de gallo). Efecto lifting sin pérdida de expresión facial.', imgAntes: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=800&q=80' },
      { id: '02_hialuronico', name: 'Ácido Hialurónico', desc: 'Reposición de volumen profundo (pómulos, mentón, perfilamiento mandibular). Efecto "Tense & Lift" para una arquitectura facial estructurada.', imgAntes: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800&q=80' },
      { id: '03_rinomodelacion', name: 'Rinomodelación', desc: 'Perfilamiento y elevación de la punta nasal con ácido hialurónico de alta densidad. Corrección del caballete en tan solo 20 minutos sin cirugía.', imgAntes: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80' },
      { id: '04_hilos', name: 'Hilos Tensores', desc: 'Efecto lifting no quirúrgico mediante hilos de polidioxanona que reposicionan los tejidos caídos e inducen la formación de colágeno.', imgAntes: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80' },
      { id: '05_meso_facial', name: 'Mesoterapia Facial', desc: 'Infusión subdérmica de un cóctel de vitaminas, antioxidantes y péptidos para una revitalización profunda y luminosidad extrema.', imgAntes: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80' },
      { id: '06_bioestimuladores', name: 'Bioestimuladores', desc: 'Inducción de una red biológica de colágeno propio (Radiesse/Sculptra) que tensa la piel de rostro y cuello progresivamente.', imgAntes: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80' },
      { id: '07_prp', name: 'Plasma Rico en Plaquetas', desc: 'Regeneración celular utilizando factores de crecimiento autólogos extraídos de su propia sangre para mejorar calidad y textura de piel.', imgAntes: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&q=80' }
    ]
  },
  {
    id: '02_estetica_facial_aparatologia',
    title: 'Aparatología Facial',
    items: [
      { id: '08_limpieza', name: 'Limpieza Facial Médica', desc: 'Protocolo dermatológico profundo para extracción de impurezas, control de sebo y optimización de la barrera cutánea.', imgAntes: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?w=800&q=80' },
      { id: '09_microdermoabrasion', name: 'Microdermoabrasión', desc: 'Exfoliación mecánica de grado médico con puntas de diamante para barrer células muertas y atenuar poros dilatados.', imgAntes: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80' },
      { id: '10_peeling', name: 'Peeling Químico', desc: 'Renovación celular controlada con ácidos médicos específicos para unificar el tono y tratar cicatrices superficiales.', imgAntes: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1541844053589-346841d0b34c?w=800&q=80' },
      { id: '11_radiofrecuencia', name: 'Radiofrecuencia', desc: 'Tensado cutáneo térmico no invasivo. Estimula las fibras de colágeno y elastina reduciendo la flacidez del óvalo facial.', imgAntes: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80' },
      { id: '12_hifu', name: 'HIFU', desc: 'Ultrasonido focalizado de alta intensidad. Alcanza el plano muscular (SMAS) logrando un efecto lifting sin pasar por quirófano.', imgAntes: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80' }
    ]
  },
  {
    id: '03_tratamientos_corporales',
    title: 'Tratamientos Corporales',
    items: [
      { id: '13_hidro', name: 'Hidrolipoclasia', desc: 'Destrucción de grasa localizada mediante infiltración de suero y ondas de ultrasonido para modelar flancos y abdomen.', imgAntes: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80' },
      { id: '14_carboxi', name: 'Carboxiterapia', desc: 'Infiltración subcutánea de CO2 médico para mejorar la oxigenación tisular, combatiendo celulitis, estrías y flacidez.', imgAntes: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80' },
      { id: '15_preso', name: 'Presoterapia', desc: 'Drenaje linfático mecanizado que elimina la retención de líquidos, toxinas y pesadez en piernas, mejorando la circulación.', imgAntes: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80' },
      { id: '16_cavitacion', name: 'Cavitación', desc: 'Implosión de células grasas mediante ondas de ultrasonido de baja frecuencia. Alternativa indolora a la liposucción pequeña.', imgAntes: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80' },
      { id: '17_crio', name: 'Criolipólisis', desc: 'Destrucción definitiva del adipocito mediante congelamiento controlado (apoptosis), ideal para reducir tallas en zonas rebeldes.', imgAntes: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' },
      { id: '18_masajes', name: 'Masajes Reductores', desc: 'Remodelación manual profunda y aparatología para romper nódulos de grasa y afinar la silueta progresivamente.', imgAntes: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80' }
    ]
  },
  {
    id: '04_dermatologia_laser',
    title: 'Dermatología Láser',
    items: [
      { id: '19_depilacion', name: 'Depilación Láser', desc: 'Eliminación definitiva del folículo piloso mediante tecnología láser de diodo. Piel suave, sin irritaciones ni foliculitis.', imgAntes: 'https://images.unsplash.com/photo-1607008829749-c0f284a49fc7?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80' },
      { id: '20_manchas', name: 'Láser Manchas (IPL)', desc: 'Destrucción del pigmento melánico por fototermólisis para borrar pecas, lentigos solares y melasma crónico.', imgAntes: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80' },
      { id: '21_tatuajes', name: 'Eliminación Tatuajes', desc: 'Fragmentación de tinta subdérmica con láser Nd:YAG. El sistema inmunológico reabsorbe las partículas borrando el diseño.', imgAntes: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1611601322175-ef8ec8c85f01?w=800&q=80' },
      { id: '22_esclero', name: 'Escleroterapia', desc: 'Eliminación estética de telangiectasias (arañas vasculares) y várices pequeñas mediante infiltración de microespuma.', imgAntes: 'https://images.unsplash.com/photo-1609207925106-84e4b67b05e5?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=800&q=80' }
    ]
  },
  {
    id: '05_otros_especializados',
    title: 'Especialidades Quirúrgicas',
    items: [
      { id: '25_blefaro', name: 'Blefaroplastia', desc: 'Resección quirúrgica precisa de piel excedente y bolsas palpebrales. Mirada rejuvenecida con cicatrices ocultas.', imgAntes: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80' },
      { id: '26_dermapen', name: 'Microneedling', desc: 'Microperforaciones automatizadas para inducir colágeno masivo y permitir la penetración de principios activos médicos.', imgAntes: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?w=800&q=80' },
      { id: '23_meso_capilar', name: 'Mesoterapia Capilar', desc: 'Infiltración directa en el cuero cabelludo de dutasteride y vitaminas para frenar la alopecia y engrosar el folículo.', imgAntes: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80' },
      { id: '24_nutricion', name: 'Nutrición Estética', desc: 'Abordaje clínico del metabolismo para pérdida de peso saludable y mantenimiento de los resultados estéticos corporales.', imgAntes: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80', imgDespues: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' }
    ]
  }
];

export const guiaData = [
  { id: 1, necesidad: 'Prevención de Arrugas / Cara Cansada', solucion: 'Neuromoduladores, Hialurónico', recuperacion: 'Inmediata', duracion: '4 a 6 meses' },
  { id: 2, necesidad: 'Flacidez Facial sin Quirófano', solucion: 'Bioestimuladores, Láser CO2, HIFU', recuperacion: '12 a 24 horas', duracion: '18 a 24 meses' },
  { id: 3, necesidad: 'Manchas Severas y Poros Dilatados', solucion: 'Láser IPL/Q-Switch, Peeling Médico', recuperacion: '3 a 7 días', duracion: 'Largo plazo' },
  { id: 4, necesidad: 'Grasa Localizada Rebelde', solucion: 'Enzimas PBSerums, Criolipólisis', recuperacion: 'Variable', duracion: 'Permanente' }
];

export const experienceStats = [
  { label: 'Casos de Éxito', value: '15.000+' },
  { label: 'Especialistas', value: '12' },
  { label: 'Sedes en Quito', value: '3' },
  { label: 'Nivel Bioseguridad', value: '5' }
];
