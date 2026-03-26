"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const treatments = [
  {
    category: "Cirugía Facial",
    items: [
      { name: "Rinoplastia Ultrasónica", description: "Armonía nasal con precisión milimétrica.", badge: "Elite" },
      { name: "Blefaroplastia VIP", description: "Mirada joven y descansada sin cicatrices visibles." },
      { name: "Facelift Deep Plane", description: "Rejuvenecimiento estructural profundo y natural." },
      { name: "Lipopapada HD", description: "Perfilado mandibular de alta definición." },
      { name: "Brow Lift", description: "Elevación de cejas estilo 'Foxy Eyes'." },
      { name: "Otoplastia", description: "Corrección auricular estética y funcional." },
      { name: "Bichectomía", description: "Afinamiento de mejillas para rostro angulado." },
      { name: "Mentoplastia", description: "Proyección equilibrada del mentón." }
    ],
    img: "https://picsum.photos/seed/face-lux/800/600",
    hint: "facial aesthetics"
  },
  {
    category: "Cirugía Corporal",
    items: [
      { name: "Lipoescultura HD 360", description: "Definición atlética y eliminación de grasa.", badge: "Top" },
      { name: "Abdominoplastia", description: "Abdomen plano y reconstrucción muscular." },
      { name: "Aumento de Senos", description: "Prótesis de alta gama con técnica submuscular." },
      { name: "Mastopexia", description: "Elevación y reafirmación mamaria." },
      { name: "Brazilian Butt Lift", description: "Transferencia de grasa para volumen natural." },
      { name: "Mommy Makeover", description: "Recuperación post-parto integral." },
      { name: "Braquioplastia", description: "Eliminación de flacidez en brazos." },
      { name: "Cruroplastia", description: "Remodelación estética de muslos." },
      { name: "Marcación Abdominal", description: "Resalte de la musculatura natural." }
    ],
    img: "https://picsum.photos/seed/body-lux/800/600",
    hint: "body sculpting"
  },
  {
    category: "Estética Avanzada",
    items: [
      { name: "Botox Premium", description: "Suavizado de arrugas sin perder expresión.", badge: "Express" },
      { name: "Rinomodelación", description: "Perfilado nasal sin cirugía con hialurónico." },
      { name: "Lip Augmentation", description: "Labios con volumen y forma perfecta." },
      { name: "HydraFacial Elite", description: "Limpieza profunda y nutrición celular." },
      { name: "Bioestimuladores", description: "Radiesse y Sculptra para firmeza extrema." },
      { name: "Peeling de Diamante", description: "Renovación total de la textura dérmica." },
      { name: "Depilación Láser", description: "Tecnología médica para piel de seda." },
      { name: "HIFU Facial", description: "Lifting sin agujas mediante ultrasonido." },
      { name: "Mesoterapia VIP", description: "Cócteles vitamínicos personalizados." }
    ],
    img: "https://picsum.photos/seed/skin-lux/800/600",
    hint: "beauty treatment"
  }
];

export function TreatmentCatalog() {
  return (
    <section id="treatments" className="py-32 bg-mesh-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24">
          <Badge variant="outline" className="mb-6 px-6 py-2 border-primary text-primary font-bold tracking-widest uppercase text-xs">Portafolio Exclusivo</Badge>
          <h2 className="text-6xl md:text-8xl magazine-title mb-8 text-primary">
            Excelencia en <br /><span className="text-accent italic">26 Servicios</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Una curaduría de los procedimientos más avanzados del mundo, ejecutados con maestría quirúrgica y visión artística.
          </p>
        </div>

        <Tabs defaultValue="Cirugía Facial" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="h-14 p-1 bg-muted/50 border rounded-full">
              <TabsTrigger value="Cirugía Facial" className="rounded-full px-10 text-sm uppercase tracking-widest">Facial</TabsTrigger>
              <TabsTrigger value="Cirugía Corporal" className="rounded-full px-10 text-sm uppercase tracking-widest">Corporal</TabsTrigger>
              <TabsTrigger value="Estética Avanzada" className="rounded-full px-10 text-sm uppercase tracking-widest">Estética</TabsTrigger>
            </TabsList>
          </div>

          {treatments.map((category) => (
            <TabsContent key={category.category} value={category.category} className="animate-in fade-in duration-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {category.items.map((item, idx) => (
                  <Card key={idx} className="group border-none bg-transparent shadow-none hover:translate-y-[-5px] transition-all">
                    <div className="relative h-[400px] w-full bg-muted overflow-hidden mb-6">
                      <Image
                        src={category.img}
                        alt={item.name}
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 opacity-90 group-hover:opacity-100 group-hover:scale-105"
                        data-ai-hint={category.hint}
                      />
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                      {item.badge && (
                        <Badge className="absolute top-6 left-6 bg-accent text-white uppercase text-[10px] tracking-widest px-3 py-1">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="p-0 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <CardTitle className="magazine-title text-2xl group-hover:text-primary transition-colors">{item.name}</CardTitle>
                        <span className="text-primary/30 font-headline italic text-lg">0{idx + 1}</span>
                      </div>
                      <CardDescription className="text-muted-foreground text-sm font-light tracking-wide italic border-l-2 border-primary/20 pl-4">
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