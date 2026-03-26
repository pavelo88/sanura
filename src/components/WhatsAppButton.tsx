
"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppButton() {
  const WHATSAPP_URL = "https://wa.me/593984246986";
  const message = encodeURIComponent("Hello N-VITALITY, I would like to book a consultation for an aesthetic treatment.");

  return (
    <a
      href={`${WHATSAPP_URL}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[60]"
    >
      <Button
        size="icon"
        className="h-16 w-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-2xl animate-whatsapp"
      >
        <MessageCircle className="h-8 w-8" />
        <span className="sr-only">Contact on WhatsApp</span>
      </Button>
    </a>
  );
}
