import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { TreatmentCatalog } from "@/components/TreatmentCatalog";
import { AIGuide } from "@/components/AIGuide";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Testimonials } from "@/components/Testimonials";
import { Toaster } from "@/components/ui/toaster";
import { ShieldCheck, ArrowRight, Zap, Globe, HeartPulse } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Dinámico: Insurance (Light) vs Fashion (Dark) */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 z-10">
            {/* Contenido modo Insurance (Visible en light) */}
            <div className="dark:hidden space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <div className="insurance-header">Garantía de Excelencia Quirúrgica N-VITALITY</div>
              <h1 className="text-6xl md:text-8xl font-black text-primary leading-none uppercase">
                Seguridad <br /> <span className="text-accent">Absoluta</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl border-l-4 border-accent pl-6 py-2">
                Protocolos internacionales de bioseguridad y resultados certificados por auditoría médica externa. Tu salud es nuestro activo más valioso.
              </p>
              <div className="flex gap-4 pt-6">
                <Link href="#treatments" className="bg-primary text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:bg-primary/90 transition-all flex items-center">
                  Ver Portafolio Médico <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest">
                  <ShieldCheck className="h-5 w-5" />
                  <span>ISO 9001:2026 Certified</span>
                </div>
              </div>
            </div>

            {/* Contenido modo Fashion (Visible en dark) */}
            <div className="hidden dark:block space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
              <span className="text-accent font-serif italic text-2xl lowercase tracking-wider block">the art of perfection</span>
              <h1 className="magazine-title text-primary">
                SOHO <br /> <span className="text-accent italic font-light lowercase">Aesthetics</span>
              </h1>
              <p className="text-2xl text-muted-foreground font-light max-w-xl italic leading-relaxed opacity-80">
                Donde la medicina se encuentra con la alta costura. Rediseñamos tu silueta con la precisión de un modisto y el rigor de un cirujano.
              </p>
              <div className="pt-10">
                <Link href="#contact" className="border border-primary text-primary px-16 py-6 font-headline text-lg italic hover:bg-primary hover:text-primary-foreground transition-all duration-700">
                  Agendar Consulta Editorial
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-3xl grayscale dark:grayscale-0 transition-all duration-[2s]">
              <Image
                src="https://picsum.photos/seed/lux-building/1000/1250"
                alt="Architecture"
                fill
                className="object-cover scale-105 hover:scale-100 transition-transform duration-[3s]"
                priority
                data-ai-hint="luxury building"
              />
              <div className="absolute inset-0 bg-primary/5 dark:bg-transparent" />
            </div>
            
            {/* Elemento decorativo corporativo vs fashion */}
            <div className="absolute -bottom-10 -left-10 glass-card p-10 max-w-[280px] z-20">
              <div className="dark:hidden space-y-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <p className="text-xs font-bold uppercase tracking-widest leading-relaxed">
                  Sistema de Cobertura <br /> Integral N-Vitality
                </p>
              </div>
              <div className="hidden dark:block space-y-4 text-accent">
                <div className="text-4xl font-headline italic">26</div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold">
                  Procedures in the <br /> Soho Collection
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats / Runway Section */}
      <section className="py-24 border-y bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Casos de Éxito", val: "15K+", icon: Zap },
              { label: "Países", val: "22", icon: Globe },
              { label: "Maestría", val: "25A", icon: HeartPulse },
              { label: "Seguridad", val: "100%", icon: ShieldCheck }
            ].map((stat, i) => (
              <div key={i} className="group cursor-default">
                <stat.icon className="h-6 w-6 mx-auto mb-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl font-bold dark:font-headline dark:italic mb-2">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-24 bg-background border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-4 mb-12">
            <HeartPulse className="h-8 w-8 text-primary" />
            <span className="text-3xl font-black dark:font-headline dark:italic tracking-tighter uppercase dark:lowercase">N-VITALITY</span>
          </div>
          <p className="text-xs uppercase tracking-[0.5em] font-bold text-muted-foreground/60 mb-8">
            Quito • Metropolitan Luxury Suite • High Aesthetics
          </p>
          <div className="text-[9px] text-muted-foreground/40 uppercase tracking-widest">
            © 2026 N-VITALITY AESTHETICS. ALL RIGHTS RESERVED. ARCHITECTURE OF BEAUTY.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}