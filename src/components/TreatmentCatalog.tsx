
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Sparkles, MoveHorizontal } from "lucide-react";
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
      { 
        name: "Rinoplastia Ultrasónica", 
        description: "Armonía nasal con precisión milimétrica.", 
        badge: "Gold Standard", 
        imgBefore: "https://image.pollinations.ai/prompt/medical%20profile%20photography%20pronounced%20nasal%20hump%20clinic?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/medical%20profile%20photography%20smooth%20nose%20bridge%20refined%20tip%20clinic?width=800&height=1000&nologo=true", 
        hint: "facial profile" 
      },
      { 
        name: "Blefaroplastia VIP", 
        description: "Mirada joven y descansada sin cicatrices visibles.", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20clinical%20photograph%20eyes%20under-eye%20bags%20sagging%20lids?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20clinical%20photograph%20eyes%20smooth%20youthful%20awake%20no%20bags?width=800&height=1000&nologo=true", 
        hint: "eye care" 
      },
      { 
        name: "Facelift Deep Plane", 
        description: "Rejuvenecimiento estructural profundo y natural.", 
        imgBefore: "https://image.pollinations.ai/prompt/3-4%20view%20medical%20photograph%20sagging%20jowls%20neck%20bands?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/3-4%20view%20medical%20photograph%20tight%20jawline%20smooth%20neck%20youthful?width=800&height=1000&nologo=true", 
        hint: "skin tight" 
      },
      { 
        name: "Lipopapada HD", 
        description: "Perfilado mandibular de alta definición.", 
        imgBefore: "https://image.pollinations.ai/prompt/profile%20medical%20studio%20double%20chin%20soft%20undefined%20jawline?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/profile%20medical%20studio%20sharp%2090-degree%20jawline%20contoured%20neck?width=800&height=1000&nologo=true", 
        hint: "jawline" 
      },
      { 
        name: "Brow Lift", 
        description: "Elevación de cejas estilo 'Foxy Eyes'.", 
        imgBefore: "https://image.pollinations.ai/prompt/frontal%20medical%20portrait%20heavy%20brow%20drooping%20forehead%20skin?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/frontal%20medical%20portrait%20lifted%20arched%20eyebrows%20smooth%20forehead?width=800&height=1000&nologo=true", 
        hint: "eyes beauty" 
      },
      { 
        name: "Otoplastia", 
        description: "Corrección auricular estética y funcional.", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20clinical%20shot%20back%20of%20head%20protruding%20ears?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20clinical%20shot%20back%20of%20head%20pinned%20back%20ears?width=800&height=1000&nologo=true", 
        hint: "ears" 
      },
      { 
        name: "Bichectomía", 
        description: "Afinamiento de mejillas para rostro angulado.", 
        imgBefore: "https://image.pollinations.ai/prompt/3-4%20view%20portrait%20full%20round%20cheeks%20undefined?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/3-4%20view%20portrait%20hollow%20cheeks%20sharp%20high%20cheekbones?width=800&height=1000&nologo=true", 
        hint: "cheekbones" 
      },
      { 
        name: "Mentoplastia", 
        description: "Proyección equilibrada del mentón.", 
        imgBefore: "https://image.pollinations.ai/prompt/profile%20view%20receding%20chin%20undefined%20jawline%20clinical?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/profile%20view%20projected%20chin%20balanced%20jawline%20clinical?width=800&height=1000&nologo=true", 
        hint: "chin" 
      }
    ]
  },
  {
    category: "Cirugía Corporal",
    items: [
      { 
        name: "Lipoescultura HD 360", 
        description: "Definición atlética y eliminación de grasa.", 
        badge: "Premium", 
        imgBefore: "https://image.pollinations.ai/prompt/frontal%20medical%20shot%20abdomen%20soft%20fat%20undefined%20muscles?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/frontal%20medical%20shot%20abdomen%20highly%20defined%20six-pack%20athletic?width=800&height=1000&nologo=true", 
        hint: "body sculpting" 
      },
      { 
        name: "Abdominoplastia", 
        description: "Abdomen plano y reconstrucción muscular.", 
        imgBefore: "https://image.pollinations.ai/prompt/frontal%20clinical%20portrait%20female%20abdomen%20skin%20laxity%20stretch%20marks?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/frontal%20clinical%20portrait%20female%20abdomen%20flat%20smooth%20no%20stretch%20marks?width=800&height=1000&nologo=true", 
        hint: "abs" 
      },
      { 
        name: "Aumento de Senos", 
        description: "Prótesis de alta gama con técnica submuscular.", 
        imgBefore: "https://image.pollinations.ai/prompt/frontal%20medical%20photography%20small%20deflated%20breasts%20studio?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/frontal%20medical%20photography%20full%20symmetrical%20projected%20breasts%20studio?width=800&height=1000&nologo=true", 
        hint: "chest" 
      },
      { 
        name: "Mastopexia", 
        description: "Elevación y reafirmación mamaria.", 
        imgBefore: "https://image.pollinations.ai/prompt/profile%20medical%20view%20sagging%20breasts%20low%20silhouette?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/profile%20medical%20view%20lifted%20youthful%20breasts%20refined%20projection?width=800&height=1000&nologo=true", 
        hint: "lift" 
      },
      { 
        name: "Brazilian Butt Lift", 
        description: "Transferencia de grasa para volumen natural.", 
        imgBefore: "https://image.pollinations.ai/prompt/profile%20medical%20shot%20flat%20glutes%20undefined%20hips?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/profile%20medical%20shot%20rounded%20projected%20glutes%20contoured%20waist?width=800&height=1000&nologo=true", 
        hint: "glutes" 
      },
      { 
        name: "Mommy Makeover", 
        description: "Recuperación post-parto integral.", 
        imgBefore: "https://image.pollinations.ai/prompt/frontal%20medical%20diptych%20deflated%20breasts%20sagging%20abdomen?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/frontal%20medical%20diptych%20lifted%20breasts%20flat%20smooth%20abdomen?width=800&height=1000&nologo=true", 
        hint: "transformation" 
      },
      { 
        name: "Braquioplastia", 
        description: "Eliminación de flacidez en brazos.", 
        imgBefore: "https://image.pollinations.ai/prompt/profile%20clinical%20shot%20upper%20arm%20severe%20skin%20laxity?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/profile%20clinical%20shot%20upper%20arm%20tight%20slender%20contoured?width=800&height=1000&nologo=true", 
        hint: "arms" 
      },
      { 
        name: "Cruroplastia", 
        description: "Remodelación estética de muslos.", 
        imgBefore: "https://image.pollinations.ai/prompt/frontal%20medical%20shot%20inner%20thighs%20skin%20laxity?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/frontal%20medical%20shot%20inner%20thighs%20tight%20slender%20smooth?width=800&height=1000&nologo=true", 
        hint: "legs" 
      },
      { 
        name: "Marcación Abdominal", 
        description: "Resalte de la musculatura natural.", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20frontal%20medical%20shot%20abdomen%20soft%20undefined?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20frontal%20medical%20shot%20abdomen%20sharply%20defined%20obliques?width=800&height=1000&nologo=true", 
        hint: "abs detail" 
      }
    ]
  },
  {
    category: "Estética Avanzada",
    items: [
      { 
        name: "Botox Premium", 
        description: "Suavizado de arrugas sin perder expresión.", 
        badge: "VIP", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20frontal%20portrait%20frowning%20prominent%20forehead%20wrinkles?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20frontal%20portrait%20smooth%20forehead%20natural%20expression?width=800&height=1000&nologo=true", 
        hint: "face inject" 
      },
      { 
        name: "Rinomodelación", 
        description: "Perfilado nasal sin cirugía con hialurónico.", 
        imgBefore: "https://image.pollinations.ai/prompt/profile%20medical%20view%20nose%20small%20visible%20dorsal%20hump?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/profile%20medical%20view%20nose%20perfectly%20straight%20bridge%20refined?width=800&height=1000&nologo=true", 
        hint: "nose contour" 
      },
      { 
        name: "Lip Augmentation", 
        description: "Labios con volumen y forma perfecta.", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20macro%20beauty%20shot%20thin%20asymmetrical%20lips?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20macro%20beauty%20shot%20fuller%20defined%20plump%20lips?width=800&height=1000&nologo=true", 
        hint: "lips" 
      },
      { 
        name: "HydraFacial Elite", 
        description: "Limpieza profunda y nutrición celular.", 
        imgBefore: "https://image.pollinations.ai/prompt/macro%20beauty%20shot%20facial%20skin%20congestion%20dull%20texture?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/macro%20beauty%20shot%20facial%20skin%20radiant%20translucent%20glowing?width=800&height=1000&nologo=true", 
        hint: "skin care" 
      },
      { 
        name: "Bioestimuladores", 
        description: "Radiesse y Sculptra para firmeza extrema.", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20clinical%20photography%20mild%20skin%20laxity%20volume%20loss?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20clinical%20photography%20restored%20volume%20extreme%20firmness%20glow?width=800&height=1000&nologo=true", 
        hint: "skin tight" 
      },
      { 
        name: "Peeling de Diamante", 
        description: "Renovación total de la textura dérmica.", 
        imgBefore: "https://image.pollinations.ai/prompt/macro%20medical%20shot%20cheek%20hyperpigmentation%20uneven%20skin%20tone?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/macro%20medical%20shot%20cheek%20completely%20renewed%20flawless%20even%20texture?width=800&height=1000&nologo=true", 
        hint: "exfoliation" 
      },
      { 
        name: "Depilación Láser", 
        description: "Tecnología médica para piel de seda.", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20macro%20clinical%20shot%20lower%20leg%20visible%20hair%20follicles?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20macro%20clinical%20shot%20lower%20leg%20silky%20smooth%20hairless?width=800&height=1000&nologo=true", 
        hint: "laser" 
      },
      { 
        name: "HIFU Facial", 
        description: "Lifting sin agujas mediante ultrasonido.", 
        imgBefore: "https://image.pollinations.ai/prompt/3-4%20view%20clinical%20portrait%20early%20sagging%20lower%20jawline?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/3-4%20view%20clinical%20portrait%20naturally%20lifted%20tight%20jawline?width=800&height=1000&nologo=true", 
        hint: "lifting" 
      },
      { 
        name: "Mesoterapia VIP", 
        description: "Cócteles vitamínicos personalizados.", 
        imgBefore: "https://image.pollinations.ai/prompt/close-up%20facial%20beauty%20portrait%20tired%20dull%20dehydrated%20skin?width=800&height=1000&nologo=true",
        img: "https://image.pollinations.ai/prompt/close-up%20facial%20beauty%20portrait%20deeply%20hydrated%20luminous%20glassy%20glow?width=800&height=1000&nologo=true", 
        hint: "vitamins" 
      }
    ]
  }
];

export function TreatmentCatalog() {
  return (
    <section id="treatments" className="py-24 md:py-40 bg-background transition-colors duration-[1500ms]">
      <div className="container mx-auto px-6">
        
        {/* Encabezado dual */}
        <div className="mb-16 md:mb-32 flex flex-col items-center text-center">
          <div className="dark:hidden contents">
            <Badge variant="outline" className="mb-8 px-6 py-2 border-accent text-accent text-[10px] uppercase font-bold tracking-[0.4em]">
              Protocolos Quirúrgicos Certificados
            </Badge>
            <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter text-primary leading-[0.85]">
              26 <span className="text-accent">Garantías</span>
            </h2>
          </div>
          
          <div className="hidden dark:contents">
            <span className="text-accent font-serif italic text-2xl md:text-3xl mb-6 lowercase tracking-[0.3em]">the soho archives</span>
            <h2 className="text-6xl md:text-[14rem] font-headline font-bold text-primary leading-[0.75]">
              Edition <br /><span className="text-accent italic font-light lowercase">v.twenty-six</span>
            </h2>
          </div>
          
          <p className="mt-8 md:mt-12 text-lg md:text-2xl text-muted-foreground max-w-3xl font-light leading-relaxed dark:italic opacity-80">
            Una selección curada donde la rigurosa ciencia médica se encuentra con la visión editorial de la belleza.
          </p>
        </div>

        <Tabs defaultValue="Cirugía Facial" className="w-full">
          <div className="flex justify-center mb-12 md:mb-24">
            <TabsList className="bg-muted p-1 md:p-2 rounded-none border border-border h-auto overflow-x-auto">
              {treatments.map((cat) => (
                <TabsTrigger 
                  key={cat.category} 
                  value={cat.category} 
                  className="px-6 md:px-12 py-3 md:py-4 rounded-none text-[10px] uppercase font-bold tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
                >
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {treatments.map((category) => (
            <TabsContent key={category.category} value={category.category} className="animate-in fade-in zoom-in duration-700">
              
              {/* Carrusel para Celular */}
              <div className="block md:hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {category.items.map((item, idx) => (
                      <CarouselItem key={idx}>
                        <TreatmentCard item={item} idx={idx} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-center space-x-4 mt-8">
                    <CarouselPrevious className="static translate-y-0 h-12 w-12 rounded-none border-primary text-primary" />
                    <CarouselNext className="static translate-y-0 h-12 w-12 rounded-none bg-primary text-white" />
                  </div>
                </Carousel>
              </div>

              {/* Grid para Desktop */}
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-16">
                {category.items.map((item, idx) => (
                  <TreatmentCard key={idx} item={item} idx={idx} />
                ))}
              </div>

            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function TreatmentCard({ item, idx }: { item: any; idx: number }) {
  return (
    <Card className="group border-none bg-transparent shadow-none transition-all duration-700">
      <div className="relative aspect-[3/4] md:h-[650px] w-full bg-muted overflow-hidden mb-6 md:mb-10 shadow-3xl rounded-none">
        
        <BeforeAfterSlider 
          imgBefore={item.imgBefore} 
          imgAfter={item.img} 
          alt={item.name} 
        />

        <div className="absolute bottom-0 left-0 h-12 w-12 md:h-16 md:w-16 bg-white dark:bg-black flex items-center justify-center z-30 pointer-events-none shadow-tr-lg">
          <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-primary dark:hidden" />
          <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-accent hidden dark:block" />
        </div>

        {item.badge && (
          <div className="absolute top-0 right-0 bg-accent text-white px-4 md:px-6 py-2 md:py-3 text-[8px] md:text-[10px] uppercase font-bold tracking-[0.3em] shadow-xl z-30 pointer-events-none">
            {item.badge}
          </div>
        )}
      </div>
      
      <CardHeader className="p-0 space-y-4 md:space-y-6 relative z-30">
        <div className="flex justify-between items-end border-b border-primary/20 pb-4 md:pb-6">
          <CardTitle className="text-3xl md:text-4xl font-black uppercase dark:font-headline dark:italic dark:lowercase dark:text-5xl transition-colors duration-500">
            {item.name}
          </CardTitle>
        </div>
        <CardDescription className="text-base md:text-lg text-muted-foreground font-light leading-relaxed dark:italic opacity-80">
          {item.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function BeforeAfterSlider({ 
  imgBefore, 
  imgAfter, 
  alt 
}: { 
  imgBefore: string; 
  imgAfter: string; 
  alt: string; 
}) {
  const [position, setPosition] = useState(50);

  return (
    <div className="relative w-full h-full overflow-hidden select-none group/slider">
      <Image
        src={imgAfter}
        alt={`Después - ${alt}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div
        className="absolute top-0 left-0 bottom-0 w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={imgBefore}
          alt={`Antes - ${alt}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 touch-pan-y"
        aria-label="Deslizar para ver antes y después"
      />

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-10 transition-all duration-75"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center border border-gray-200 group-hover/slider:scale-110 transition-transform">
          <MoveHorizontal className="h-5 w-5 text-gray-800" />
        </div>
      </div>
      
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[9px] uppercase tracking-[0.2em] rounded-sm pointer-events-none z-10">
        Antes
      </div>
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 text-[9px] uppercase tracking-[0.2em] rounded-sm pointer-events-none z-10">
        Después
      </div>
    </div>
  );
}
