
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { TreatmentCatalog } from "@/components/TreatmentCatalog";
import { Testimonials } from "@/components/Testimonials";
import { AIGuide } from "@/components/AIGuide";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { ShieldCheck, Sparkles, HeartPulse, Trophy, MapPin } from "lucide-react";

export default function Home() {
  const heroImg = PlaceHolderImages.find(p => p.id === "hero-clinic-ext")?.imageUrl;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg || "https://picsum.photos/seed/hero/1920/1080"}
            alt="N-VITALITY Luxury Clinic"
            fill
            className="object-cover scale-105"
            priority
            data-ai-hint="luxury architecture"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl text-white">
            <div className="inline-flex items-center space-x-2 bg-primary/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8 animate-in fade-in slide-in-from-bottom duration-700">
              <Trophy className="h-5 w-5 text-accent" />
              <span className="text-sm font-bold tracking-widest uppercase">Clínica #1 en Estética Avanzada</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-headline font-bold leading-none mb-8 drop-shadow-2xl">
              Elevando tu <br />
              <span className="text-accent italic">Belleza Natural</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/90 mb-12 max-w-2xl font-light leading-relaxed">
              Cirugía plástica y medicina estética de élite en manos de expertos internacionales. Resultados que transforman vidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="rounded-full h-20 px-12 text-xl font-bold bg-primary hover:bg-primary/90 transition-all" asChild>
                <Link href="#treatments">Ver 26 Servicios</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-20 px-12 text-xl font-bold border-white text-white hover:bg-white/10" asChild>
                <Link href="#contact">Agendar Cita VIP</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white/60 animate-bounce cursor-pointer">
          <span className="text-sm uppercase tracking-widest">Desliza</span>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">15k+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Pacientes Felices</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">25+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Años de Trayectoria</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Certificación Médica</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-headline font-bold text-primary">3D</div>
              <div className="text-sm text-muted-foreground uppercase tracking-widest">Simulación de Resultados</div>
            </div>
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <HeartPulse className="h-8 w-8 text-accent" />
                <span className="font-headline text-3xl font-bold">N-VITALITY</span>
              </div>
              <p className="text-lg opacity-80 max-w-sm mb-6">
                Líderes en medicina estética y cirugía reconstructiva. Nuestra misión es potenciar tu confianza a través de la excelencia médica.
              </p>
              <div className="flex items-center space-x-2 opacity-80">
                <MapPin className="h-5 w-5" />
                <span>Quito, Ecuador | Edificio Metropolitan Luxury</span>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Navegación</h4>
              <ul className="space-y-4 opacity-70">
                <li><Link href="#treatments">Tratamientos</Link></li>
                <li><Link href="#ai-guide">Guía IA</Link></li>
                <li><Link href="#testimonials">Testimonios</Link></li>
                <li><Link href="#contact">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6">Legal</h4>
              <ul className="space-y-4 opacity-70">
                <li><Link href="#">Privacidad</Link></li>
                <li><Link href="#">Términos</Link></li>
                <li><Link href="#">Consentimiento Informado</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center opacity-60 text-sm">
            © {new Date().getFullYear()} N-VITALITY Aesthetics & Plastic Surgery. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
