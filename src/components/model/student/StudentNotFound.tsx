
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudentNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="mt-6">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center py-12">
          <h2 className="text-xl font-semibold mb-2">Aluno não encontrado</h2>
          <p className="text-muted-foreground mb-4">O aluno solicitado não existe ou foi removido.</p>
          <Button onClick={() => navigate('/model')}>Voltar ao Modelo</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentNotFound;
