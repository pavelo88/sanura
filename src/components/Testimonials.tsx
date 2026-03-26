
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const reviews = [
  {
    name: "Elena Rodriguez",
    role: "Rhinoplasty Patient",
    content: "The care and attention to detail at N-VITALITY is unmatched. My results are natural and exactly what I dreamed of. I feel so much more confident!",
    rating: 5,
    img: PlaceHolderImages.find(p => p.id === "testimonial-1")?.imageUrl
  },
  {
    name: "Marco Silva",
    role: "Skincare Client",
    content: "Highly professional team. The HydraFacial treatments have completely transformed my skin texture. The atmosphere is serene and luxurious.",
    rating: 5,
    img: PlaceHolderImages.find(p => p.id === "testimonial-2")?.imageUrl
  },
  {
    name: "Sophie Bennett",
    role: "Botox Treatment",
    content: "Quick, painless, and the results are fantastic. Dr. Sofia is a true artist who understands subtle enhancement. Highly recommend!",
    rating: 5,
    img: PlaceHolderImages.find(p => p.id === "testimonial-3")?.imageUrl
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center mb-16 text-primary">
          Patient Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <Card key={idx} className="bg-card/50 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src={review.img || "https://picsum.photos/seed/avatar/200/200"}
                    alt={review.name}
                    fill
                    className="object-cover"
                    data-ai-hint="portrait photo"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">{review.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{review.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic line-clamp-4">
                  "{review.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
