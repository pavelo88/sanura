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
  const stats = [
    { label: "Casos Auditados", val: "15.000+", icon: Zap },
    { label: "Sedes Globales", val: "Metropolitan", icon: Globe },
    { label: "Maestría Senior", val: "25 Años", icon: HeartPulse },
    { label: "Tasa de Éxito", val: "100%", icon: ShieldCheck }
  ];

  const heroContent = {
    badge: "Respaldo Quirúrgico Certificado",
    title: "Define tu cuerpo, eleva tu confianza con la ",
    highlight: "Abdominoplastia",
    description: "Descubre un abdomen más firme y plano eliminando el exceso de piel y grasa. Resultados naturales y personalizados con garantía médica.",
    cta: "Saber más de la Cirugía",
    subText: "Protocolo de Bioseguridad Nivel 5"
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section: Unified Content, Dual Styling */}
      <section className="relative min-h-[calc(100vh-6rem)] mt-24 flex items-center overflow-hidden border-b">
        
        {/* Split Screen Layout */}
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
          
          {/* Content Side */}
          <div className="flex flex-col justify-center px-8 lg:px-24 py-12 bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#49A9B4]/10 dark:from-background dark:via-background dark:to-accent/5">
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

              {/* Experience Stats Integrated for Large Screens */}
              <div className="hidden xl:grid grid-cols-2 gap-8 pt-12 border-t border-primary/10 dark:border-white/10 mt-12">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <stat.icon className="h-6 w-6 text-primary dark:text-accent mt-1" />
                    <div>
                      <div className="text-2xl font-black dark:font-headline dark:italic tracking-tighter text-[#003B49] dark:text-white">
                        {stat.val}
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative hidden lg:block overflow-hidden min-h-[600px]">
            {/* Image for Light Mode */}
            <div className="dark:hidden absolute inset-0">
              <Image
                src="https://picsum.photos/seed/abdomen-lux/1000/1500"
                alt="Resultados Abdominoplastia"
                fill
                className="object-cover"
                priority
                data-ai-hint="toned abdomen"
              />
            </div>
            {/* Image for Dark Mode (Soho Look) */}
            <div className="hidden dark:block absolute inset-0">
              <Image
                src="https://picsum.photos/seed/lux-arch/1920/1080"
                alt="N-Vitality Architecture"
                fill
                className="object-cover grayscale-0 transition-all duration-[3s]"
                priority
                data-ai-hint="luxury architecture"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Section (Visible only on mobile/medium screens now) */}
      <section className="xl:hidden py-16 border-b bg-muted/20 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="group cursor-default space-y-4">
                <stat.icon className="h-6 w-6 mx-auto text-primary opacity-40 group-hover:opacity-100 transition-all duration-500" />
                <div className="text-4xl font-black dark:font-headline dark:italic tracking-tighter transition-colors group-hover:text-primary">{stat.val}</div>
                <div className="text-[8px] uppercase tracking-[0.3em] font-bold text-muted-foreground">{stat.label}</div>
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
