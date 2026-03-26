"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Sparkles, HeartPulse } from "lucide-react";

const treatments = [
  {
    category: "Cirugía Facial",
    items: [
      { name: "Rinoplastia Ultrasónica", description: "Armonía nasal con precisión milimétrica.", badge: "Gold Standard" },
      { name: "Blefaroplastia VIP", description: "Mirada joven y descansada sin cicatrices visibles." },
      { name: "Facelift Deep Plane", description: "Rejuvenecimiento estructural profundo y natural." },
      { name: "Lipopapada HD", description: "Perfilado mandibular de alta definición." },
      { name: "Brow Lift", description: "Elevación de cejas estilo 'Foxy Eyes'." },
      { name: "Otoplastia", description: "Corrección auricular estética y funcional." },
      { name: "Bichectomía", description: "Afinamiento de mejillas para rostro angulado." },
      { name: "Mentoplastia", description: "Proyección equilibrada del mentón." }
    ],
    img: "https://picsum.photos/seed/face-res/800/1000",
    hint: "facial surgery"
  },
  {
    category: "Cirugía Corporal",
    items: [
      { name: "Lipoescultura HD 360", description: "Definición atlética y eliminación de grasa.", badge: "Premium" },
      { name: "Abdominoplastia", description: "Abdomen plano y reconstrucción muscular." },
      { name: "Aumento de Senos", description: "Prótesis de alta gama con técnica submuscular." },
      { name: "Mastopexia", description: "Elevación y reafirmación mamaria." },
      { name: "Brazilian Butt Lift", description: "Transferencia de grasa para volumen natural." },
      { name: "Mommy Makeover", description: "Recuperación post-parto integral." },
      { name: "Braquioplastia", description: "Eliminación de flacidez en brazos." },
      { name: "Cruroplastia", description: "Remodelación estética de muslos." },
      { name: "Marcación Abdominal", description: "Resalte de la musculatura natural." }
    ],
    img: "https://picsum.photos/seed/body-res/800/1000",
    hint: "body contouring"
  },
  {
    category: "Estética Avanzada",
    items: [
      { name: "Botox Premium", description: "Suavizado de arrugas sin perder expresión.", badge: "VIP" },
      { name: "Rinomodelación", description: "Perfilado nasal sin cirugía con hialurónico." },
      { name: "Lip Augmentation", description: "Labios con volumen y forma perfecta." },
      { name: "HydraFacial Elite", description: "Limpieza profunda y nutrición celular." },
      { name: "Bioestimuladores", description: "Radiesse y Sculptra para firmeza extrema." },
      { name: "Peeling de Diamante", description: "Renovación total de la textura dérmica." },
      { name: "Depilación Láser", description: "Tecnología médica para piel de seda." },
      { name: "HIFU Facial", description: "Lifting sin agujas mediante ultrasonido." },
      { name: "Mesoterapia VIP", description: "Cócteles vitamínicos personalizados." }
    ],
    img: "https://picsum.photos/seed/skin-res/800/1000",
    hint: "beauty treatment"
  }
];

export function TreatmentCatalog() {
  return (
    <section id="treatments" className="py-32 bg-background transition-colors duration-[1.2s]">
      <div className="container mx-auto px-6">
        
        {/* Encabezado dual */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="dark:hidden contents">
            <Badge variant="outline" className="mb-6 px-4 py-1 border-primary text-primary text-[10px] uppercase font-bold tracking-[0.3em]">
              Cartera de Servicios N-Vitality
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-primary">
              26 Protocolos <span className="text-accent">Garantizados</span>
            </h2>
          </div>
          
          <div className="hidden dark:contents">
            <span className="text-accent font-serif italic text-2xl mb-4 lowercase tracking-widest">the collection</span>
            <h2 className="text-6xl md:text-9xl font-headline font-bold text-primary leading-[0.8]">
              Edition <br /><span className="text-accent italic font-light lowercase">twenty-six</span>
            </h2>
          </div>
          
          <p className="mt-8 text-xl text-muted-foreground max-w-2xl font-light leading-relaxed dark:italic">
            Un despliegue de maestría médica y visión artística. Seleccionados para quienes exigen lo extraordinario.
          </p>
        </div>

        <Tabs defaultValue="Cirugía Facial" className="w-full">
          <div className="flex justify-center mb-20">
            <TabsList className="bg-muted p-1 rounded-none border border-border">
              {treatments.map((cat) => (
                <TabsTrigger 
                  key={cat.category} 
                  value={cat.category} 
                  className="px-8 py-3 rounded-none text-[10px] uppercase font-bold tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {treatments.map((category) => (
            <TabsContent key={category.category} value={category.category} className="animate-in fade-in zoom-in duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {category.items.map((item, idx) => (
                  <Card key={idx} className="group border-none bg-transparent shadow-none hover:-translate-y-2 transition-transform duration-500">
                    <div className="relative h-[500px] w-full bg-muted overflow-hidden mb-8">
                      <Image
                        src={category.img}
                        alt={item.name}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s] group-hover:scale-110"
                        data-ai-hint={category.hint}
                      />
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                      
                      {/* Icono dinámico */}
                      <div className="absolute top-6 left-6 h-12 w-12 bg-white flex items-center justify-center dark:bg-black">
                        <div className="dark:hidden"><ShieldCheck className="h-5 w-5 text-primary" /></div>
                        <div className="hidden dark:block"><Sparkles className="h-5 w-5 text-accent" /></div>
                      </div>

                      {item.badge && (
                        <div className="absolute bottom-6 right-6 bg-accent text-white px-3 py-1 text-[8px] uppercase font-bold tracking-[0.2em]">
                          {item.badge}
                        </div>
                      )}
                    </div>
                    
                    <CardHeader className="p-0 space-y-4">
                      <div className="flex justify-between items-start border-b border-primary/10 pb-4">
                        <CardTitle className="text-2xl font-black uppercase dark:font-headline dark:italic dark:lowercase dark:text-4xl group-hover:text-primary transition-colors">
                          {item.name}
                        </CardTitle>
                        <span className="text-[10px] font-bold text-muted-foreground opacity-50">#0{idx + 1}</span>
                      </div>
                      <CardDescription className="text-muted-foreground font-light leading-relaxed dark:italic">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}