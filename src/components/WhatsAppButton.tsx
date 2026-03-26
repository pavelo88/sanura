"use client";

import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const WHATSAPP_URL = "https://wa.me/593984246986";
  const message = encodeURIComponent("Hola N-VITALITY, solicito una consulta exclusiva de alta gama.");

  return (
    <a
      href={`${WHATSAPP_URL}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[60]"
    >
      <div className="relative group">
        <Button
          size="icon"
          className="h-16 w-16 rounded-none bg-primary hover:bg-primary/90 text-white shadow-2xl animate-custom-whatsapp transition-all duration-500"
        >
          <MessageCircle className="h-8 w-8" />
        </Button>
        {/* Decoración según modo */}
        <div className="absolute -top-2 -right-2 p-1.5 bg-accent text-white shadow-lg">
          <div className="dark:hidden"><ShieldCheck className="h-4 w-4" /></div>
          <div className="hidden dark:block"><Sparkles className="h-4 w-4 animate-pulse" /></div>
        </div>
      </div>
    </a>
  );
}