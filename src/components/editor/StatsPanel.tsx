import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArticleStats } from '@/types/editor';
import { BarChart3, Clock, FileText, Type } from 'lucide-react';

interface StatsPanelProps {
  originalStats: ArticleStats;
  correctedStats?: ArticleStats;
  showComparison?: boolean;
}

export function StatsPanel({ originalStats, correctedStats, showComparison = false }: StatsPanelProps) {
  const calculateImprovement = (original: number, corrected: number) => {
    if (original === 0) return 0;
    return Math.round(((corrected - original) / original) * 100);
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'text-green-600';
    if (improvement < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const StatItem = ({ 
    icon: Icon, 
    label, 
    original, 
    corrected, 
    unit = '' 
  }: { 
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    original: number;
    corrected?: number;
    unit?: string;
  }) => {
    const improvement = corrected ? calculateImprovement(original, corrected) : 0;
    
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">{label}:</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold">{original}{unit}</span>
          {showComparison && corrected !== undefined && (
            <>
              <span className="text-gray-400">→</span>
              <span className="text-sm font-bold">{corrected}{unit}</span>
              {improvement !== 0 && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getImprovementColor(improvement)}`}
                >
                  {improvement > 0 ? '+' : ''}{improvement}%
                </Badge>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Estadísticas
          {showComparison && (
            <Badge variant="secondary" className="ml-2">
              Comparación
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <StatItem
          icon={Type}
          label="Caracteres"
          original={originalStats.characters}
          corrected={correctedStats?.characters}
        />
        
        <StatItem
          icon={FileText}
          label="Palabras"
          original={originalStats.words}
          corrected={correctedStats?.words}
        />
        
        <StatItem
          icon={FileText}
          label="Párrafos"
          original={originalStats.paragraphs}
          corrected={correctedStats?.paragraphs}
        />
        
        <StatItem
          icon={Clock}
          label="Tiempo de lectura"
          original={originalStats.readingTime}
          corrected={correctedStats?.readingTime}
          unit=" min"
        />

        {showComparison && correctedStats && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Resumen de mejoras</h4>
            <div className="text-xs text-blue-800">
              {correctedStats.words !== originalStats.words && (
                <p>• Palabras: {correctedStats.words > originalStats.words ? 'Aumentó' : 'Disminuyó'} en {Math.abs(correctedStats.words - originalStats.words)} palabras</p>
              )}
              {correctedStats.readingTime !== originalStats.readingTime && (
                <p>• Tiempo de lectura: {correctedStats.readingTime > originalStats.readingTime ? 'Aumentó' : 'Disminuyó'} en {Math.abs(correctedStats.readingTime - originalStats.readingTime)} min</p>
              )}
              {correctedStats.paragraphs !== originalStats.paragraphs && (
                <p>• Párrafos: {correctedStats.paragraphs > originalStats.paragraphs ? 'Aumentó' : 'Disminuyó'} en {Math.abs(correctedStats.paragraphs - originalStats.paragraphs)} párrafos</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 