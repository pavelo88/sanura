
"use client";

import { useState } from "react";
import { Sparkles, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { suggestAestheticTreatments, AITreatmentSuggesterOutput } from "@/ai/flows/ai-treatment-suggester";
import { useToast } from "@/hooks/use-toast";

export function AIGuide() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AITreatmentSuggesterOutput | null>(null);
  const { toast } = useToast();

  const handleSuggest = async () => {
    if (!input.trim()) {
      toast({
        variant: "destructive",
        title: "Input required",
        description: "Please describe your concerns so we can help."
      });
      return;
    }

    setIsLoading(true);
    try {
      const output = await suggestAestheticTreatments({ userDescription: input });
      setResult(output);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate suggestions. Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-guide" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-center">
              Personalized Treatment Guide
            </h2>
          </div>
          
          <Card className="border-2 border-primary/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Tell us about your goals</CardTitle>
              <CardDescription>
                Describe what areas you'd like to improve or your aesthetic vision, and our AI will suggest the most suitable treatments.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                placeholder="Example: I'm interested in rejuvenating my face, specifically looking to reduce fine lines and address some sagging around my jawline..."
                className="min-h-[150px] text-lg p-4 bg-background"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button 
                onClick={handleSuggest} 
                disabled={isLoading}
                className="w-full rounded-full py-8 text-lg font-bold group"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                  <Send className="mr-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                )}
                Get AI Suggestions
              </Button>

              {result && (
                <div className="mt-12 animate-in fade-in zoom-in duration-500 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.suggestedTreatments.map((treatment, idx) => (
                      <div key={idx} className="p-6 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all">
                        <h3 className="font-headline font-bold text-lg text-primary mb-2">
                          {treatment.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {treatment.description}
                        </p>
                        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Why this?</div>
                        <p className="text-xs italic leading-relaxed">
                          {treatment.reasoning}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  {result.generalAdvice && (
                    <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 text-sm italic">
                      {result.generalAdvice}
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    <Button asChild variant="outline" className="rounded-full">
                      <a href="#contact">Discuss results on WhatsApp</a>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
