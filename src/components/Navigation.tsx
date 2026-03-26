"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, HeartPulse, ShieldCheck, Sparkles, ChevronDown } from "lucide-react";
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
    <header className={`fixed top-0 z-50 w-full transition-all duration-700 ${scrolled ? 'bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b' : 'bg-white dark:bg-transparent'}`}>
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        
        {/* Logo & Subtitle */}
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative">
            <HeartPulse className="h-8 w-8 text-[#49A9B4]" />
            <div className="absolute -top-1 -right-1">
              <ShieldCheck className="h-4 w-4 text-[#003B49] dark:hidden" />
              <Sparkles className="h-4 w-4 text-accent hidden dark:block animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black uppercase tracking-tighter text-[#333333] dark:text-white dark:font-headline dark:italic dark:lowercase dark:text-3xl">
              N-VITALITY
            </span>
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#49A9B4] leading-tight">
              Cirugía Plástica y Reconstructiva
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="insurance-nav-link flex items-center dark:text-white/70 dark:hover:text-primary dark:tracking-[0.4em]"
            >
              {item.name}
              {item.hasDropdown && <ChevronDown className="ml-1 h-3 w-3" />}
            </Link>
          ))}
          <div className="flex items-center space-x-6 pl-6 border-l">
            <ThemeToggle />
            <div className="flex flex-col items-end mr-2 hidden xl:flex">
              <span className="text-[10px] font-bold text-[#333333] dark:text-white/40">VIP Line</span>
              <span className="text-xs font-black text-[#003B49] dark:text-accent">098 424 6986</span>
            </div>
            <Button asChild className="rounded-none bg-[#49A9B4] text-white px-8 font-bold text-[11px] uppercase tracking-widest h-12 hover:bg-[#3a8992] shadow-xl transition-all border-none">
              <Link href="#contact">Agendar Cita</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex lg:hidden items-center space-x-4">
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
              <div className="mt-auto pb-10 space-y-4">
                <div className="text-center">
                  <span className="text-xs font-bold text-muted-foreground block">Call us: 098 424 6986</span>
                </div>
                <Button className="w-full rounded-none py-8 text-xs font-bold uppercase tracking-widest bg-accent text-white" asChild>
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