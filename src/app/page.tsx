
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
import { ShieldCheck, Sparkles, HeartPulse } from "lucide-react";

export default function Home() {
  const heroImg = PlaceHolderImages.find(p => p.id === "hero-clinic")?.imageUrl;

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg || "https://picsum.photos/seed/hero/1200/800"}
            alt="N-VITALITY Clinic"
            fill
            className="object-cover opacity-30 dark:opacity-20 transition-opacity duration-1000"
            priority
            data-ai-hint="luxury aesthetic clinic"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left duration-1000">
            <div className="flex items-center space-x-2 text-primary font-bold tracking-widest uppercase mb-4">
              <ShieldCheck className="h-5 w-5" />
              <span>Certified Excellence in Aesthetics</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight mb-6">
              Reinvent Your <br />
              <span className="text-primary italic">Vitality</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
              Experience the pinnacle of aesthetic medicine and plastic surgery. Where science meets art to enhance your unique beauty.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold" asChild>
                <Link href="#treatments">Explore Treatments</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold" asChild>
                <Link href="#ai-guide">Try AI Treatment Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-12 items-center text-muted-foreground font-headline font-semibold text-xl">
            <div className="flex items-center space-x-2">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span>15+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span>Board Certified Surgeons</span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span>Advanced AI Diagnostics</span>
            </div>
          </div>
        </div>
      </section>

      <TreatmentCatalog />
      
      <AIGuide />
      
      <Testimonials />
      
      <ContactForm />

      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-2">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span className="font-headline text-2xl font-bold text-primary">N-VITALITY</span>
            </div>
            <div className="flex space-x-8 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-primary transition-colors">Sitemap</Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} N-VITALITY Aesthetics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
      <Toaster />
    </div>
  );
}
