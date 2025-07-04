import { z } from "zod";

export const ReadabilitySchema = z.object({
  suggestions: z.array(z.object({ 
    oración: z.string(), 
    nivel: z.string(), 
    motivo: z.string(), 
    sugerencia: z.string().optional() 
  }))
});

export const ToneAndVoiceSchema = z.object({ 
    tono_general: z.string(), 
    discordancias: z.array(z.object({ 
        expresion: z.string(), 
        motivo: z.string(), 
        sugerencia: z.string() 
    })), 
    pasivas_convertidas: z.array(z.object({ 
        original: z.string(), 
        activa: z.string() 
    })) 
});

export const ClichesSchema = z.object({
  suggestions: z.array(z.object({ 
    original: z.string(), 
    sugerencia: z.string() 
  }))
}); 