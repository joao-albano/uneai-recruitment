
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { useProduct } from '@/context/ProductContext';
import Layout from '@/components/layout/Layout';
import UploadForm from '@/components/upload/UploadForm';
import UploadHistory from '@/components/upload/UploadHistory';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, History, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadTemplate } from '@/utils/validation/templateManager';

const UploadPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { currentProduct } = useProduct();
  
  const handleDownloadTemplate = () => {
    downloadTemplate(currentProduct);
  };
  
  return (
    <DataProvider>
      <Layout
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Upload de Dados</h1>
          <p className="text-muted-foreground mt-1">
            {currentProduct === 'recruitment'
              ? 'Faça upload de planilhas com dados de leads e campanhas'
              : 'Faça upload de planilhas com dados dos alunos'}
          </p>
        </div>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upload" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="info" className="gap-2">
              <Info className="h-4 w-4" />
              Informações
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <UploadForm />
          </TabsContent>
          
          <TabsContent value="history">
            <UploadHistory />
          </TabsContent>
          
          <TabsContent value="info">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-medium">Informações Importantes</h3>
                
                {currentProduct === 'recruitment' ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Formato da Planilha para Captação</h4>
                      <p className="text-muted-foreground">
                        A planilha deve estar no formato CSV ou Excel (.xlsx, .xls) com as seguintes colunas:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li><strong>nome</strong> - Nome completo do lead (obrigatório)</li>
                        <li><strong>email</strong> - Email do lead (obrigatório)</li>
                        <li><strong>telefone</strong> - Número de telefone do lead (obrigatório)</li>
                        <li><strong>canal</strong> - Canal de origem (ex: Facebook, Instagram, Site) (obrigatório)</li>
                        <li><strong>curso</strong> - Curso de interesse (obrigatório para IES)</li>
                        <li><strong>serie</strong> - Série de interesse (obrigatório para escolas)</li>
                        <li><strong>etapa</strong> - Etapa atual no funil (opcional)</li>
                        <li><strong>status</strong> - Status do lead (opcional)</li>
                        <li><strong>data_contato</strong> - Data do último contato (opcional)</li>
                        <li><strong>responsavel</strong> - Nome do responsável pelo lead (opcional)</li>
                        <li><strong>filhos</strong> - Número de filhos (opcional, para escolas)</li>
                        <li><strong>observacoes</strong> - Observações gerais (opcional)</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Formato da Planilha para Retenção</h4>
                      <p className="text-muted-foreground">
                        A planilha deve estar no formato CSV ou Excel (.xlsx, .xls) com as seguintes colunas:
                      </p>
                      <ul className="list-disc pl-6 mt-2 space-y-1 text-sm">
                        <li><strong>nome</strong> - Nome completo do aluno (obrigatório)</li>
                        <li><strong>registro</strong> - Número de matrícula do aluno (obrigatório)</li>
                        <li><strong>turma</strong> - Turma do aluno (ex: 9A, 8B) (obrigatório)</li>
                        <li><strong>segmento</strong> - Segmento escolar (ENSINO MÉDIO, FUNDAMENTAL I, etc.) (obrigatório)</li>
                        <li><strong>nota</strong> - Nota média do aluno (de 0 a 10) (opcional)</li>
                        <li><strong>frequencia</strong> - Porcentagem de presença (de 0 a 100) (opcional)</li>
                        <li><strong>comportamento</strong> - Avaliação de comportamento (de 0 a 10) (opcional)</li>
                        <li><strong>nome_responsavel</strong> - Nome do responsável pelo aluno (opcional)</li>
                        <li><strong>contato_responsavel</strong> - Número de telefone do responsável (opcional)</li>
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-start">
                  <Button 
                    onClick={handleDownloadTemplate} 
                    variant="outline" 
                    size="sm"
                    className="mt-2"
                  >
                    Baixar modelo de planilha
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-medium">Processo de Upload</h4>
                  <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm">
                    <li>Faça o download do modelo de planilha</li>
                    <li>Preencha com as informações {currentProduct === 'recruitment' ? 'dos leads' : 'dos alunos'}</li>
                    <li>Arraste o arquivo na área de upload ou clique para selecionar</li>
                    <li>Após o carregamento, clique em "Processar dados"</li>
                    <li>Se houver erros, eles serão exibidos para correção</li>
                    <li>Os dados válidos serão processados e exibidos no dashboard</li>
                  </ol>
                </div>
                
                {currentProduct === 'recruitment' ? (
                  <div>
                    <h4 className="font-medium">Funil de Captação</h4>
                    <p className="text-muted-foreground text-sm">
                      Após o processamento, o sistema integrará os leads importados ao funil de captação,
                      permitindo o acompanhamento de cada etapa do processo. Os leads serão classificados 
                      de acordo com o canal de origem e etapa atual no funil.
                    </p>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-medium">Avaliação de Risco</h4>
                    <p className="text-muted-foreground text-sm">
                      Após o processamento, o sistema avaliará automaticamente os alunos com base em seus dados,
                      classificando-os em níveis de risco (baixo, médio, alto) para intervenção pedagógica.
                      Os casos de risco médio e alto geram alertas no sistema.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Layout>
    </DataProvider>
  );
};

export default UploadPage;
