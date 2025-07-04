'use client';

import { useState, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextEditor } from '@/components/ui/text-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SuggestionsPanel } from '@/components/editor/SuggestionsPanel';
import { StatsPanel } from '@/components/editor/StatsPanel';
import { 
  EditorState, 
  ApiResponse, 
  SuggestionType,
  ComplexSentence,
  ClicheCrutch,
  ToneCorrection 
} from '@/types/editor';
import { 
  calculateStats, 
  applySuggestionToContent, 
  validateContentForCorrection 
} from '@/lib/editor-utils';
import { Loader2, Save, Wand2, FileText, Eye, EyeOff } from 'lucide-react';

const schema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  content: z.string().min(50, 'El contenido debe tener al menos 50 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function EditorPage() {
  // Form state
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  // Editor states
  const [editorState, setEditorState] = useState<EditorState>('WRITING');
  const [originalContent, setOriginalContent] = useState('');
  const [correctedContent, setCorrectedContent] = useState('');
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());
  const [showOriginal, setShowOriginal] = useState(true);
  const [correctionError, setCorrectionError] = useState<string | null>(null);

  // Watch form values
  const watchedTitle = watch('title');
  const watchedContent = watch('content');

  // Calculate stats
  const originalStats = useMemo(() => 
    calculateStats(originalContent || watchedContent), 
    [originalContent, watchedContent]
  );
  
  const correctedStats = useMemo(() => 
    correctedContent ? calculateStats(correctedContent) : undefined, 
    [correctedContent]
  );

  // Validation
  const contentValidation = useMemo(() => 
    validateContentForCorrection(watchedTitle, watchedContent),
    [watchedTitle, watchedContent]
  );

  // Handle correction process
  const handleCorrection = useCallback(async (data: FormData) => {
    setEditorState('CORRECTING');
    setCorrectionError(null);
    setOriginalContent(data.content);

    try {
      // TODO: Uncomment when API credentials are ready
      // const credentials = { username: 'your-username', password: 'your-password' };
      // const response = await callCorrectionAPI(data.title, data.content, credentials);
      
      // Mock response for development
      const mockResponse: ApiResponse = {
        new_article: data.content.replace(/\b(muy|bastante|realmente)\b/gi, '').replace(/\s+/g, ' '),
        corrections: {
          normalizedData: {
            complex_sentences: [
              {
                oración: "Esta es una oración de ejemplo que podría ser simplificada.",
                nivel: "difícil",
                motivo: "Oración compleja con múltiples cláusulas",
                sugerencia: "Esta oración de ejemplo se puede simplificar."
              }
            ],
            correction_tono_voice: {
              tono_general: "neutral",
              discordancias: [],
              pasivas_convertidas: []
            },
            cliche_crutche: [
              {
                original: "muy importante",
                sugerencia: "esencial"
              }
            ]
          }
        }
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setApiResponse(mockResponse);
      setCorrectedContent(mockResponse.new_article);
      setEditorState('CORRECTED');
      
    } catch (error) {
      console.error('Error during correction:', error);
      setCorrectionError(error instanceof Error ? error.message : 'Error desconocido');
      setEditorState('WRITING');
    }
  }, []);

  // Handle suggestion application
  const handleApplySuggestion = useCallback((suggestion: SuggestionType) => {
    if (suggestion.applied || appliedSuggestions.has(suggestion.id)) {
      return;
    }

    const newContent = applySuggestionToContent(
      correctedContent, 
      suggestion.original, 
      suggestion.suggestion
    );
    
    setCorrectedContent(newContent);
    setAppliedSuggestions(prev => new Set(prev).add(suggestion.id));
  }, [correctedContent, appliedSuggestions]);

  // Handle save functionality
  const handleSave = useCallback(() => {
    if (!correctedContent) return;
    
    // TODO: Implement save functionality
    console.log('Saving corrected article:', {
      title: watchedTitle,
      content: correctedContent,
      originalContent,
      appliedSuggestions: Array.from(appliedSuggestions)
    });
    
    // For now, just show an alert
    alert('Artículo guardado exitosamente!');
  }, [correctedContent, watchedTitle, originalContent, appliedSuggestions]);

  // Get suggestions data
  const complexSentences: ComplexSentence[] = apiResponse?.corrections.normalizedData.complex_sentences || [];
  const toneCorrections: ToneCorrection = apiResponse?.corrections.normalizedData.correction_tono_voice || {
    tono_general: '',
    discordancias: [],
    pasivas_convertidas: []
  };
  const clicheCrutches: ClicheCrutch[] = apiResponse?.corrections.normalizedData.cliche_crutche || [];

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Editor de Corrección de Artículos</h1>
        <p className="text-muted-foreground">
          Escribe tu artículo y obtén sugerencias inteligentes para mejorarlo
        </p>
      </div>

      {/* Main Layout - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Original Content (40%) */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {editorState === 'WRITING' ? 'Artículo Original' : 'Versión Original'}
                </CardTitle>
                {editorState === 'CORRECTED' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOriginal(!showOriginal)}
                  >
                    {showOriginal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleCorrection)} className="space-y-4">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Título del Artículo
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        disabled={editorState !== 'WRITING'}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="Escribe un título atractivo..."
                      />
                    )}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contenido del Artículo
                  </label>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                                             <TextEditor
                         value={field.value}
                         onChange={editorState === 'WRITING' ? field.onChange : () => {}}
                         placeholder="Comienza a escribir tu artículo aquí..."
                         className={editorState !== 'WRITING' ? 'opacity-75 pointer-events-none' : ''}
                       />
                    )}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                  )}
                </div>

                {/* Correction Button */}
                {editorState === 'WRITING' && (
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={!contentValidation.isValid}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Corregir y Mejorar Artículo
                  </Button>
                )}

                {/* Validation Errors */}
                {!contentValidation.isValid && contentValidation.errors.length > 0 && (
                  <Alert>
                    <AlertDescription>
                      <ul className="list-disc list-inside text-sm">
                        {contentValidation.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Corrected Content (40%) */}
        <div className="lg:col-span-2">
          {editorState === 'CORRECTING' && (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Procesando correcciones...</h3>
                <p className="text-sm text-muted-foreground">
                  Esto puede tomar unos momentos. Nuestros agentes están analizando tu artículo.
                </p>
              </CardContent>
            </Card>
          )}

          {editorState === 'CORRECTED' && (
            <Card className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Versión Corregida
                  </CardTitle>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Corrected Title */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Título Corregido
                    </label>
                    <input
                      type="text"
                      value={watchedTitle}
                      onChange={(e) => setValue('title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Corrected Content */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contenido Corregido
                    </label>
                    <TextEditor
                      value={correctedContent}
                      onChange={setCorrectedContent}
                      placeholder="Contenido corregido aparecerá aquí..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {correctionError && (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center">
                <Alert variant="destructive">
                  <AlertDescription>
                    <strong>Error al procesar correcciones:</strong> {correctionError}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Suggestions & Stats (20%) */}
        <div className="lg:col-span-1 space-y-4">
          {/* Stats Panel */}
          <StatsPanel
            originalStats={originalStats}
            correctedStats={correctedStats}
            showComparison={editorState === 'CORRECTED'}
          />

          {/* Suggestions Panel */}
          {editorState === 'CORRECTED' && apiResponse && (
            <SuggestionsPanel
              complexSentences={complexSentences}
              toneCorrections={toneCorrections}
              clicheCrutches={clicheCrutches}
              onApplySuggestion={handleApplySuggestion}
              appliedSuggestions={appliedSuggestions}
            />
          )}
        </div>
      </div>
    </div>
  );
} 