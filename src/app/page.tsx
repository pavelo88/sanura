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

export default function Home() {
  const stats = [
    { label: "Casos Auditados", val: "15.000+", icon: Zap },
    { label: "Sedes Globales", val: "Metropolitan", icon: Globe },
    { label: "Maestría Senior", val: "25 Años", icon: HeartPulse },
    { label: "Tasa de Éxito", val: "100%", icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section: Split Layout with Experience Squares */}
      <section className="relative mt-24 lg:mt-32 min-h-[calc(100vh-8rem)] flex items-center overflow-hidden border-b">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
          
          {/* Content Side */}
          <div className="flex flex-col justify-center px-8 lg:px-24 py-16 bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#49A9B4]/10 dark:from-background dark:via-background dark:to-accent/5">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000 max-w-2xl">
              <div className="insurance-header dark:text-accent dark:border-accent">
                {heroContent.badge}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-[#003B49] dark:text-white leading-[1.1] dark:font-headline dark:italic dark:lowercase">
                {heroContent.title} 
                <span className="text-[#49A9B4] dark:text-accent">{heroContent.highlight}</span>
              </h1>
              
              <p className="text-xl text-[#333333] dark:text-muted-foreground font-medium leading-relaxed max-w-xl dark:italic">
                {heroContent.description}
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4">
                <Link href="#treatments" className="bg-[#003B49] dark:bg-accent dark:text-background text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all flex items-center shadow-2xl">
                  {heroContent.cta} <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
                <div className="flex items-center space-x-4 text-[#49A9B4] dark:text-accent font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck className="h-6 w-6" />
                  <span>{heroContent.subText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Grid Side (Replaces visual image) */}
          <div className="grid grid-cols-2 bg-[#003B49] dark:bg-card">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center justify-center p-8 border border-white/5 group hover:bg-accent/10 transition-colors duration-500"
              >
                <stat.icon className="h-10 w-10 text-accent mb-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                <div className="text-4xl lg:text-5xl font-black text-white dark:font-headline dark:italic tracking-tighter mb-2">
                  {stat.val}
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 text-center">
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

      <footer className="py-32 bg-background border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-8 mb-16">
            <div className="flex items-center space-x-6">
              <HeartPulse className="h-12 w-12 text-[#49A9B4]" />
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
