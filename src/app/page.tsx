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
      
      {/* Hero Section - Magazine Style */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 items-center h-full gap-8">
          <div className="lg:col-span-7 z-10 space-y-8">
            <div className="inline-flex items-center space-x-3 text-primary border-b border-primary/20 pb-2">
              <Trophy className="h-5 w-5" />
              <span className="text-xs font-bold tracking-[0.3em] uppercase">Excelencia Quirúrgica 2024</span>
            </div>
            <h1 className="text-7xl md:text-[9rem] magazine-title text-primary leading-[0.85] animate-in fade-in slide-in-from-left duration-1000">
              Belleza <br />
              <span className="text-accent italic font-normal normal-case ml-8">Atemporal</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed border-l-4 border-accent pl-8 py-2">
              Cirugía plástica y medicina estética de élite. Transformamos vidas a través de la armonía y la seguridad médica absoluta.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 pt-8">
              <Button size="lg" className="rounded-none h-16 px-12 text-sm font-bold tracking-widest uppercase bg-primary hover:bg-primary/90 transition-all shadow-xl" asChild>
                <Link href="#treatments">Explorar 26 Servicios</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-none h-16 px-12 text-sm font-bold tracking-widest uppercase border-primary text-primary hover:bg-primary/5" asChild>
                <Link href="#contact">Consulta VIP</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative h-full hidden lg:block">
            <div className="absolute inset-0 bg-accent/10 -rotate-3 translate-x-4 translate-y-4" />
            <div className="relative h-[80%] w-full border border-primary/10 overflow-hidden shadow-2xl mt-12">
              <Image
                src="https://picsum.photos/seed/lux-medical/1000/1200"
                alt="N-VITALITY Clinic Architecture"
                fill
                className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
                priority
                data-ai-hint="luxury architecture"
              />
            </div>
            <div className="absolute -bottom-4 -left-12 bg-white p-8 border shadow-xl max-w-[200px] magazine-title text-xs tracking-widest text-primary">
              <Sparkles className="h-6 w-6 mb-4 text-accent" />
              Sede Principal: Quito, Ecuador
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Salubridad y Prestigio */}
      <section className="py-20 border-y bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center items-center">
            <div className="space-y-2">
              <div className="text-5xl font-headline font-bold text-accent">15k</div>
              <div className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-bold">Casos de Éxito</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-headline font-bold text-accent">25+</div>
              <div className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-bold">Años de Maestría</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-headline font-bold text-accent">ISO</div>
              <div className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-bold">Certificación Médica</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-headline font-bold text-accent">3D</div>
              <div className="text-[10px] opacity-70 uppercase tracking-[0.2em] font-bold">Simulación Virtual</div>
            </div>
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-32 bg-background border-t">
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
            © {new Date().getFullYear()} N-VITALITY AESTHETICS & PLASTIC SURGERY. ARCHITECTURE OF BEAUTY.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}