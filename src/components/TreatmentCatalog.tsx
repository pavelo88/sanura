"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Sparkles } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const treatments = [
  {
    category: "Cirugía Facial",
    items: [
      { name: "Rinoplastia Ultrasónica", description: "Armonía nasal con precisión milimétrica.", img: "https://image.pollinations.ai/prompt/side%20profile%20beautiful%20woman%20perfect%20nose%20beauty%20photography%20studio%20lighting?width=800&height=1000&nologo=true", hint: "facial profile" },
      { name: "Blefaroplastia VIP", description: "Mirada joven y descansada sin cicatrices.", img: "https://image.pollinations.ai/prompt/close%20up%20beautiful%20eyes%20woman%20skincare%20fresh%20youthful%20look?width=800&height=1000&nologo=true", hint: "eye care" },
      { name: "Facelift Deep Plane", description: "Rejuvenecimiento estructural profundo.", img: "https://image.pollinations.ai/prompt/elegant%20mature%20woman%20perfect%20tight%20skin%20beauty%20portrait%20luxury?width=800&height=1000&nologo=true", hint: "skin tight" },
      { name: "Lipopapada HD", description: "Perfilado mandibular de alta definición.", img: "https://image.pollinations.ai/prompt/woman%20perfect%20jawline%20neck%20profile%20beauty%20shot%20skincare?width=800&height=1000&nologo=true", hint: "jawline" }
    ]
  },
  {
    category: "Cirugía Corporal",
    items: [
      { name: "Lipoescultura HD 360", description: "Definición atlética y eliminación de grasa.", img: "https://image.pollinations.ai/prompt/fitness%20woman%20sculpted%20abs%20waist%20elegant%20body%20wellness?width=800&height=1000&nologo=true", hint: "body sculpting" },
      { name: "Abdominoplastia", description: "Abdomen plano y reconstrucción muscular.", img: "https://image.pollinations.ai/prompt/woman%20flat%20stomach%20fit%20abdomen%20wellness%20spa%20lighting?width=800&height=1000&nologo=true", hint: "abs" },
      { name: "Aumento de Senos", description: "Prótesis de alta gama con técnica submuscular.", img: "https://image.pollinations.ai/prompt/woman%20elegant%20cleavage%20silk%20dress%20fashion%20tasteful?width=800&height=1000&nologo=true", hint: "chest" },
      { name: "Brazilian Butt Lift", description: "Transferencia de grasa para volumen natural.", img: "https://image.pollinations.ai/prompt/woman%20curvy%20figure%20elegant%20fitness%20silhouette%20back%20profile?width=800&height=1000&nologo=true", hint: "glutes" }
    ]
  },
  {
    category: "Estética Avanzada",
    items: [
      { name: "Botox Premium", description: "Suavizado de arrugas sin perder expresión.", img: "https://image.pollinations.ai/prompt/woman%20receiving%20botox%20injection%20forehead%20clinic%20medical%20spa?width=800&height=1000&nologo=true", hint: "face inject" },
      { name: "Lip Augmentation", description: "Labios con volumen y forma perfecta.", img: "https://image.pollinations.ai/prompt/close%20up%20beautiful%20plump%20lips%20gloss%20woman%20beauty%20shot?width=800&height=1000&nologo=true", hint: "lips" },
      { name: "HydraFacial Elite", description: "Limpieza profunda y nutrición celular.", img: "https://image.pollinations.ai/prompt/woman%20hydrafacial%20treatment%20spa%20skincare%20glowing%20water?width=800&height=1000&nologo=true", hint: "skin care" },
      { name: "Bioestimuladores", description: "Radiesse y Sculptra para firmeza extrema.", img: "https://image.pollinations.ai/prompt/woman%20glowing%20firm%20skin%20face%20massage%20spa%20treatment?width=800&height=1000&nologo=true", hint: "skin tight" }
    ]
  }
];

export function TreatmentCatalog() {
  return (
    <section id="treatments" className="py-32 bg-background">
      <div className="container mx-auto px-6">
        
        <div className="mb-24 text-center">
          <Badge variant="outline" className="mb-6 px-6 py-2 border-accent text-accent text-[10px] uppercase font-bold tracking-[0.4em] rounded-none">
            Elite Procedures 2026
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-primary dark:font-headline dark:italic dark:lowercase">
            Pure <span className="text-accent">Aesthetics</span>
          </h2>
        </div>

        <Tabs defaultValue="Cirugía Facial" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-muted p-1 rounded-none border h-auto flex flex-wrap justify-center">
              {treatments.map((cat) => (
                <TabsTrigger 
                  key={cat.category} 
                  value={cat.category} 
                  className="px-8 py-3 rounded-none text-[9px] uppercase font-bold tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {treatments.map((category) => (
            <TabsContent key={category.category} value={category.category} className="animate-in fade-in slide-in-from-bottom duration-1000">
              <Carousel className="w-full">
                <CarouselContent className="-ml-6">
                  {category.items.map((item, idx) => (
                    <CarouselItem key={idx} className="pl-6 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                      <TreatmentCard item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center space-x-4 mt-12">
                  <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-none border-primary" />
                  <CarouselNext className="static translate-y-0 h-12 w-12 rounded-none bg-primary text-white" />
                </div>
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function TreatmentCard({ item }: { item: any }) {
  return (
    <Card className="group border-none bg-transparent shadow-none hover:-translate-y-2 transition-all duration-700">
      <div className="relative aspect-[3/4] w-full bg-muted overflow-hidden mb-6 shadow-xl">
        <Image
          src={item.img}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-[1500ms] group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          data-ai-hint={item.hint}
        />
        <div className="absolute top-0 left-0 h-12 w-12 bg-white dark:bg-black flex items-center justify-center transition-colors group-hover:bg-accent">
          <ShieldCheck className="h-5 w-5 text-primary group-hover:text-white dark:hidden" />
          <Sparkles className="h-5 w-5 text-accent group-hover:text-black hidden dark:block" />
        </div>
      </div>
      <CardHeader className="p-0 space-y-4">
        <CardTitle className="text-xl font-black uppercase dark:font-headline dark:italic dark:lowercase dark:text-2xl group-hover:text-accent transition-colors">
          {item.name}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground font-medium leading-relaxed dark:italic border-l border-accent/30 pl-4">
          {item.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
