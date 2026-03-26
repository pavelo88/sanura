"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const WHATSAPP_URL = "https://wa.me/593984246986";
  const message = encodeURIComponent("Hola N-VITALITY, deseo agendar una consulta exclusiva.");

  return (
    <a
      href={`${WHATSAPP_URL}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60]"
    >
      <Button
        size="icon"
        className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl animate-custom-whatsapp border-2 border-white/20"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="sr-only">Contact on WhatsApp</span>
      </Button>
    </a>
  );
}