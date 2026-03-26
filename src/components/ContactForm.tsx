"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, ShieldCheck, Sparkles, Phone } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    treatment: "",
  });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const WHATSAPP_URL = "https://wa.me/593984246986";
    const message = encodeURIComponent(`Hola N-VITALITY! Soy ${formData.name}. Estoy interesado en ${formData.treatment}. Me gustaría una cita VIP.`);
    window.open(`${WHATSAPP_URL}?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="py-32 bg-primary dark:bg-card text-white relative overflow-hidden transition-colors duration-[1200ms]">
      <div className="absolute top-0 right-0 p-20 opacity-5">
        <div className="dark:hidden"><ShieldCheck className="h-96 w-96 rotate-12" /></div>
        <div className="hidden dark:block"><Sparkles className="h-96 w-96 -rotate-12" /></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10">
            <div className="dark:hidden space-y-6">
              <h2 className="text-6xl font-black uppercase leading-[0.9]">
                Póliza de <br /><span className="text-accent">Transformación</span>
              </h2>
              <p className="text-2xl font-light opacity-80 leading-relaxed max-w-lg">
                Inicia el trámite de tu nueva imagen con el respaldo legal y médico más sólido de la región.
              </p>
            </div>
            
            <div className="hidden dark:block space-y-6">
              <h2 className="text-8xl font-headline font-bold italic lowercase leading-[0.8] text-accent">
                Private <br /><span className="text-white">Admission</span>
              </h2>
              <p className="text-2xl font-light italic opacity-60 leading-relaxed max-w-lg">
                Nuestra agenda es tan exclusiva como nuestros resultados. Solicita tu espacio en el atelier médico.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="flex items-center space-x-4">
                <ShieldCheck className="h-10 w-10 text-accent opacity-50" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">100% Secure Data</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="h-10 w-10 text-accent opacity-50" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">24/7 VIP Support</span>
              </div>
            </div>
          </div>

          <Card className="rounded-none border-none shadow-2xl bg-white text-foreground">
            <CardHeader className="bg-secondary/50 p-10 space-y-4">
              <CardTitle className="text-4xl font-black uppercase dark:font-headline dark:italic dark:lowercase dark:text-5xl">Pre-Agendamiento</CardTitle>
              <CardDescription className="text-lg font-light dark:italic">Introduce tus credenciales para la valoración médica.</CardDescription>
            </CardHeader>
            <CardContent className="p-10">
              <form onSubmit={handleWhatsApp} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em]">Nombre Completo</Label>
                  <Input 
                    id="name" 
                    placeholder="Escriba su nombre..." 
                    required 
                    className="h-14 rounded-none border-t-0 border-x-0 border-b-2 border-muted focus-visible:ring-0 focus-visible:border-primary transition-all text-lg"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="treatment" className="text-[10px] font-bold uppercase tracking-[0.2em]">Servicio de Interés</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, treatment: value})}
                    required
                  >
                    <SelectTrigger className="h-14 rounded-none border-t-0 border-x-0 border-b-2 border-muted focus-visible:ring-0">
                      <SelectValue placeholder="Seleccione su tratamiento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Cirugía Facial</SelectLabel>
                        <SelectItem value="Rinoplastia">Rinoplastia Ultrasónica</SelectItem>
                        <SelectItem value="Facelift">Facelift Deep Plane</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Cirugía Corporal</SelectLabel>
                        <SelectItem value="Liposucción">Liposucción HD 360</SelectItem>
                        <SelectItem value="Abdominoplastia">Abdominoplastia</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Estética Avanzada</SelectLabel>
                        <SelectItem value="Botox">Botox Premium</SelectItem>
                        <SelectItem value="HydraFacial">HydraFacial Elite</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full h-20 rounded-none bg-primary text-white text-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all group">
                  Iniciar Proceso VIP
                  <MessageCircle className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                <p className="text-center text-[9px] uppercase tracking-widest text-muted-foreground pt-4">
                  Su solicitud será procesada bajo protocolos de confidencialidad estricta.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
