
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    treatment: "",
  });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const WHATSAPP_URL = "https://wa.me/593984246986";
    const message = encodeURIComponent(`Hola N-VITALITY! Soy ${formData.name}. Estoy interesado en el servicio de ${formData.treatment}. Me gustaría agendar una valoración VIP.`);
    window.open(`${WHATSAPP_URL}?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 p-24 opacity-10">
        <Sparkles className="h-64 w-64 rotate-12" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-headline font-bold mb-8 text-accent">
              Inicia tu Camino <br />a la Excelencia
            </h2>
            <p className="text-2xl opacity-90 mb-12 font-light leading-relaxed">
              Nuestra agenda para valoraciones presenciales y virtuales es limitada. Reserva tu espacio exclusivo ahora.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <ShieldCheck className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-white">Seguridad Médica Garantizada</h4>
                  <p className="opacity-70">Protocolos internacionales en cada intervención.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <MessageCircle className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1 text-white">Atención Personalizada</h4>
                  <p className="opacity-70">Un asesor VIP te guiará durante todo el proceso.</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-3xl bg-white text-foreground rounded-3xl overflow-hidden">
            <CardHeader className="bg-muted p-10">
              <CardTitle className="font-headline text-4xl text-primary">Pre-Agendamiento</CardTitle>
              <CardDescription className="text-lg">Completa tus datos básicos para conectar con el equipo médico.</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleWhatsApp} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-lg font-bold">Tu Nombre Completo</Label>
                  <Input 
                    id="name" 
                    placeholder="Ej. Maria Garcia" 
                    required 
                    className="h-16 text-xl rounded-xl bg-muted border-none focus-visible:ring-primary"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="treatment" className="text-lg font-bold">Servicio de Interés</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, treatment: value})}
                    required
                  >
                    <SelectTrigger className="h-16 text-xl rounded-xl bg-muted border-none">
                      <SelectValue placeholder="Selecciona un tratamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Cirugía Facial</SelectLabel>
                        <SelectItem value="Rinoplastia">Rinoplastia</SelectItem>
                        <SelectItem value="Blefaroplastia">Blefaroplastia</SelectItem>
                        <SelectItem value="Facelift">Facelift Completo</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Cirugía Corporal</SelectLabel>
                        <SelectItem value="Liposucción HD">Liposucción HD 360</SelectItem>
                        <SelectItem value="Abdominoplastia">Abdominoplastia</SelectItem>
                        <SelectItem value="Aumento de Pecho">Aumento de Pecho</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Estética Avanzada</SelectLabel>
                        <SelectItem value="Botox/Rellenos">Botox y Rellenos</SelectItem>
                        <SelectItem value="HydraFacial">HydraFacial Elite</SelectItem>
                        <SelectItem value="Otro">Otros Tratamientos</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full h-20 text-2xl rounded-2xl font-bold bg-primary hover:bg-primary/90 transition-all group">
                  Contactar Asesor VIP
                  <MessageCircle className="ml-3 h-7 w-7 group-hover:scale-110 transition-transform" />
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Al enviar, aceptas ser contactado por nuestro equipo de atención al paciente.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
