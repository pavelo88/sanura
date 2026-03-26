"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Servicios", href: "#treatments" },
  { name: "Pacientes", href: "#testimonials" },
  { name: "IA Guía", href: "#ai-guide" },
  { name: "Contacto", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-700 ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b' : 'bg-transparent border-transparent'}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <HeartPulse className="h-6 w-6 text-primary" />
            <div className="absolute -top-1 -right-1">
              <div className="dark:hidden"><ShieldCheck className="h-3 w-3 text-accent" /></div>
              <div className="hidden dark:block"><Sparkles className="h-3 w-3 text-accent animate-pulse" /></div>
            </div>
          </div>
          <span className="text-2xl font-black uppercase tracking-tighter text-primary dark:font-headline dark:italic dark:lowercase dark:text-3xl">
            N-VITALITY
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70 hover:text-primary transition-all relative group/nav"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover/nav:w-full transition-all" />
            </Link>
          ))}
          <div className="flex items-center space-x-6 pl-6 border-l">
            <ThemeToggle />
            <Button asChild className="rounded-none bg-primary text-white px-8 font-bold text-[10px] uppercase tracking-widest h-12 hover:bg-primary/90 shadow-xl transition-all">
              <Link href="#contact">Consulta VIP</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary">
                <Menu className="h-8 w-8" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col pt-24 bg-background border-l">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-black uppercase tracking-tighter dark:font-headline dark:italic py-4 border-b hover:text-primary transition-all"
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-auto pb-10">
                <Button className="w-full rounded-none py-8 text-xs font-bold uppercase tracking-widest bg-primary text-white" asChild>
                  <Link href="#contact" onClick={() => setIsOpen(false)}>Agendar Ahora</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}