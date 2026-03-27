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
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section: Split Editorial Layout */}
      <section className="relative pt-24 lg:pt-28 min-h-[calc(100vh-6rem)] flex items-stretch overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2">
          
          {/* Content Side */}
          <div className="flex flex-col justify-center px-8 lg:px-20 py-20 split-gradient">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000 max-w-2xl">
              <div className="insurance-header dark:text-accent dark:border-accent">
                {heroContent.badge}
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-black text-[#003B49] dark:text-white leading-[1.1] dark:font-headline dark:italic dark:lowercase">
                {heroContent.title} <br />
                <span className="text-[#49A9B4] dark:text-accent">{heroContent.highlight}</span>
              </h1>
              
              <p className="text-xl text-[#333333] dark:text-muted-foreground font-medium leading-relaxed max-w-xl dark:italic opacity-80">
                {heroContent.description}
              </p>
              
              <div className="flex flex-wrap gap-6 pt-6">
                <Link href="#treatments" className="bg-[#003B49] dark:bg-accent dark:text-background text-white px-10 py-5 font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all flex items-center shadow-3xl">
                  {heroContent.cta} <ArrowRight className="ml-4 h-4 w-4" />
                </Link>
                <div className="flex items-center space-x-4 text-[#49A9B4] dark:text-accent font-bold text-[9px] uppercase tracking-[0.4em]">
                  <ShieldCheck className="h-5 w-5" />
                  <span>{heroContent.subText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Grid Side */}
          <div className="relative bg-[#003B49] dark:bg-card overflow-hidden">
            {/* Background Image (Subtle) */}
            <div className="absolute inset-0 opacity-20 grayscale mix-blend-overlay">
              <Image 
                src="https://picsum.photos/seed/abdomen-lux/1000/1500" 
                alt="Silueta" 
                fill 
                className="object-cover"
                data-ai-hint="toned abdomen"
              />
            </div>
            
            <div className="relative h-full grid grid-cols-2">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center justify-center p-8 border border-white/5 group hover:bg-accent/10 transition-all duration-700"
                >
                  <stat.icon className="h-10 w-10 text-accent mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  <div className="text-4xl lg:text-5xl font-black text-white dark:font-headline dark:italic tracking-tighter mb-2">
                    {stat.val}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/30 text-center leading-loose">
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
            <div className="flex items-center space-x-6">
              <HeartPulse className="h-12 w-12 text-[#49A9B4]" />
              <span className="text-4xl font-black dark:font-headline dark:italic tracking-tighter uppercase dark:lowercase">N-VITALITY</span>
            </div>
          </div>
          <p className="text-[11px] uppercase tracking-[0.6em] font-bold text-muted-foreground/60 mb-10">
            Quito • Metropolitan • Luxury Aesthetics
          </p>
          <div className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.4em]">
            © 2026 N-VITALITY AESTHETICS. HIGH PERFORMANCE BEAUTY.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
