import { Navigation } from "@/components/Navigation";
import { TreatmentCatalog } from "@/components/TreatmentCatalog";
import { AIGuide } from "@/components/AIGuide";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Testimonials } from "@/components/Testimonials";
import { Toaster } from "@/components/ui/toaster";
import { ShieldCheck, ArrowRight, Zap, Globe, HeartPulse } from "lucide-react";
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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section: Split Editorial Layout */}
      <section className="relative mt-24 lg:mt-32 min-h-[calc(100vh-8rem)] flex items-center overflow-hidden border-b">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
          
          {/* Content Side: Insurance/Editorial */}
          <div className="flex flex-col justify-center px-8 lg:px-24 py-20 bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-white dark:from-background dark:via-background dark:to-accent/10">
            <div className="space-y-10 animate-in fade-in slide-in-from-left duration-1000 max-w-2xl">
              <div className="insurance-header dark:text-accent dark:border-accent">
                {heroContent.badge}
              </div>
              
              <h1 className="text-6xl lg:text-[100px] font-black text-[#003B49] dark:text-white leading-[0.85] dark:font-headline dark:italic dark:lowercase tracking-tighter">
                {heroContent.title} <br />
                <span className="text-[#49A9B4] dark:text-accent">{heroContent.highlight}</span>
              </h1>
              
              <p className="text-xl text-[#333333] dark:text-muted-foreground font-medium leading-relaxed max-w-xl dark:italic opacity-80">
                {heroContent.description}
              </p>
              
              <div className="flex flex-wrap gap-6 pt-8">
                <Link href="#treatments" className="bg-[#003B49] dark:bg-accent dark:text-background text-white px-12 py-6 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all flex items-center shadow-3xl">
                  {heroContent.cta} <ArrowRight className="ml-4 h-4 w-4" />
                </Link>
                <div className="flex items-center space-x-4 text-[#49A9B4] dark:text-accent font-bold text-[9px] uppercase tracking-[0.4em]">
                  <ShieldCheck className="h-5 w-5" />
                  <span>{heroContent.subText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Side: The Authority Grid */}
          <div className="grid grid-cols-2 bg-[#003B49] dark:bg-card">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center justify-center p-12 border border-white/5 group hover:bg-accent/20 transition-all duration-700"
              >
                <stat.icon className="h-12 w-12 text-accent mb-8 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <div className="text-5xl lg:text-7xl font-black text-white dark:font-headline dark:italic tracking-tighter mb-4">
                  {stat.val}
                </div>
                <div className="text-[10px] uppercase tracking-[0.5em] font-bold text-white/30 text-center leading-loose">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-40 bg-background border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-12 mb-20">
            <div className="flex items-center space-x-8">
              <HeartPulse className="h-16 w-16 text-[#49A9B4]" />
              <span className="text-6xl font-black dark:font-headline dark:italic tracking-tighter uppercase dark:lowercase">N-VITALITY</span>
            </div>
            <div className="h-px w-32 bg-primary/20" />
          </div>
          <p className="text-[12px] uppercase tracking-[0.8em] font-bold text-muted-foreground/60 mb-16">
            Quito • Luxury Suite Metropolitan • Architecture of Beauty
          </p>
          <div className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.4em]">
            © 2026 N-VITALITY AESTHETICS & SOHO COLLECTION. HIGH PERFORMANCE BEAUTY.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
