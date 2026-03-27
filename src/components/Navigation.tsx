"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, HeartPulse, ShieldCheck, Sparkles, Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Procedimientos", href: "#treatments" },
  { name: "Nuestros Doctores", href: "#doctors" },
  { name: "Blog", href: "#blog" },
  { name: "Contacto", href: "#contact" },
];

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-1000 ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md h-20 border-b shadow-sm' : 'bg-white dark:bg-transparent h-24'}`}>
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        
        {/* Logotipo Left */}
        <Link href="/" className="flex items-center space-x-5 group">
          <div className="relative">
            <HeartPulse className="h-10 w-10 text-[#49A9B4]" />
            <div className="absolute -top-1 -right-1">
              <ShieldCheck className="h-4 w-4 text-primary dark:hidden" />
              <Sparkles className="h-4 w-4 text-accent hidden dark:block" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black uppercase tracking-tighter text-[#151515] dark:text-white dark:font-headline dark:italic dark:lowercase dark:text-3xl">
              N-VITALITY
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#49A9B4]">
              Cirugía Plástica y Reconstructiva
            </span>
          </div>
        </Link>

        {/* Menu Center */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#333333] dark:text-white/60 hover:text-accent dark:hover:text-accent transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA Right */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-2 text-[#333333]/60 dark:text-white/40">
              <Phone className="h-3 w-3" />
              <span className="text-[10px] font-bold tracking-widest">098 424 6986</span>
            </div>
          </div>
          <div className="h-8 w-px bg-border/40"></div>
          <ThemeToggle />
          <Button asChild className="rounded-none bg-[#49A9B4] text-white px-10 h-14 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-primary shadow-lg transition-all">
            <Link href="#contact">Agendar Cita</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center space-x-4">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background flex flex-col pt-24">
              <nav className="flex flex-col space-y-8">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="text-4xl font-black uppercase tracking-tighter hover:text-accent transition-all">
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
