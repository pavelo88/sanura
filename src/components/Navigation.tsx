"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, HeartPulse, ShieldCheck, Sparkles, ChevronDown, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Procedimientos", href: "#treatments", hasDropdown: true },
  { name: "Nuestros Doctores", href: "#doctors" },
  { name: "Blog", href: "#blog" },
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
    <header className={`fixed top-0 z-50 w-full transition-all duration-1000 ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-3xl border-b h-20' : 'bg-white dark:bg-transparent h-28'}`}>
      <div className="container mx-auto flex h-full items-center justify-between px-6">
        
        {/* Logo & Subtitle */}
        <Link href="/" className="flex items-center space-x-5 group">
          <div className="relative">
            <HeartPulse className="h-10 w-10 text-[#49A9B4] group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1">
              <ShieldCheck className="h-4 w-4 text-primary dark:hidden" />
              <Sparkles className="h-4 w-4 text-accent hidden dark:block animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-black uppercase tracking-tighter text-[#151515] dark:text-white dark:font-headline dark:italic dark:lowercase dark:text-4xl">
              N-VITALITY
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#49A9B4] leading-tight">
              Cirugía Plástica y Reconstructiva
            </span>
          </div>
        </Link>

        {/* Desktop Nav: Professional & Minimal */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#333333] dark:text-white/60 hover:text-accent dark:hover:text-accent transition-all"
            >
              {item.name}
              {item.hasDropdown && <ChevronDown className="ml-1 h-3 w-3 inline opacity-50" />}
            </Link>
          ))}
          <div className="flex items-center space-x-8 pl-8 border-l border-primary/10">
            <ThemeToggle />
            <div className="hidden xl:flex flex-col items-end mr-4">
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">VIP Line</span>
              <span className="text-sm font-black text-primary dark:text-accent">098 424 6986</span>
            </div>
            <Button asChild className="rounded-none bg-[#49A9B4] text-white px-10 h-14 font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-primary transition-all shadow-xl">
              <Link href="#contact">Agendar Cita</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex lg:hidden items-center space-x-5">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-transparent">
                <Menu className="h-10 w-10" strokeWidth={1} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col pt-32 bg-background border-l-0 w-full sm:max-w-md">
              <nav className="flex flex-col space-y-8 px-10">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black uppercase tracking-tighter dark:font-headline dark:italic hover:text-accent transition-all border-b border-primary/5 pb-4"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto px-10 pb-20 space-y-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Consultas VIP</span>
                  <span className="text-3xl font-black text-primary dark:text-accent block">098 424 6986</span>
                </div>
                <Button className="w-full rounded-none h-24 text-sm font-bold uppercase tracking-[0.5em] bg-accent text-white" asChild>
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
