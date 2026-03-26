import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { TreatmentCatalog } from "@/components/TreatmentCatalog";
import { Testimonials } from "@/components/Testimonials";
import { AIGuide } from "@/components/AIGuide";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { HeartPulse, Trophy, MapPin, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-white">
      <Navigation />
      
      {/* Hero Section - Magazine Style Cover */}
      <section className="relative h-screen flex items-center overflow-hidden bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 items-center h-full gap-12">
          <div className="lg:col-span-7 z-20 space-y-10">
            <div className="inline-flex items-center space-x-3 text-primary border-b border-primary/20 pb-4">
              <Trophy className="h-5 w-5" />
              <span className="text-xs font-bold tracking-[0.4em] uppercase">Excelencia Quirúrgica 2026</span>
            </div>
            
            <h1 className="text-7xl md:text-[10rem] magazine-title text-primary leading-[0.80] animate-in fade-in slide-in-from-left duration-1000 tracking-tighter">
              Belleza <br />
              <span className="text-accent font-serif italic font-light normal-case ml-12 md:ml-24">Atemporal</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed border-l-2 border-accent pl-8 py-4">
              Cirugía plástica y medicina estética de élite. Transformamos vidas a través de la armonía y la seguridad médica absoluta.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-10">
              <Button size="lg" className="rounded-none h-16 px-12 text-xs font-bold tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl" asChild>
                <Link href="#treatments">Explorar 26 Servicios</Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-card rounded-none h-16 px-12 text-xs font-bold tracking-[0.2em] uppercase text-primary hover:bg-primary/5 transition-all" asChild>
                <Link href="#contact">Consulta VIP</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative h-full hidden lg:flex items-center justify-center">
            {/* Fondo abstracto editorial */}
            <div className="absolute inset-0 bg-accent/5 -rotate-6 scale-110 transition-transform duration-1000" />
            
            {/* Contenedor de la imagen principal */}
            <div className="relative h-[85%] w-full max-w-md overflow-hidden shadow-2xl z-10 border border-border/50">
              <Image
                src="https://picsum.photos/seed/lux-medical/1000/1400"
                alt="N-VITALITY Clinic Architecture"
                fill
                className="object-cover scale-105 hover:scale-100 transition-transform duration-[2000ms]"
                priority
              />
            </div>
            
            {/* Tarjeta Glassmorphism (Cyan en claro, Rosado en oscuro) */}
            <div className="glass-card absolute bottom-20 -left-16 p-8 max-w-[240px] z-30">
              <Sparkles className="h-6 w-6 mb-4 text-accent" />
              <p className="magazine-title text-xs tracking-[0.2em] text-primary uppercase leading-relaxed">
                Sede Principal <br/>
                <span className="text-muted-foreground font-sans tracking-normal capitalize mt-1 inline-block">Quito, Ecuador</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Salubridad y Prestigio - Espaciado de Lujo */}
      <section className="py-32 border-y bg-primary text-primary-foreground transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center items-center">
            <div className="space-y-4">
              <div className="text-6xl font-headline font-bold text-accent">15k</div>
              <div className="text-[11px] opacity-80 uppercase tracking-[0.3em] font-bold">Casos de Éxito</div>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-headline font-bold text-accent">25+</div>
              <div className="text-[11px] opacity-80 uppercase tracking-[0.3em] font-bold">Años de Maestría</div>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-headline font-bold text-accent">ISO</div>
              <div className="text-[11px] opacity-80 uppercase tracking-[0.3em] font-bold">Certificación Médica</div>
            </div>
            <div className="space-y-4">
              <div className="text-6xl font-headline font-bold text-accent">3D</div>
              <div className="text-[11px] opacity-80 uppercase tracking-[0.3em] font-bold">Simulación Virtual</div>
            </div>
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-32 bg-background border-t transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center space-x-3">
                <HeartPulse className="h-10 w-10 text-primary" />
                <span className="magazine-title text-4xl text-primary">N-VITALITY</span>
              </div>
              <p className="text-lg text-muted-foreground font-light leading-relaxed max-w-sm">
                Redefiniendo el estándar de la cirugía plástica en Latinoamérica. Donde la ciencia médica se encuentra con la perfección artística.
              </p>
              <div className="flex items-center space-x-3 text-primary font-bold tracking-widest text-xs uppercase">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Edificio Metropolitan Luxury, Quito</span>
              </div>
            </div>
            <div>
              <h4 className="magazine-title text-sm mb-10 tracking-widest">Navegación</h4>
              <ul className="space-y-6 text-xs uppercase tracking-widest font-bold text-muted-foreground">
                <li className="hover:text-primary transition-colors"><Link href="#treatments">Tratamientos</Link></li>
                <li className="hover:text-primary transition-colors"><Link href="#ai-guide">Guía IA</Link></li>
                <li className="hover:text-primary transition-colors"><Link href="#testimonials">Historias</Link></li>
                <li className="hover:text-primary transition-colors"><Link href="#contact">Agendar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="magazine-title text-sm mb-10 tracking-widest">Compromiso</h4>
              <ul className="space-y-6 text-xs uppercase tracking-widest font-bold text-muted-foreground">
                <li>Privacidad VIP</li>
                <li>Ética Médica</li>
                <li>Bioseguridad</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t text-center text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground/50">
            © 2026 N-VITALITY AESTHETICS & PLASTIC SURGERY. ARCHITECTURE OF BEAUTY.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}