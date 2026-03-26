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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <HeartPulse className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">
            N-VITALITY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          {mounted && <ThemeToggle />}
          <Button asChild className="rounded-none px-8 font-bold uppercase tracking-widest text-xs h-12">
            <Link href="#contact">Consulta VIP</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          {mounted && <ThemeToggle />}
          {mounted && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col pt-20 border-l border-primary/20">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl font-headline font-bold py-6 border-b border-primary/10 uppercase tracking-tighter"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-auto pb-10">
                  <Button className="w-full rounded-none py-8 text-sm uppercase font-bold tracking-widest" asChild>
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