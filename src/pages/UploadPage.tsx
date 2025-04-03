
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { useProduct } from '@/context/ProductContext';
import Layout from '@/components/layout/Layout';
import UploadForm from '@/components/upload/UploadForm';
import UploadHistory from '@/components/upload/UploadHistory';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileSpreadsheet, History, Info, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadTemplate, InstitutionType } from '@/utils/validation/templateManager';
import InstitutionTypeSelector from '@/components/upload/InstitutionTypeSelector';

const UploadPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [institutionType, setInstitutionType] = useState<InstitutionType>('school');
  const { currentProduct } = useProduct();
  
  const handleDownloadTemplate = () => {
    downloadTemplate(currentProduct, institutionType);
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
              <CardContent className="pt-6 space-y-6">
                <h3 className="text-lg font-medium">Informações Importantes</h3>
                
                <div className="mb-4">
                  <InstitutionTypeSelector value={institutionType} onChange={setInstitutionType} />
                </div>
                
                {currentProduct === 'recruitment' ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Campos para {institutionType === 'school' ? 'Educação Básica' : 'Ensino Superior'}</h4>
                      <p className="text-muted-foreground mb-2">
                        A planilha deve estar no formato CSV ou Excel (.xlsx, .xls) com as seguintes colunas:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        {institutionType === 'school' ? (
                          <>
                            <li><strong>nome</strong> - Nome completo do lead (obrigatório)</li>
                            <li><strong>email</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Email do lead (obrigatório)</li>
                            <li><strong>telefone</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Número de telefone do lead (obrigatório)</li>
                            <li><strong>ra</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Número de registro/matrícula do aluno</li>
                            <li><strong>cpf</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - CPF do responsável</li>
                            <li><strong>canal</strong> - Canal de origem (ex: Facebook, Instagram, Site) (obrigatório)</li>
                            <li><strong>serie</strong> - Série/ano pretendido</li>
                            <li><strong>quantidade_filhos</strong> - Número de filhos</li>
                            <li><strong>nome_filhos</strong> - Nomes dos filhos (separados por vírgula)</li>
                            <li><strong>idade_filhos</strong> - Idades dos filhos (separados por vírgula)</li>
                            <li><strong>intenção_matrícula</strong> - Nível de intenção de matrícula</li>
                            <li><strong>melhor_horario_contato</strong> - Melhor horário para contato</li>
                            <li><strong>observacoes</strong> - Observações gerais</li>
                          </>
                        ) : (
                          <>
                            <li><strong>nome</strong> - Nome completo do lead (obrigatório)</li>
                            <li><strong>email</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Email do lead (obrigatório)</li>
                            <li><strong>telefone</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Número de telefone do lead (obrigatório)</li>
                            <li><strong>cpf</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - CPF do candidato</li>
                            <li><strong>canal</strong> - Canal de origem (ex: Facebook, Instagram, Site) (obrigatório)</li>
                            <li><strong>curso</strong> - Curso de interesse (obrigatório)</li>
                            <li><strong>modalidade</strong> - Modalidade (Presencial, EAD, Híbrido)</li>
                            <li><strong>período</strong> - Período de interesse (Matutino, Vespertino, Noturno)</li>
                            <li><strong>intenção_matrícula</strong> - Nível de intenção de matrícula</li>
                            <li><strong>melhor_horario_contato</strong> - Melhor horário para contato</li>
                            <li><strong>observacoes</strong> - Observações gerais</li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium flex items-center gap-1.5">
                        <KeyRound className="h-4 w-4 text-amber-500" />
                        Campos para chave única
                      </h4>
                      <p className="text-muted-foreground mb-2">
                        Para evitar duplicações durante a importação, os seguintes campos podem ser usados como chave única:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        {institutionType === 'school' ? (
                          <>
                            <li><strong>email</strong> - Email do responsável</li>
                            <li><strong>telefone</strong> - Telefone do responsável</li>
                            <li><strong>ra</strong> - Número de registro do aluno (RA)</li>
                            <li><strong>cpf</strong> - CPF do responsável</li>
                          </>
                        ) : (
                          <>
                            <li><strong>email</strong> - Email do candidato</li>
                            <li><strong>telefone</strong> - Telefone do candidato</li>
                            <li><strong>cpf</strong> - CPF do candidato</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Campos para {institutionType === 'school' ? 'Educação Básica' : 'Ensino Superior'}</h4>
                      <p className="text-muted-foreground mb-2">
                        A planilha deve estar no formato CSV ou Excel (.xlsx, .xls) com as seguintes colunas:
                      </p>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        {institutionType === 'school' ? (
                          <>
                            <li><strong>nome</strong> - Nome completo do aluno (obrigatório)</li>
                            <li><strong>registro</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Número de matrícula do aluno (obrigatório)</li>
                            <li><strong>turma</strong> - Turma do aluno (ex: 9A, 8B) (obrigatório)</li>
                            <li><strong>segmento</strong> - Segmento escolar (ENSINO MÉDIO, FUNDAMENTAL I, etc.) (obrigatório)</li>
                            <li><strong>nota</strong> - Nota média do aluno (de 0 a 10) (opcional)</li>
                            <li><strong>frequencia</strong> - Porcentagem de presença (de 0 a 100) (opcional)</li>
                            <li><strong>comportamento</strong> - Avaliação de comportamento (de 0 a 10) (opcional)</li>
                            <li><strong>nome_responsavel</strong> - Nome do responsável pelo aluno (opcional)</li>
                            <li><strong>contato_responsavel</strong> - Número de telefone do responsável (opcional)</li>
                          </>
                        ) : (
                          <>
                            <li><strong>nome</strong> - Nome completo do aluno (obrigatório)</li>
                            <li><strong>registro</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Número de matrícula do aluno (obrigatório)</li>
                            <li><strong>cpf</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - CPF do aluno</li>
                            <li><strong>curso</strong> - Curso atual do aluno (obrigatório)</li>
                            <li><strong>periodo</strong> - Período de estudo (Manhã, Tarde, Noite) (obrigatório)</li>
                            <li><strong>semestre</strong> - Semestre atual do aluno (obrigatório)</li>
                            <li><strong>cr</strong> - Coeficiente de Rendimento (de 0 a 10) (opcional)</li>
                            <li><strong>frequencia</strong> - Porcentagem de presença (de 0 a 100) (opcional)</li>
                            <li><strong>email</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Email do aluno (opcional)</li>
                          </>
                        )}
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
                    Baixar modelo de planilha para {institutionType === 'school' ? 'Educação Básica' : 'Ensino Superior'}
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-medium">Processo de Upload</h4>
                  <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm">
                    <li>Selecione o tipo de instituição (Educação Básica ou Ensino Superior)</li>
                    <li>Escolha o campo que será usado como chave única para evitar duplicações</li>
                    <li>Faça o download do modelo de planilha para o tipo selecionado</li>
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
