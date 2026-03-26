
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const treatments = [
  {
    category: "Cirugía Facial",
    items: [
      { name: "Rhinoplasty", description: "Remodelación nasal para armonía facial.", badge: "Estrella" },
      { name: "Blepharoplasty", description: "Corrección de párpados y mirada cansada." },
      { name: "Facelift", description: "Rejuvenecimiento integral del rostro." },
      { name: "Neck Lift", description: "Eliminación de flacidez en el cuello." },
      { name: "Brow Lift", description: "Elevación de cejas para mirada abierta." },
      { name: "Otoplasty", description: "Corrección de la forma de las orejas." },
      { name: "Chin Augmentation", description: "Proyección del mentón con implantes." },
      { name: "Bichectomy", description: "Perfilado de mejillas (bolsas de Bichat)." }
    ],
    img: PlaceHolderImages.find(p => p.id === "cat-facial")?.imageUrl
  },
  {
    category: "Cirugía Corporal",
    items: [
      { name: "Liposuction 360", description: "Escultura corporal de alta definición.", badge: "Top" },
      { name: "Tummy Tuck", description: "Abdominoplastia para abdomen plano." },
      { name: "Breast Augmentation", description: "Aumento de pecho con prótesis de élite." },
      { name: "Breast Lift", description: "Elevación mamaria (Mastopexia)." },
      { name: "Breast Reduction", description: "Reducción para confort y estética." },
      { name: "Brazilian Butt Lift", description: "Transferencia de grasa a glúteos." },
      { name: "Mommy Makeover", description: "Recuperación post-parto completa." },
      { name: "Arm Lift", description: "Braquioplastia para brazos firmes." },
      { name: "Thigh Lift", description: "Eliminación de flacidez en muslos." }
    ],
    img: PlaceHolderImages.find(p => p.id === "cat-body")?.imageUrl
  },
  {
    category: "Estética Avanzada",
    items: [
      { name: "Botox", description: "Relajación de arrugas de expresión.", badge: "Express" },
      { name: "Dermal Fillers", description: "Relleno con ácido hialurónico." },
      { name: "Lip Fillers", description: "Volumen y perfilado de labios." },
      { name: "HydraFacial", description: "Limpieza profunda y nutrición dérmica." },
      { name: "Chemical Peel", description: "Renovación celular profunda." },
      { name: "Laser Hair Removal", description: "Depilación definitiva médica." },
      { name: "Microneedling", description: "Estimulación de colágeno natural." },
      { name: "PRP (Plaquetas)", description: "Bioestimulación con plasma propio." },
      { name: "Mesotherapy", description: "Cócteles vitamínicos inyectables." }
    ],
    img: PlaceHolderImages.find(p => p.id === "cat-injectables")?.imageUrl
  }
];

export function TreatmentCatalog() {
  return (
    <section id="treatments" className="py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary text-primary font-bold">Portafolio Completo</Badge>
          <h2 className="text-5xl md:text-7xl font-headline font-bold mb-6 text-primary">
            Nuestros 26 Servicios de Élite
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
            Desde procedimientos quirúrgicos de alta complejidad hasta tratamientos estéticos rápidos, cubrimos cada necesidad con precisión artística.
          </p>
        </div>

        <Tabs defaultValue="Cirugía Facial" className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="h-16 p-2 bg-muted rounded-full">
              <TabsTrigger value="Cirugía Facial" className="rounded-full px-8 text-lg">Facial</TabsTrigger>
              <TabsTrigger value="Cirugía Corporal" className="rounded-full px-8 text-lg">Corporal</TabsTrigger>
              <TabsTrigger value="Estética Avanzada" className="rounded-full px-8 text-lg">Estética</TabsTrigger>
            </TabsList>
          </div>

          {treatments.map((category) => (
            <TabsContent key={category.category} value={category.category} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, idx) => (
                  <Card key={idx} className="group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl border-2">
                    <div className="relative h-48 w-full bg-muted overflow-hidden">
                      <Image
                        src={category.img || "https://picsum.photos/seed/serv/600/400"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                        data-ai-hint="aesthetic treatment"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {item.badge && (
                        <Badge className="absolute top-4 right-4 bg-accent text-white shadow-lg">
                          {item.badge}
                        </Badge>
                      )}
                      <div className="absolute bottom-4 left-4 text-white font-headline font-bold text-xl">
                        #{idx + 1}
                      </div>
                    </div>
                    <CardHeader className="p-6">
                      <CardTitle className="font-headline text-2xl mb-2">{item.name}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{item.description}</CardDescription>
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
