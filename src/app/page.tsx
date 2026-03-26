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
      
      {/* Hero Section: Dual Concept */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        
        {/* LIGHT MODE: Split Screen (Seguros/Médico) */}
        <div className="dark:hidden absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
          {/* Left: Gradient & Content */}
          <div className="bg-gradient-to-br from-[#e0f7fa] via-[#b2ebf2] to-[#49A9B4]/20 flex items-center px-12 lg:px-24">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000 max-w-xl">
              <div className="insurance-header">Respaldo Quirúrgico Certificado</div>
              <h1 className="text-5xl lg:text-7xl font-black text-[#003B49] leading-[1.1]">
                Define tu cuerpo, eleva tu confianza con la <span className="text-[#49A9B4]">Abdominoplastia</span>
              </h1>
              <p className="text-xl text-[#333333] font-medium leading-relaxed">
                Descubre un abdomen más firme y plano eliminando el exceso de piel y grasa. Resultados naturales y personalizados con garantía médica.
              </p>
              <div className="flex flex-wrap gap-6 pt-4">
                <Link href="#treatments" className="bg-[#003B49] text-white px-10 py-5 font-bold uppercase tracking-widest text-sm hover:bg-[#002a35] transition-all flex items-center shadow-2xl">
                  Saber más de la Cirugía <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
                <div className="flex items-center space-x-4 text-[#49A9B4] font-bold text-[10px] uppercase tracking-widest">
                  <ShieldCheck className="h-6 w-6" />
                  <span>Protocolo de Bioseguridad Nivel 5</span>
                </div>
              </div>
            </div>
          </div>
          {/* Right: Silhouette Image */}
          <div className="relative hidden lg:block overflow-hidden">
            <Image
              src="https://picsum.photos/seed/abdomen-lux/1000/1500"
              alt="Resultados Abdominoplastia"
              fill
              className="object-cover"
              priority
              data-ai-hint="toned abdomen"
            />
            {/* Guide lines overlay */}
            <div className="absolute inset-0 dotted-line-guide opacity-10 pointer-events-none" />
          </div>
        </div>

        {/* DARK MODE: Soho Magazine Style */}
        <div className="hidden dark:block absolute inset-0">
          <Image
            src="https://picsum.photos/seed/lux-arch/1920/1080"
            alt="N-Vitality Architecture"
            fill
            className="object-cover opacity-30 grayscale-0 transition-all duration-[3s]"
            priority
            data-ai-hint="luxury architecture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          
          <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              <div className="lg:col-span-8 space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
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
          </div>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="py-24 border-y bg-muted/20 backdrop-blur-sm relative z-20">
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