
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentationTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentação do Modelo</CardTitle>
        <CardDescription>
          Informações detalhadas sobre o funcionamento e uso do modelo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Visão Geral do Modelo</h3>
            <p className="text-sm text-muted-foreground">
              O modelo de previsão de risco de evasão escolar do Une.AI EduCare utiliza uma 
              abordagem de árvore de decisão para classificar alunos em três níveis de risco 
              (baixo, médio e alto) com base em dados acadêmicos e comportamentais.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Fatores Analisados</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-sm">
                <span className="font-medium">Frequência escolar</span>
                <p className="text-muted-foreground">Porcentagem de presença nas aulas</p>
              </li>
              <li className="text-sm">
                <span className="font-medium">Desempenho acadêmico</span>
                <p className="text-muted-foreground">Notas médias em disciplinas principais</p>
              </li>
              <li className="text-sm">
                <span className="font-medium">Comportamento em sala</span>
                <p className="text-muted-foreground">Avaliação de 1 a 5 sobre o comportamento e engajamento</p>
              </li>
              <li className="text-sm">
                <span className="font-medium">Histórico de intervenções</span>
                <p className="text-muted-foreground">Resposta a intervenções anteriores (quando disponível)</p>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Como Utilizar o Sistema</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li className="text-sm">
                <span className="font-medium">Carregue dados dos alunos</span>
                <p className="text-muted-foreground">Utilize a página de upload para inserir dados acadêmicos.</p>
              </li>
              <li className="text-sm">
                <span className="font-medium">Analise os alertas gerados</span>
                <p className="text-muted-foreground">O sistema gera automaticamente alertas para alunos em risco.</p>
              </li>
              <li className="text-sm">
                <span className="font-medium">Agende intervenções</span>
                <p className="text-muted-foreground">Utilize as recomendações do modelo para planejar atendimentos.</p>
              </li>
              <li className="text-sm">
                <span className="font-medium">Acompanhe resultados</span>
                <p className="text-muted-foreground">Monitore o progresso dos alunos após as intervenções.</p>
              </li>
            </ol>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
            <h3 className="text-md font-medium text-blue-800 mb-2">Limitações e Considerações</h3>
            <p className="text-sm text-blue-800">
              Este modelo é uma ferramenta de suporte à decisão e não substitui o julgamento 
              profissional dos educadores. Fatores contextuais importantes podem não estar 
              capturados nos dados e devem ser considerados na avaliação final.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentationTab;
