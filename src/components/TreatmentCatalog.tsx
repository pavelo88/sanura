"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
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
      { name: "Rinoplastia Ultrasónica", description: "Armonía nasal con precisión milimétrica.", badge: "Gold Standard", img: "https://image.pollinations.ai/prompt/side%20profile%20beautiful%20woman%20perfect%20nose%20beauty%20photography%20studio%20lighting?width=800&height=1000&nologo=true", hint: "facial profile" },
      { name: "Blefaroplastia VIP", description: "Mirada joven y descansada sin cicatrices visibles.", img: "https://image.pollinations.ai/prompt/close%20up%20beautiful%20eyes%20woman%20skincare%20fresh%20youthful%20look?width=800&height=1000&nologo=true", hint: "eye care" },
      { name: "Facelift Deep Plane", description: "Rejuvenecimiento estructural profundo y natural.", img: "https://image.pollinations.ai/prompt/elegant%20mature%20woman%20perfect%20tight%20skin%20beauty%20portrait%20luxury?width=800&height=1000&nologo=true", hint: "skin tight" },
      { name: "Lipopapada HD", description: "Perfilado mandibular de alta definición.", img: "https://image.pollinations.ai/prompt/woman%20perfect%20jawline%20neck%20profile%20beauty%20shot%20skincare?width=800&height=1000&nologo=true", hint: "jawline" },
      { name: "Brow Lift", description: "Elevación de cejas estilo 'Foxy Eyes'.", img: "https://image.pollinations.ai/prompt/woman%20foxy%20eyes%20lifted%20eyebrows%20model%20portrait%20symmetrical?width=800&height=1000&nologo=true", hint: "eyes beauty" },
      { name: "Otoplastia", description: "Corrección auricular estética y funcional.", img: "https://image.pollinations.ai/prompt/woman%20profile%20hair%20tucked%20behind%20ear%20elegant%20beauty%20clean?width=800&height=1000&nologo=true", hint: "ears" },
      { name: "Bichectomía", description: "Afinamiento de mejillas para rostro angulado.", img: "https://image.pollinations.ai/prompt/woman%20sculpted%20cheekbones%20hollow%20cheeks%20high%20fashion%20model?width=800&height=1000&nologo=true", hint: "cheekbones" },
      { name: "Mentoplastia", description: "Proyección equilibrada del mentón.", img: "https://image.pollinations.ai/prompt/woman%20profile%20strong%20elegant%20chin%20jawline%20beauty%20photography?width=800&height=1000&nologo=true", hint: "chin" }
    ]
  },
  {
    category: "Cirugía Corporal",
    items: [
      { name: "Lipoescultura HD 360", description: "Definición atlética y eliminación de grasa.", badge: "Premium", img: "https://image.pollinations.ai/prompt/fitness%20woman%20sculpted%20abs%20waist%20elegant%20body%20wellness?width=800&height=1000&nologo=true", hint: "body sculpting" },
      { name: "Abdominoplastia", description: "Abdomen plano y reconstrucción muscular.", img: "https://image.pollinations.ai/prompt/woman%20flat%20stomach%20fit%20abdomen%20wellness%20spa%20lighting?width=800&height=1000&nologo=true", hint: "abs" },
      { name: "Aumento de Senos", description: "Prótesis de alta gama con técnica submuscular.", img: "https://image.pollinations.ai/prompt/woman%20elegant%20cleavage%20silk%20dress%20fashion%20tasteful?width=800&height=1000&nologo=true", hint: "chest" },
      { name: "Mastopexia", description: "Elevación y reafirmación mamaria.", img: "https://image.pollinations.ai/prompt/woman%20beautiful%20posture%20chest%20elegant%20silk%20robe%20spa?width=800&height=1000&nologo=true", hint: "lift" },
      { name: "Brazilian Butt Lift", description: "Transferencia de grasa para volumen natural.", img: "https://image.pollinations.ai/prompt/woman%20curvy%20figure%20elegant%20fitness%20silhouette%20back%20profile?width=800&height=1000&nologo=true", hint: "glutes" },
      { name: "Mommy Makeover", description: "Recuperación post-parto integral.", img: "https://image.pollinations.ai/prompt/beautiful%20fit%20mother%20healthy%20body%20wellness%20radiant%20skin?width=800&height=1000&nologo=true", hint: "transformation" },
      { name: "Braquioplastia", description: "Eliminación de flacidez en brazos.", img: "https://image.pollinations.ai/prompt/woman%20toned%20arms%20elegant%20pose%20fitness%20wellness%20studio?width=800&height=1000&nologo=true", hint: "arms" },
      { name: "Cruroplastia", description: "Remodelación estética de muslos.", img: "https://image.pollinations.ai/prompt/woman%20toned%20legs%20thighs%20elegant%20pose%20fitness%20spa?width=800&height=1000&nologo=true", hint: "legs" },
      { name: "Marcación Abdominal", description: "Resalte de la musculatura natural.", img: "https://image.pollinations.ai/prompt/woman%20athletic%20defined%20abs%20fitness%20model%20studio%20lighting?width=800&height=1000&nologo=true", hint: "abs detail" }
    ]
  },
  {
    category: "Estética Avanzada",
    items: [
      { name: "Botox Premium", description: "Suavizado de arrugas sin perder expresión.", badge: "VIP", img: "https://image.pollinations.ai/prompt/woman%20receiving%20botox%20injection%20forehead%20clinic%20medical%20spa?width=800&height=1000&nologo=true", hint: "face inject" },
      { name: "Rinomodelación", description: "Perfilado nasal sin cirugía con hialurónico.", img: "https://image.pollinations.ai/prompt/dermatologist%20injecting%20hyaluronic%20acid%20nose%20woman%20clinic?width=800&height=1000&nologo=true", hint: "nose contour" },
      { name: "Lip Augmentation", description: "Labios con volumen y forma perfecta.", img: "https://image.pollinations.ai/prompt/close%20up%20beautiful%20plump%20lips%20gloss%20woman%20beauty%20shot?width=800&height=1000&nologo=true", hint: "lips" },
      { name: "HydraFacial Elite", description: "Limpieza profunda y nutrición celular.", img: "https://image.pollinations.ai/prompt/woman%20hydrafacial%20treatment%20spa%20skincare%20glowing%20water?width=800&height=1000&nologo=true", hint: "skin care" },
      { name: "Bioestimuladores", description: "Radiesse y Sculptra para firmeza extrema.", img: "https://image.pollinations.ai/prompt/woman%20glowing%20firm%20skin%20face%20massage%20spa%20treatment?width=800&height=1000&nologo=true", hint: "skin tight" },
      { name: "Peeling de Diamante", description: "Renovación total de la textura dérmica.", img: "https://image.pollinations.ai/prompt/woman%20chemical%20peel%20spa%20facial%20treatment%20beauty%20mask?width=800&height=1000&nologo=true", hint: "exfoliation" },
      { name: "Depilación Láser", description: "Tecnología médica para piel de seda.", img: "https://image.pollinations.ai/prompt/laser%20hair%20removal%20treatment%20clinic%20smooth%20skin%20medical?width=800&height=1000&nologo=true", hint: "laser" },
      { name: "HIFU Facial", description: "Lifting sin agujas mediante ultrasonido.", img: "https://image.pollinations.ai/prompt/woman%20ultrasound%20facial%20treatment%20hifu%20clinic%20device?width=800&height=1000&nologo=true", hint: "lifting" },
      { name: "Mesoterapia VIP", description: "Cócteles vitamínicos personalizados.", img: "https://image.pollinations.ai/prompt/mesotherapy%20vitamin%20injection%20face%20skincare%20clinic%20medical?width=800&height=1000&nologo=true", hint: "vitamins" }
    ]
  }
];

export function TreatmentCatalog() {
  return (
    <section id="treatments" className="py-40 bg-background transition-colors duration-[1500ms]">
      <div className="container mx-auto px-6">
        
        {/* Editorial Headers */}
        <div className="mb-40 text-center flex flex-col items-center">
          <div className="dark:hidden">
            <Badge variant="outline" className="mb-10 px-8 py-3 border-accent text-accent text-[11px] uppercase font-bold tracking-[0.6em] rounded-none">
              Health & Insurance Issue 2026
            </Badge>
            <h2 className="text-8xl md:text-[12rem] font-black uppercase tracking-tighter text-primary leading-[0.75]">
              Pure <br /><span className="text-accent">Aesthetics</span>
            </h2>
          </div>
          
          <div className="hidden dark:block">
            <span className="text-accent font-serif italic text-3xl mb-8 lowercase tracking-[0.4em] block">the soho lookbook</span>
            <h2 className="text-8xl md:text-[15rem] font-headline font-bold text-white leading-[0.7] tracking-tighter">
              Private <br /><span className="text-accent italic font-light lowercase">atelier</span>
            </h2>
          </div>
          
          <p className="mt-16 text-2xl md:text-3xl text-muted-foreground max-w-4xl font-light leading-relaxed dark:italic opacity-60">
            Una colección curada donde la rigorosa ciencia médica de seguros se encuentra con la visión editorial de la belleza.
          </p>
        </div>

        <Tabs defaultValue="Cirugía Facial" className="w-full">
          <div className="flex justify-center mb-32">
            <TabsList className="bg-muted p-2 rounded-none border border-border h-auto overflow-x-auto flex flex-wrap justify-center">
              {treatments.map((cat) => (
                <TabsTrigger 
                  key={cat.category} 
                  value={cat.category} 
                  className="px-12 py-5 rounded-none text-[11px] uppercase font-bold tracking-[0.4em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {treatments.map((category) => (
            <TabsContent key={category.category} value={category.category} className="animate-in fade-in slide-in-from-bottom duration-1000">
              
              {/* Carrusel Móvil */}
              <div className="block lg:hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {category.items.map((item, idx) => (
                      <CarouselItem key={idx}>
                        <TreatmentCard item={item} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center space-x-6 mt-12">
                    <CarouselPrevious className="static translate-y-0 h-16 w-16 rounded-none border-primary text-primary" />
                    <CarouselNext className="static translate-y-0 h-16 w-16 rounded-none bg-primary text-white" />
                  </div>
                </Carousel>
              </div>

              {/* Grid Desktop */}
              <div className="hidden lg:grid grid-cols-3 gap-20">
                {category.items.map((item, idx) => (
                  <TreatmentCard key={idx} item={item} />
                ))}
              </div>

            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function TreatmentCard({ item }: { item: any }) {
  return (
    <Card className="group border-none bg-transparent shadow-none hover:-translate-y-6 transition-all duration-[1000ms]">
      <div className="relative aspect-[3/4] w-full bg-muted overflow-hidden mb-10 shadow-3xl">
        <Image
          src={item.img}
          alt={item.name}
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-110"
          data-ai-hint={item.hint}
        />
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-1000" />
        
        {/* Editorial Icons */}
        <div className="absolute top-0 left-0 h-16 w-16 bg-white dark:bg-black flex items-center justify-center transition-all group-hover:bg-primary group-hover:dark:bg-accent">
          <ShieldCheck className="h-6 w-6 text-primary group-hover:text-white dark:hidden" />
          <Sparkles className="h-6 w-6 text-accent group-hover:text-black hidden dark:block" />
        </div>

        {item.badge && (
          <div className="absolute top-0 right-0 bg-accent text-white px-8 py-3 text-[10px] uppercase font-bold tracking-[0.4em] shadow-2xl">
            {item.badge}
          </div>
        )}
      </div>
      
      <CardHeader className="p-0 space-y-8">
        <div className="flex justify-between items-end border-b border-primary/20 pb-8">
          <CardTitle className="text-4xl font-black uppercase dark:font-headline dark:italic dark:lowercase dark:text-5xl group-hover:text-accent transition-colors duration-700">
            {item.name}
          </CardTitle>
          <ArrowRight className="h-6 w-6 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
        </div>
        <CardDescription className="text-xl text-muted-foreground font-light leading-relaxed dark:italic opacity-80 border-l-2 border-accent/20 pl-6">
          {item.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
