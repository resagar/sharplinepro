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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  EditorState, 
  SuggestionType,
  ReadabilitySuggestion,
  ToneAndVoiceSuggestion,
  ClichesSuggestion,
  GrammarCorrection
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
  const [readability, setReadability] = useState<ReadabilitySuggestion | null>(null);
  const [toneAndVoice, setToneAndVoice] = useState<ToneAndVoiceSuggestion | null>(null);
  const [cliches, setCliches] = useState<ClichesSuggestion | null>(null);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());
  const [showOriginal, setShowOriginal] = useState(true);
  const [correctionError, setCorrectionError] = useState<string | null>(null);
  const [isClichesLoading, setIsClichesLoading] = useState(false);
  const [editorKey, setEditorKey] = useState(0);

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
    
    // Reset previous suggestions
    setReadability(null);
    setToneAndVoice(null);
    setCliches(null);
    setAppliedSuggestions(new Set());

    try {
      // Step 1: Correct grammar
      const plainTextContent = data.content.replace(/<[^>]*>/g, '\n');
      
      const grammarResponse = await fetch('/api/ai/correct-grammar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: plainTextContent }),
      });

      if (!grammarResponse.ok) {
        throw new Error(`Grammar correction failed: ${grammarResponse.statusText}`);
      }

      const { correctedText } = await grammarResponse.json() as GrammarCorrection;
      const correctedHtml = `<p>${correctedText.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`;
      setCorrectedContent(correctedHtml);

      // Step 2: Run other analyses in parallel with the corrected text
      const [readabilityRes, toneAndVoiceRes, clichesRes] = await Promise.all([
        fetch('/api/ai/analyze-readability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: correctedText }),
        }),
        fetch('/api/ai/analyze-tone-voice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: correctedText }),
        }),
        fetch('/api/ai/find-cliches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: correctedText }),
        }),
      ]);

      if (!readabilityRes.ok || !toneAndVoiceRes.ok || !clichesRes.ok) {
        // A more granular error handling could be implemented here
        throw new Error('One or more analyses failed.');
      }

      const readabilityData = await readabilityRes.json();
      const toneAndVoiceData = await toneAndVoiceRes.json();
      const clichesData = await clichesRes.json();

      setReadability(readabilityData);
      setToneAndVoice(toneAndVoiceData);
      setCliches(clichesData);
      
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
    setEditorKey(prevKey => prevKey + 1);
  }, [correctedContent, appliedSuggestions]);

  const handleReanalyzeCliches = async () => {
    if (!correctedContent) return;

    setIsClichesLoading(true);
    try {
      const response = await fetch('/api/ai/find-cliches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: correctedContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to re-analyze cliches');
      }

      const clichesData = await response.json();
      setCliches(clichesData);
      
      // Clear old cliche suggestions from the applied set
      setAppliedSuggestions(prev => 
        new Set(Array.from(prev).filter(id => !id.startsWith('cliche-')))
      );

    } catch (error) {
      console.error('Error re-analyzing cliches:', error);
      // Optionally, set an error state to show in the UI
    } finally {
      setIsClichesLoading(false);
    }
  };

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
  const complexSentences: ReadabilitySuggestion = readability || [];
  const toneCorrections: ToneAndVoiceSuggestion | null = toneAndVoice;
  const clicheCrutches: ClichesSuggestion = cliches || [];

  return (
    <div className="container mx-auto p-4 max-w-full h-screen flex flex-col">
      <div className="mb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold">Editor de Corrección de Artículos</h1>
        <p className="text-muted-foreground text-sm">
          Escribe tu artículo y obtén sugerencias inteligentes para mejorarlo.
        </p>
      </div>

      {/* Main Layout - Content + Sidebar */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
          {/* Left Column - Original Content */}
          <Card className="flex flex-col h-full">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {editorState === 'WRITING' ? 'Artículo Original' : 'Versión Original'}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto">
              <form onSubmit={handleSubmit(handleCorrection)} className="flex-1 flex flex-col gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="title">Título del Artículo</Label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="title"
                        type="text"
                        disabled={editorState !== 'WRITING'}
                        placeholder="Escribe un título atractivo..."
                      />
                    )}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                  )}
                </div>

                <div className="flex-1 flex flex-col gap-1.5">
                  <Label>Contenido del Artículo</Label>
                  <Controller
                    name="content"
                    control={control}
                    render={({ field }) => (
                      <TextEditor
                        value={field.value}
                        onChange={editorState === 'WRITING' ? field.onChange : () => {}}
                        placeholder="Comienza a escribir tu artículo aquí..."
                        className={`flex-1 ${editorState !== 'WRITING' ? 'opacity-75 pointer-events-none' : ''}`}
                      />
                    )}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
                  )}
                </div>

                {editorState === 'WRITING' && (
                  <div className="mt-auto flex-shrink-0 pt-4">
                    {!contentValidation.isValid && contentValidation.errors.length > 0 && (
                      <Alert variant="default" className="mb-4">
                        <AlertDescription>
                          <ul className="list-disc list-inside text-sm">
                            {contentValidation.errors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={!contentValidation.isValid}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Corregir y Mejorar Artículo
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Right Column - Corrected Content */}
          <Card className="flex flex-col h-full">
            <CardHeader className="pb-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Versión Corregida
                </CardTitle>
                {editorState === 'CORRECTED' && (
                  <Button variant="default" size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4 overflow-y-auto">
              {editorState === 'CORRECTING' && (
                <div className="m-auto text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Procesando...</h3>
                  <p className="text-sm text-muted-foreground">
                    Nuestros agentes están analizando tu artículo.
                  </p>
                </div>
              )}

              {editorState === 'CORRECTED' && (
                <>
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="corrected-title">Título Corregido</Label>
                    <Input
                      id="corrected-title"
                      type="text"
                      value={watchedTitle}
                      onChange={(e) => setValue('title', e.target.value)}
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1.5">
                    <Label>Contenido Corregido</Label>
                    <TextEditor
                      key={editorKey}
                      value={correctedContent}
                      onChange={setCorrectedContent}
                      placeholder="El contenido corregido aparecerá aquí..."
                      className="flex-1"
                    />
                  </div>
                </>
              )}

              {correctionError && editorState !== 'CORRECTING' && (
                <div className="m-auto">
                  <Alert variant="destructive">
                    <AlertDescription>
                      <strong>Error:</strong> {correctionError}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Suggestions & Stats */}
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-4 overflow-y-auto">
          <StatsPanel
            originalStats={originalStats}
            correctedStats={correctedStats}
            showComparison={editorState === 'CORRECTED'}
          />
          {editorState === 'CORRECTED' && (
            <SuggestionsPanel
              complexSentences={complexSentences}
              toneCorrections={toneCorrections}
              clicheCrutches={clicheCrutches}
              onApplySuggestion={handleApplySuggestion}
              appliedSuggestions={appliedSuggestions}
              onReanalyzeCliches={handleReanalyzeCliches}
              isClichesLoading={isClichesLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
} 