/**
 * @fileOverview Master Data para Clínica Sanura - Edición Editorial 2026.
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
    id: 'facial',
    title: 'Estética Facial',
    items: [
      { id: 'hialuronico', name: 'Ácido Hialurónico', desc: 'Rellenos de alta reticulación para armonización facial, voluminización de labios y proyección de mentón.', imgAntes: 'https://picsum.photos/seed/facial1/800/800', imgDespues: 'https://picsum.photos/seed/facial2/800/800' },
      { id: 'hilos', name: 'Hilos Tensores', desc: 'Efecto lifting inmediato mediante estimulación de colágeno subdérmico y tracción física.', imgAntes: 'https://picsum.photos/seed/facial3/800/800', imgDespues: 'https://picsum.photos/seed/facial4/800/800' },
      { id: 'rejuvenecimiento', name: 'Rejuvenecimiento Celular', desc: 'Protocolo exclusivo para reactivar fibroblastos y colágeno natural desde el interior celular.', imgAntes: 'https://picsum.photos/seed/celular1/800/800', imgDespues: 'https://picsum.photos/seed/celular2/800/800' },
      { id: 'botox', name: 'Toxina Botulínica', desc: 'Relajación muscular selectiva para suavizar líneas de expresión y mirada cansada.', imgAntes: 'https://picsum.photos/seed/facial5/800/800', imgDespues: 'https://picsum.photos/seed/facial6/800/800' }
    ]
  },
  {
    id: 'laser',
    title: 'Aparatología Láser',
    items: [
      { id: 'depilacion', name: 'Depilación Definitiva', desc: 'Láser de alta precisión para eliminación de vello en todo tipo de piel con seguridad biológica.', imgAntes: 'https://picsum.photos/seed/laser1/800/800', imgDespues: 'https://picsum.photos/seed/laser2/800/800' },
      { id: 'tatuajes', name: 'Remoción de Tatuajes', desc: 'Tecnología Q-Switched para fragmentación pigmentaria avanzada sin daño tisular.', imgAntes: 'https://picsum.photos/seed/laser3/800/800', imgDespues: 'https://picsum.photos/seed/laser4/800/800' }
    ]
  },
  {
    id: 'odontologia',
    title: 'Odontología Estética',
    items: [
      { id: 'sonrisa', name: 'Diseño de Sonrisa Digital', desc: 'Transformación estética asistida por computadora con carillas de porcelana de alta estética.', imgAntes: 'https://picsum.photos/seed/dent1/800/800', imgDespues: 'https://picsum.photos/seed/dent2/800/800' },
      { id: 'implantes', name: 'Implantes Osteointegrados', desc: 'Rehabilitación oral funcional con tecnología de carga inmediata y biocompatibilidad.', imgAntes: 'https://picsum.photos/seed/dent3/800/800', imgDespues: 'https://picsum.photos/seed/dent4/800/800' }
    ]
  },
  {
    id: 'cirugia',
    title: 'Cirugía Plástica',
    items: [
      { id: 'rinoplastia', name: 'Rinoplastia Ultrasónica', desc: 'Remodelación nasal con precisión milimétrica, mínima inflamación y resultados naturales.', imgAntes: 'https://picsum.photos/seed/surg1/800/800', imgDespues: 'https://picsum.photos/seed/surg2/800/800' },
      { id: 'abdominoplastia', name: 'Abdominoplastia', desc: 'Resección de tejido excedente y tensado muscular para una silueta firme y definida.', imgAntes: 'https://picsum.photos/seed/surg5/800/800', imgDespues: 'https://picsum.photos/seed/surg6/800/800' },
      { id: 'otoplastia', name: 'Otoplastia', desc: 'Corrección auricular estética para armonizar las proporciones del rostro.', imgAntes: 'https://picsum.photos/seed/surg7/800/800', imgDespues: 'https://picsum.photos/seed/surg8/800/800' }
    ]
  },
  {
    id: 'dermatologia',
    title: 'Dermatología Clínica',
    items: [
      { id: 'acne', name: 'Manejo de Acné & Rosácea', desc: 'Protocolos dermatológicos para el control de brotes, inflamación y reparación de discromías.', imgAntes: 'https://picsum.photos/seed/derm1/800/800', imgDespues: 'https://picsum.photos/seed/derm2/800/800' },
      { id: 'lunares', name: 'Remoción de Lunares', desc: 'Procedimientos seguros para la eliminación de lesiones pigmentarias con fines oncológicos y estéticos.', imgAntes: 'https://picsum.photos/seed/derm3/800/800', imgDespues: 'https://picsum.photos/seed/derm4/800/800' }
    ]
  },
  {
    id: 'corporal',
    title: 'Estética Corporal',
    items: [
      { id: 'hidrolipoclasia', name: 'Hidrolipoclasia Ultrasónica', desc: 'Reducción de grasa localizada sin cirugía mediante cavitación y solución fisiológica.', imgAntes: 'https://picsum.photos/seed/body1/800/800', imgDespues: 'https://picsum.photos/seed/body2/800/800' },
      { id: 'hiperhidrosis', name: 'Tratamiento Hiperhidrosis', desc: 'Control efectivo de la sudoración excesiva mediante bloqueadores neuromusculares.', imgAntes: 'https://picsum.photos/seed/body3/800/800', imgDespues: 'https://picsum.photos/seed/body4/800/800' }
    ]
  },
  {
    id: 'capilar',
    title: 'Medicina Capilar',
    items: [
      { id: 'implante', name: 'Técnica FUE (M/F)', desc: 'Restauración microfolicular definitiva de alta densidad para hombres y mujeres.', imgAntes: 'https://picsum.photos/seed/hair1/800/800', imgDespues: 'https://picsum.photos/seed/hair2/800/800' }
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
      { name: 'Dra. Yoselin Mota', bio: '14+ años de práctica integrando Medicina Estética y Salud Ocupacional.' },
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