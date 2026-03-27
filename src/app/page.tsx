
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
    <div className="min-h-screen bg-background transition-colors duration-1000">
      <Navigation />
      
      {/* Hero Section: Editorial Split Composition */}
      <section className="relative pt-24 lg:pt-0 min-h-screen flex items-stretch overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side: Insurance / Corporate Health Magazine */}
          <div className="flex flex-col justify-center px-8 lg:px-24 py-20 split-gradient relative z-10">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000 max-w-2xl">
              <div className="insurance-header dark:text-accent dark:border-accent">
                {heroContent.badge}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-[#003B49] dark:text-white leading-[1.1] dark:font-headline dark:italic dark:lowercase">
                {heroContent.title} <br />
                <span className="text-accent">{heroContent.highlight}</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-[#333333]/80 dark:text-muted-foreground font-medium leading-relaxed max-w-xl dark:italic">
                {heroContent.description}
              </p>
              
              <div className="flex flex-wrap gap-6 pt-10">
                <Link href="#treatments" className="bg-[#003B49] dark:bg-accent dark:text-background text-white px-10 py-5 font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-all flex items-center shadow-xl">
                  {heroContent.cta} <ArrowRight className="ml-4 h-4 w-4" />
                </Link>
                <div className="flex items-center space-x-4 text-accent font-bold text-[9px] uppercase tracking-[0.3em]">
                  <ShieldCheck className="h-5 w-5" />
                  <span>{heroContent.subText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Visual Silhouette + Modular Experience Grid */}
          <div className="relative bg-white dark:bg-card overflow-hidden">
            {/* Visual Anchor: Torso Silhouette */}
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://picsum.photos/seed/abdomen-lux/1000/1500" 
                alt="Silueta Estética" 
                fill 
                className="object-cover object-center grayscale opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-overlay"
                priority
                data-ai-hint="toned abdomen"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-transparent dark:from-background/80"></div>
            </div>
            
            {/* Modular Experience Grid: The "Reference" Style */}
            <div className="relative z-10 h-full grid grid-cols-2 modular-grid-border">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center p-10 modular-grid-border bg-white/5 backdrop-blur-[1px] hover:bg-accent/5 transition-colors duration-700"
                >
                  <div className="mb-6 opacity-30 group-hover:opacity-100 transition-opacity">
                    <stat.icon className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-4xl lg:text-6xl font-black text-[#003B49] dark:text-white dark:font-headline dark:italic tracking-tighter mb-2">
                    {stat.val}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.4em] font-bold text-[#333333]/60 dark:text-white/40 text-center leading-loose">
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

      <footer className="py-24 bg-background border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col items-center space-y-8 mb-12">
            <HeartPulse className="h-12 w-12 text-accent" />
            <span className="text-3xl font-black dark:font-headline dark:italic tracking-tighter uppercase dark:lowercase">N-VITALITY</span>
          </div>
          <p className="text-[11px] uppercase tracking-[0.6em] font-bold text-muted-foreground/50 mb-8">
            Quito • Metropolitan • Private Aesthetic Atelier
          </p>
          <div className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.3em]">
            © 2026 N-VITALITY AESTHETICS. BEYOND PERFECTION.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
