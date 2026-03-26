
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShieldCheck, HeartPulse, MessageCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Treatments", href: "#treatments" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "AI Guide", href: "#ai-guide" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <HeartPulse className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">
            N-VITALITY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild className="rounded-full">
            <Link href="#contact">Book Now</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-4">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col pt-20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-headline font-semibold py-4 border-b"
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-8 flex flex-col space-y-4">
                <Button className="w-full rounded-full py-6 text-lg" asChild>
                  <Link href="#contact" onClick={() => setIsOpen(false)}>Book Consultation</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
