
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import UploadForm from '@/components/upload/UploadForm';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, HelpCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UploadPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <DataProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 p-6">
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Upload de Dados</h1>
                <p className="text-muted-foreground mt-1">
                  Faça upload de planilhas com dados dos alunos
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => window.open('https://docs.example.com/upload-guide', '_blank')}
              >
                <HelpCircle className="h-4 w-4" />
                Guia de Upload
              </Button>
            </div>
            
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="upload" className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Upload
                </TabsTrigger>
                <TabsTrigger value="info" className="gap-2">
                  <Info className="h-4 w-4" />
                  Informações
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <UploadForm />
              </TabsContent>
              
              <TabsContent value="info">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-medium">Informações Importantes</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Formato da Planilha</h4>
                        <p className="text-muted-foreground">
                          A planilha deve estar no formato CSV ou Excel (.xlsx, .xls) com as seguintes colunas:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                          <li><strong>nome</strong> - Nome completo do aluno</li>
                          <li><strong>turma</strong> - Turma do aluno (ex: 9A, 8B)</li>
                          <li><strong>nota</strong> - Nota média do aluno (de 0 a 10)</li>
                          <li><strong>frequencia</strong> - Porcentagem de presença (de 0 a 100)</li>
                          <li><strong>comportamento</strong> - Avaliação de comportamento (de 1 a 5)</li>
                          <li><strong>responsavel</strong> - Nome do responsável pelo aluno</li>
                          <li><strong>contato</strong> - Número de telefone do responsável no formato (XX) XXXXX-XXXX</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Processo de Upload</h4>
                        <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm">
                          <li>Faça o download do modelo de planilha</li>
                          <li>Preencha com as informações dos alunos</li>
                          <li>Arraste o arquivo na área de upload ou clique para selecionar</li>
                          <li>Após o carregamento, clique em "Processar dados"</li>
                          <li>Se houver erros, eles serão exibidos para correção</li>
                          <li>Os dados válidos serão processados e exibidos no dashboard</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h4 className="font-medium">Avaliação de Risco</h4>
                        <p className="text-muted-foreground text-sm">
                          Após o processamento, o sistema avaliará automaticamente os alunos com base em seus dados,
                          classificando-os em níveis de risco (baixo, médio, alto) para intervenção pedagógica.
                          Os casos de risco médio e alto geram alertas no sistema.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default UploadPage;
