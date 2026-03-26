
"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const treatments = [
  {
    category: "Facial",
    items: [
      {
        name: "Rhinoplasty",
        description: "Reshape and enhance the harmony of your facial features.",
        img: PlaceHolderImages.find(p => p.id === "treatment-rhinoplasty")?.imageUrl,
        badge: "Most Popular"
      },
      {
        name: "Blepharoplasty",
        description: "Rejuvenate tired-looking eyes with eyelid surgery.",
        img: PlaceHolderImages.find(p => p.id === "treatment-rhinoplasty")?.imageUrl
      }
    ]
  },
  {
    category: "Body",
    items: [
      {
        name: "Liposuction",
        description: "Remove stubborn fat deposits for a more sculpted silhouette.",
        img: PlaceHolderImages.find(p => p.id === "treatment-body")?.imageUrl,
        badge: "Advanced Tech"
      },
      {
        name: "Tummy Tuck",
        description: "Tighten abdominal muscles and remove excess skin.",
        img: PlaceHolderImages.find(p => p.id === "treatment-body")?.imageUrl
      }
    ]
  },
  {
    category: "Non-Surgical",
    items: [
      {
        name: "Botox & Fillers",
        description: "Quick, effective treatments for fine lines and volume loss.",
        img: PlaceHolderImages.find(p => p.id === "treatment-skincare")?.imageUrl,
        badge: "Lunchtime Op"
      },
      {
        name: "HydraFacial",
        description: "Deeply cleanse, extract, and hydrate the skin.",
        img: PlaceHolderImages.find(p => p.id === "treatment-skincare")?.imageUrl
      }
    ]
  }
];

export function TreatmentCatalog() {
  return (
    <section id="treatments" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-primary">
            Our Treatment Portfolio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of surgical and non-surgical treatments designed to enhance your natural beauty.
          </p>
        </div>

        <Tabs defaultValue="Facial" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
            <TabsTrigger value="Facial">Facial</TabsTrigger>
            <TabsTrigger value="Body">Body</TabsTrigger>
            <TabsTrigger value="Non-Surgical">Non-Surgical</TabsTrigger>
          </TabsList>
          {treatments.map((category) => (
            <TabsContent key={category.category} value={category.category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item, idx) => (
                  <Card key={idx} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={item.img || "https://picsum.photos/seed/placeholder/600/400"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint="treatment procedure"
                      />
                      {item.badge && (
                        <Badge className="absolute top-4 right-4 bg-primary text-white">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl">{item.name}</CardTitle>
                      <CardDescription className="text-base">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
