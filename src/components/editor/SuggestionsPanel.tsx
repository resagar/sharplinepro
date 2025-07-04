import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComplexSentence, ClicheCrutch, ToneCorrection, SuggestionType } from '@/types/editor';
import { FileText, MessageSquare, Repeat, Eye } from 'lucide-react';

interface SuggestionsPanelProps {
  complexSentences: ComplexSentence[];
  toneCorrections: ToneCorrection;
  clicheCrutches: ClicheCrutch[];
  onApplySuggestion: (suggestion: SuggestionType) => void;
  appliedSuggestions: Set<string>;
}

export function SuggestionsPanel({ 
  complexSentences, 
  toneCorrections, 
  clicheCrutches, 
  onApplySuggestion,
  appliedSuggestions 
}: SuggestionsPanelProps) {
  const [activeTab, setActiveTab] = useState('complex');

  const getLevelColor = (nivel: string) => {
    switch (nivel) {
      case 'fácil': return 'bg-green-100 text-green-800';
      case 'difícil': return 'bg-yellow-100 text-yellow-800';
      case 'muy difícil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const createSuggestionId = (type: string, index: number) => `${type}-${index}`;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Sugerencias
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
            <TabsTrigger value="complex" className="text-xs">
              <FileText className="w-4 h-4 mr-1" />
              Oraciones
            </TabsTrigger>
            <TabsTrigger value="tone" className="text-xs">
              <MessageSquare className="w-4 h-4 mr-1" />
              Tono
            </TabsTrigger>
            <TabsTrigger value="cliche" className="text-xs">
              <Repeat className="w-4 h-4 mr-1" />
              Clichés
            </TabsTrigger>
          </TabsList>

          <div className="px-4 pb-4 max-h-96 overflow-y-auto">
            {/* Complex Sentences Tab */}
            <TabsContent value="complex" className="mt-0 space-y-3">
              {complexSentences.map((sentence, index) => {
                const suggestionId = createSuggestionId('complex', index);
                const isApplied = appliedSuggestions.has(suggestionId);
                
                return (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={getLevelColor(sentence.nivel)}>
                        {sentence.nivel}
                      </Badge>
                      <Button
                        size="sm"
                        variant={isApplied ? "secondary" : "default"}
                        onClick={() => onApplySuggestion({
                          id: suggestionId,
                          type: 'complex',
                          original: sentence.oración,
                          suggestion: sentence.sugerencia,
                          reason: sentence.motivo,
                          applied: isApplied
                        })}
                        disabled={isApplied || !sentence.sugerencia}
                      >
                        {isApplied ? 'Aplicado' : 'Aplicar'}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">{sentence.motivo}</p>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Original:</p>
                      <p className="text-sm bg-red-50 p-2 rounded">{sentence.oración}</p>
                    </div>
                    {sentence.sugerencia && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Sugerencia:</p>
                        <p className="text-sm bg-green-50 p-2 rounded">{sentence.sugerencia}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>

            {/* Tone Corrections Tab */}
            <TabsContent value="tone" className="mt-0 space-y-3">
              <div className="border rounded-lg p-3">
                <h4 className="font-medium mb-2">Análisis de Tono</h4>
                <p className="text-sm">
                  <span className="font-medium">Tono general:</span> {toneCorrections.tono_general}
                </p>
                {toneCorrections.discordancias.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Discordancias:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {toneCorrections.discordancias.map((discordancia, index) => (
                        <li key={index}>{discordancia}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {toneCorrections.pasivas_convertidas.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Voz pasiva convertida:</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {toneCorrections.pasivas_convertidas.map((pasiva, index) => (
                        <li key={index}>{pasiva}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Cliche & Crutches Tab */}
            <TabsContent value="cliche" className="mt-0 space-y-3">
              {clicheCrutches.map((cliche, index) => {
                const suggestionId = createSuggestionId('cliche', index);
                const isApplied = appliedSuggestions.has(suggestionId);
                
                return (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Cliché</Badge>
                      <Button
                        size="sm"
                        variant={isApplied ? "secondary" : "default"}
                        onClick={() => onApplySuggestion({
                          id: suggestionId,
                          type: 'cliche',
                          original: cliche.original,
                          suggestion: cliche.sugerencia,
                          reason: 'Cliché o muletilla detectada',
                          applied: isApplied
                        })}
                        disabled={isApplied}
                      >
                        {isApplied ? 'Aplicado' : 'Aplicar'}
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Original:</p>
                      <p className="text-sm bg-red-50 p-2 rounded">{cliche.original}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Sugerencia:</p>
                      <p className="text-sm bg-green-50 p-2 rounded">{cliche.sugerencia}</p>
                    </div>
                  </div>
                );
              })}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
} 