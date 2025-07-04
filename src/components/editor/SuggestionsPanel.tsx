import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ReadabilitySuggestion,
  ClichesSuggestion,
  ToneAndVoiceSuggestion,
  SuggestionType,
} from '@/types/editor';
import { FileText, MessageSquare, Repeat, Eye, Loader2, RefreshCw } from 'lucide-react';

interface SuggestionsPanelProps {
  complexSentences: ReadabilitySuggestion;
  toneCorrections: ToneAndVoiceSuggestion | null;
  clicheCrutches: ClichesSuggestion;
  onApplySuggestion: (suggestion: SuggestionType) => void;
  appliedSuggestions: Set<string>;
  onReanalyzeCliches: () => void;
  isClichesLoading: boolean;
}

export function SuggestionsPanel({ 
  complexSentences, 
  toneCorrections, 
  clicheCrutches, 
  onApplySuggestion,
  appliedSuggestions,
  onReanalyzeCliches,
  isClichesLoading
}: SuggestionsPanelProps) {
  const [activeTab, setActiveTab] = useState('complex');

  const getLevelColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
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
              Tono y Voz
            </TabsTrigger>
            <TabsTrigger value="cliche" className="text-xs">
              <Repeat className="w-4 h-4 mr-1" />
              Clichés
            </TabsTrigger>
          </TabsList>

          <div className="px-4 pb-4 max-h-[calc(100vh-20rem)] overflow-y-auto">
            {/* Complex Sentences Tab */}
            <TabsContent value="complex" className="mt-0 space-y-3">
              {complexSentences.map((sentence, index) => {
                const suggestionId = createSuggestionId('complex', index);
                const isApplied = appliedSuggestions.has(suggestionId);
                
                return (
                  <div key={index} className="border rounded-lg p-3 space-y-2 text-sm">
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
                          suggestion: sentence.sugerencia || '',
                          reason: sentence.motivo,
                          applied: isApplied
                        })}
                        disabled={isApplied || !sentence.sugerencia}
                      >
                        {isApplied ? 'Aplicado' : 'Aplicar'}
                      </Button>
                    </div>
                    <p className="text-gray-600">{sentence.motivo}</p>
                    <div className="space-y-1">
                      <p className="font-medium">Original:</p>
                      <p className="bg-red-50 p-2 rounded">{sentence.oración}</p>
                    </div>
                    {sentence.sugerencia && (
                      <div className="space-y-1">
                        <p className="font-medium">Sugerencia:</p>
                        <p className="bg-green-50 p-2 rounded">{sentence.sugerencia}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>

            {/* Tone Corrections Tab */}
            <TabsContent value="tone" className="mt-0 space-y-3 text-sm">
              {toneCorrections && (
                <>
                  <div className="border rounded-lg p-3 bg-gray-50">
                    <h4 className="font-medium mb-1">Tono General Detectado</h4>
                    <Badge variant="secondary">{toneCorrections.tono_general}</Badge>
                  </div>

                  {toneCorrections.discordancias.map((item, index) => (
                     <div key={`tone-${index}`} className="border rounded-lg p-3 space-y-2">
                       <Badge variant="outline">Discordancia de Tono</Badge>
                       <p className="text-gray-600 italic">&quot;{item.motivo}&quot;</p>
                       <p className="font-medium">Expresión:</p>
                       <p className="bg-red-50 p-2 rounded">{item.expresion}</p>
                       <p className="font-medium">Sugerencia:</p>
                       <p className="bg-green-50 p-2 rounded">{item.sugerencia}</p>
                     </div>
                  ))}

                  {toneCorrections.pasivas_convertidas.map((item, index) => (
                    <div key={`voice-${index}`} className="border rounded-lg p-3 space-y-2">
                      <Badge variant="outline">Voz Pasiva → Activa</Badge>
                      <p className="font-medium">Original:</p>
                      <p className="bg-red-50 p-2 rounded">{item.original}</p>
                       <p className="font-medium">Sugerencia (Voz Activa):</p>
                      <p className="bg-green-50 p-2 rounded">{item.activa}</p>
                    </div>
                  ))}
                </>
              )}
            </TabsContent>

            {/* Cliche & Crutches Tab */}
            <TabsContent value="cliche" className="mt-0 space-y-3 text-sm">
              <div className="flex justify-end mb-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={onReanalyzeCliches}
                  disabled={isClichesLoading}
                >
                  {isClichesLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Volver a analizar
                </Button>
              </div>

              {clicheCrutches.map((cliche, index) => {
                const suggestionId = createSuggestionId('cliche', index);
                const isApplied = appliedSuggestions.has(suggestionId);
                
                return (
                  <div key={index} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">Cliché / Muletilla</Badge>
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
                      <p className="font-medium">Original:</p>
                      <p className="bg-red-50 p-2 rounded">{cliche.original}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Sugerencia:</p>
                      <p className="bg-green-50 p-2 rounded">{cliche.sugerencia}</p>
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