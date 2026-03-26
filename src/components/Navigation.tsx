"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, HeartPulse } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Tratamientos", href: "#treatments" },
  { name: "Testimonios", href: "#testimonials" },
  { name: "Guía IA", href: "#ai-guide" },
  { name: "Contacto", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para el efecto de vidrio esmerilado
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-[1500ms] ${scrolled ? 'glass-card border-b' : 'bg-transparent border-transparent'}`}>
      <div className="container mx-auto flex h-24 items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center space-x-3 group">
          <HeartPulse className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-500" />
          <span className="magazine-title text-2xl md:text-3xl font-light tracking-[0.15em] text-primary">
            N-VITALITY
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] transition-colors text-foreground/80 hover:text-primary relative after:absolute after:bottom-[-6px] after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all hover:after:w-full duration-500"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex items-center space-x-6 border-l border-primary/20 pl-6">
            {mounted && <ThemeToggle />}
            <Button asChild variant="outline" className="glass-card rounded-none px-8 font-bold uppercase tracking-[0.2em] text-[10px] h-12 border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all duration-700">
              <Link href="#contact">Consulta VIP</Link>
            </Button>
          </div>
        </nav>

        {/* Navegación Mobile */}
        <div className="flex md:hidden items-center space-x-4">
          {mounted && <ThemeToggle />}
          {mounted && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/5">
                  <Menu className="h-8 w-8" strokeWidth={1.5} />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col pt-24 border-l border-primary/20 glass-card">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-headline font-light py-6 border-b border-primary/10 uppercase tracking-[0.2em] hover:text-primary hover:pl-4 transition-all duration-500"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-auto pb-12">
                  <Button className="w-full rounded-none py-8 text-xs uppercase font-bold tracking-[0.3em] bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-500 shadow-xl" asChild>
                    <Link href="#contact" onClick={() => setIsOpen(false)}>Agendar Ahora</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}