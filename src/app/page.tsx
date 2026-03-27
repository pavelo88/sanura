import { Navigation } from "@/components/Navigation";
import { TreatmentCatalog } from "@/components/TreatmentCatalog";
import { AIGuide } from "@/components/AIGuide";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Testimonials } from "@/components/Testimonials";
import { Toaster } from "@/components/ui/toaster";
import { ShieldCheck, ArrowRight, Zap, Globe, HeartPulse } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const heroContent = {
  badge: "Respaldo Quirúrgico Certificado",
  title: "Define tu cuerpo, eleva tu confianza con la ",
  highlight: "Abdominoplastia",
  description: "Descubre un abdomen más firme y plano eliminando el exceso de piel y grasa. Resultados naturales y personalizados con garantía médica.",
  cta: "Saber más de la Cirugía",
  subText: "Protocolo de Bioseguridad Nivel 5"
};

const stats = [
  { label: "Casos Auditados", val: "15.000+", icon: Zap },
  { label: "Sedes Globales", val: "Metropolitan", icon: Globe },
  { label: "Maestría Senior", val: "25 Años", icon: HeartPulse },
  { label: "Tasa de Éxito", val: "100%", icon: ShieldCheck }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white transition-colors duration-[1500ms]">
      <Navigation />
      
      {/* Hero Section: Split Editorial Layout */}
      <section className="relative pt-24 lg:pt-32 min-h-[calc(100vh-6rem)] flex items-stretch overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          
          {/* Content Side: Insurance / Health Magazine Style */}
          <div className="flex flex-col justify-center px-8 lg:px-20 py-20 split-gradient relative z-10">
            <div className="space-y-10 animate-in fade-in slide-in-from-left duration-[1000ms] max-w-2xl">
              <div className="insurance-header dark:text-accent dark:border-accent">
                {heroContent.badge}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-[#003B49] dark:text-white leading-[1.05] dark:font-headline dark:italic tracking-tighter">
                {heroContent.title} <br />
                <span className="text-[#49A9B4] dark:text-accent">{heroContent.highlight}</span>
              </h1>
              
              <p className="text-xl text-[#333333] dark:text-muted-foreground font-medium leading-relaxed max-w-xl dark:italic opacity-80">
                {heroContent.description}
              </p>
              
              <div className="flex flex-wrap gap-8 pt-8">
                <Link href="#treatments" className="bg-[#003B49] dark:bg-accent dark:text-background text-white px-12 py-6 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all flex items-center shadow-3xl">
                  {heroContent.cta} <ArrowRight className="ml-4 h-4 w-4" />
                </Link>
                <div className="flex items-center space-x-4 text-[#49A9B4] dark:text-accent font-bold text-[10px] uppercase tracking-[0.4em]">
                  <ShieldCheck className="h-6 w-6" />
                  <span>{heroContent.subText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Side: Torso Silhouette + Modular Experience Stats */}
          <div className="relative bg-white dark:bg-card overflow-hidden min-h-[600px]">
            {/* Background Silhouette (Torso Focused) */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://picsum.photos/seed/abdomen-lux/1000/1500" 
                alt="Silueta Abdominal" 
                fill 
                className="object-cover object-center grayscale opacity-40 mix-blend-multiply dark:mix-blend-overlay dark:opacity-20"
                priority
                data-ai-hint="toned abdomen"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-white dark:via-black/20 dark:to-background"></div>
            </div>
            
            {/* Modular Experience Grid: Elegant & Subtle */}
            <div className="relative z-10 h-full grid grid-cols-2 gap-px bg-border/20 dark:bg-white/5">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center p-12 bg-white/10 dark:bg-black/20 backdrop-blur-[2px] group hover:bg-accent/5 transition-all duration-[800ms] border border-transparent hover:border-accent/20"
                >
                  <stat.icon className="h-10 w-10 text-accent mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[600ms]" />
                  <div className="text-5xl lg:text-6xl font-black text-[#003B49] dark:text-white dark:font-headline dark:italic tracking-tighter mb-3">
                    {stat.val}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-[#333333]/50 dark:text-white/40 text-center leading-loose">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-32 bg-background border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-10 mb-16">
            <div className="flex items-center space-x-6 group">
              <HeartPulse className="h-14 w-14 text-[#49A9B4] group-hover:scale-110 transition-transform" />
              <span className="text-5xl font-black dark:font-headline dark:italic tracking-tighter uppercase dark:lowercase">N-VITALITY</span>
            </div>
          </div>
          <p className="text-[12px] uppercase tracking-[0.8em] font-bold text-muted-foreground/60 mb-12">
            Quito • Metropolitan • Luxury Aesthetics
          </p>
          <div className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.4em]">
            © 2026 N-VITALITY AESTHETICS. HIGH PERFORMANCE BEAUTY.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
