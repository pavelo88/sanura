
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    treatment: "",
  });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const WHATSAPP_URL = "https://wa.me/593984246986";
    const message = encodeURIComponent(`Hello! My name is ${formData.name}. I'm interested in the ${formData.treatment} treatment. I'd like to book a consultation.`);
    window.open(`${WHATSAPP_URL}?text=${message}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold mb-6 text-primary">
              Ready to begin your transformation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book your private consultation today. Our specialists are ready to guide you through every step of your aesthetic journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">WhatsApp Support</h4>
                  <p className="text-sm text-muted-foreground">Direct access to our booking team</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-none shadow-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Get Started</CardTitle>
              <CardDescription>Fill in your details to start a WhatsApp conversation with our specialists.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleWhatsApp} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    required 
                    className="py-6 text-lg"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="treatment">Interested Treatment</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, treatment: value})}
                    required
                  >
                    <SelectTrigger className="py-6 text-lg">
                      <SelectValue placeholder="Select a treatment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rhinoplasty">Rhinoplasty</SelectItem>
                      <SelectItem value="Liposuction">Liposuction</SelectItem>
                      <SelectItem value="Botox & Fillers">Botox & Fillers</SelectItem>
                      <SelectItem value="Blepharoplasty">Blepharoplasty</SelectItem>
                      <SelectItem value="Skin Rejuvenation">Skin Rejuvenation</SelectItem>
                      <SelectItem value="Other">Other / Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full py-8 text-xl rounded-full font-bold">
                  Start WhatsApp Chat
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
