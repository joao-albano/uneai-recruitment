
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Model feature data structure
interface ModelFeature {
  feature: string;
  openai: string | boolean;
  google: string | boolean;
  claude: string | boolean;
  grok: string | boolean;
  description?: string;
}

// Sample model comparison data
const modelFeatures: ModelFeature[] = [
  {
    feature: 'Base Model',
    openai: 'GPT-3.5/GPT-4',
    google: 'Gemini',
    claude: 'Claude 3',
    grok: 'Grok-1',
    description: 'Base model architecture'
  },
  {
    feature: 'Context Window',
    openai: '8K-32K tokens',
    google: '32K tokens',
    claude: '100K tokens',
    claude: '8K tokens',
    description: 'Maximum input context length'
  },
  {
    feature: 'Vision Support',
    openai: true,
    google: true,
    claude: true,
    grok: false,
    description: 'Ability to process and interpret images'
  },
  {
    feature: 'Fine-tuning',
    openai: true,
    google: true,
    claude: false,
    grok: false,
    description: 'Support for custom fine-tuning'
  },
  {
    feature: 'Function Calling',
    openai: true,
    google: true,
    claude: true,
    grok: false,
    description: 'Support for API function calling'
  },
  {
    feature: 'Streaming Responses',
    openai: true,
    google: true,
    claude: true,
    grok: true,
    description: 'Supports token-by-token streaming'
  },
  {
    feature: 'Cost',
    openai: 'Medium-High',
    google: 'Medium',
    claude: 'Medium',
    grok: 'Low',
    description: 'Relative cost per request'
  }
];

const ModelComparison: React.FC = () => {
  const { language } = useTheme();
  
  // Render badge based on boolean value
  const renderFeatureSupport = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Badge className="bg-green-500">
          {language === 'pt-BR' ? 'Sim' : 'Yes'}
        </Badge>
      ) : (
        <Badge variant="outline" className="text-gray-400">
          {language === 'pt-BR' ? 'Não' : 'No'}
        </Badge>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Comparação de Modelos de IA' : 'AI Model Comparison'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Compare recursos e características dos diferentes modelos de IA disponíveis' 
            : 'Compare features and characteristics of different available AI models'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  {language === 'pt-BR' ? 'Recurso' : 'Feature'}
                </TableHead>
                <TableHead>OpenAI</TableHead>
                <TableHead>Google AI</TableHead>
                <TableHead>Claude</TableHead>
                <TableHead>Grok</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modelFeatures.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {item.feature}
                    {item.description && (
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    )}
                  </TableCell>
                  <TableCell>{renderFeatureSupport(item.openai)}</TableCell>
                  <TableCell>{renderFeatureSupport(item.google)}</TableCell>
                  <TableCell>{renderFeatureSupport(item.claude)}</TableCell>
                  <TableCell>{renderFeatureSupport(item.grok)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelComparison;
