
import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FormCompletionProps {
  onStartNewSurvey: () => void;
}

const FormCompletion: React.FC<FormCompletionProps> = ({ onStartNewSurvey }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center my-6">
          <div className="rounded-full bg-green-100 p-3">
            <ClipboardCheck className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-center text-2xl">Pesquisa Enviada</CardTitle>
        <CardDescription className="text-center">
          Agradecemos por fornecer essas informações importantes que nos ajudarão a apoiar melhor o aluno.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground">
          Nossa equipe irá analisar as respostas e entrar em contato se necessário.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onStartNewSurvey}>
          Iniciar nova pesquisa
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FormCompletion;
