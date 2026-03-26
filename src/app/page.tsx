
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { TreatmentCatalog } from "@/components/TreatmentCatalog";
import { AIGuide } from "@/components/AIGuide";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Testimonials } from "@/components/Testimonials";
import { Toaster } from "@/components/ui/toaster";
import { ShieldCheck, ArrowRight, Zap, Globe, HeartPulse, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Dinámico con Imagen de Fondo */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-black">
        {/* Imagen de Fondo con Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://picsum.photos/seed/lux-arch/1920/1080"
            alt="N-Vitality Architecture"
            fill
            className="object-cover opacity-40 dark:opacity-30 grayscale-[50%] dark:grayscale-0 transition-all duration-[3s]"
            priority
            data-ai-hint="luxury architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-12">
            {/* Experiencia Modo Insurance (Light) */}
            <div className="dark:hidden space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="insurance-header">Respaldo Quirúrgico N-VITALITY</div>
              <h1 className="text-7xl md:text-9xl font-black text-primary leading-[0.85] uppercase tracking-tighter">
                Seguridad <br /> <span className="text-accent">Patrimonial</span>
              </h1>
              <p className="text-2xl text-muted-foreground max-w-2xl border-l-4 border-accent pl-8 py-4 font-medium leading-relaxed">
                Su transformación es tratada como una inversión de activos. Protocolos de bioseguridad nivel 5 y póliza de resultados certificada.
              </p>
              <div className="flex flex-wrap gap-6 pt-8">
                <Link href="#treatments" className="bg-primary text-white px-12 py-6 font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-all flex items-center shadow-2xl">
                  Consultar Cobertura <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
                <div className="flex items-center space-x-4 text-primary font-bold text-sm uppercase tracking-widest bg-white/50 backdrop-blur px-6 py-4">
                  <ShieldCheck className="h-6 w-6" />
                  <span>ISO 9001:2026 Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Experiencia Modo Fashion (Dark) */}
            <div className="hidden dark:block space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
              <span className="text-accent font-serif italic text-3xl lowercase tracking-widest block mb-4">the experience of self</span>
              <h1 className="magazine-title text-primary text-8xl md:text-[12rem]">
                SOHO <br /> <span className="text-accent italic font-light lowercase">Artistry</span>
              </h1>
              <p className="text-3xl text-muted-foreground font-light max-w-2xl italic leading-relaxed opacity-90">
                Trasciende lo convencional. No operamos cuerpos, esculpimos identidades bajo la curaduría estética más exigente del continente.
              </p>
              <div className="pt-12">
                <Link href="#contact" className="inline-block border-b-2 border-primary text-primary px-4 py-4 font-headline text-3xl italic hover:text-accent hover:border-accent transition-all duration-700">
                  Join the Collection
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            {/* El Elemento "Experiencia" - Abstracto y Dinámico */}
            <div className="relative aspect-[3/4] w-full flex items-center justify-center">
              <div className="absolute inset-0 border-[20px] border-primary/10 dark:border-accent/10 animate-pulse" />
              <div className="glass-card p-12 space-y-8 text-center backdrop-blur-3xl border-white/20 dark:border-primary/10">
                <div className="dark:hidden space-y-6">
                  <div className="text-6xl font-black text-primary">99.8%</div>
                  <p className="text-xs font-bold uppercase tracking-[0.4em] leading-loose text-muted-foreground">
                    Surgical Precision <br /> Index N-Vitality
                  </p>
                  <div className="h-1 w-20 bg-accent mx-auto" />
                </div>
                <div className="hidden dark:block space-y-6">
                  <Sparkles className="h-16 w-16 text-accent mx-auto animate-spin-slow" />
                  <p className="text-4xl font-headline italic text-white">L'Excellence</p>
                  <p className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">
                    Custom Tailored <br /> Beauty Atelier
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-24 border-y bg-muted/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {[
              { label: "Casos Auditados", val: "15.000+", icon: Zap },
              { label: "Sedes Globales", val: "Metropolitan", icon: Globe },
              { label: "Maestría Senior", val: "25 Años", icon: HeartPulse },
              { label: "Tasa de Éxito", val: "100%", icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="group cursor-default space-y-4">
                <stat.icon className="h-8 w-8 mx-auto text-primary opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                <div className="text-6xl font-black dark:font-headline dark:italic tracking-tighter transition-colors group-hover:text-primary">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-32 bg-background border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-8 mb-16">
            <div className="flex items-center space-x-6">
              <HeartPulse className="h-12 w-12 text-primary" />
              <span className="text-5xl font-black dark:font-headline dark:italic tracking-tighter uppercase dark:lowercase">N-VITALITY</span>
            </div>
            <div className="h-px w-24 bg-primary/20" />
          </div>
          <p className="text-sm uppercase tracking-[0.6em] font-bold text-muted-foreground/60 mb-12">
            Quito • Luxury Suite Metropolitan • Architecture of Beauty
          </p>
          <div className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.3em]">
            © 2026 N-VITALITY AESTHETICS & SOHO COLLECTION. HIGH PERFORMANCE BEAUTY.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
