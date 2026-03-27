"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HeartPulse, ShieldCheck, Sparkles, Phone, Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Procedimientos", href: "#treatments" },
  { name: "Doctores", href: "#doctors" },
  { name: "Contacto", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-700 ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md h-20 border-b' : 'bg-white dark:bg-transparent h-24'}`}>
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <HeartPulse className="h-8 w-8 text-accent" />
            <div className="absolute -top-1 -right-1">
              <ShieldCheck className="h-4 w-4 text-primary dark:hidden" />
              <Sparkles className="h-4 w-4 text-accent hidden dark:block" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black uppercase tracking-tighter text-[#151515] dark:text-white dark:font-headline dark:italic dark:lowercase dark:text-2xl">
              N-VITALITY
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-accent">
              Cirugía Plástica
            </span>
          </div>
        </Link>

        {/* Menu */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333333] dark:text-white/60 hover:text-accent transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center space-x-2 text-[#333333]/40 dark:text-white/30">
            <Phone className="h-3 w-3" />
            <span className="text-[9px] font-bold tracking-widest uppercase">098 424 6986</span>
          </div>
          <ThemeToggle />
          <Button asChild className="rounded-none bg-accent text-white px-8 h-12 font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-primary shadow-lg transition-all">
            <Link href="#contact">Agendar Cita</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex lg:hidden items-center space-x-4">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-background pt-20">
              <nav className="flex flex-col space-y-6">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.href} className="text-3xl font-black uppercase tracking-tighter hover:text-accent transition-all">
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
