
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, KeyRound, Plus } from 'lucide-react';
import { downloadTemplate } from '@/utils/validation/templateManager';
import type { InstitutionType } from '@/utils/validation/headerTypes';
import InstitutionTypeSelector from '@/components/upload/InstitutionTypeSelector';
import { useProduct } from '@/context/ProductContext';

const InfoTabContent: React.FC = () => {
  const [institutionType, setInstitutionType] = useState<InstitutionType>('school');
  const { currentProduct } = useProduct();
  
  // For retention product, always set to school type
  useEffect(() => {
    if (currentProduct === 'retention') {
      setInstitutionType('school');
    }
  }, [currentProduct]);

  const handleDownloadTemplate = () => {
    downloadTemplate(
      currentProduct === 'recruitment' ? 'recruitment' : 'retention',
      institutionType
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Informações Importantes</CardTitle>
          <CardDescription>
            Detalhes sobre o formato de dados para importação
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Institution type selector only for recruitment */}
        {currentProduct === 'recruitment' && (
          <div className="mb-4">
            <InstitutionTypeSelector value={institutionType} onChange={setInstitutionType} />
          </div>
        )}
        
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
                    <li><strong>nome</strong> - Nome completo do aluno (obrigatório)</li>
                    <li><strong>email_responsavel</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Email do responsável (obrigatório*)</li>
                    <li><strong>cpf_responsavel</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - CPF do responsável (obrigatório*)</li>
                    <li><strong>telefone</strong> - Número de telefone do responsável</li>
                    <li><strong>ra</strong> - Número de registro/matrícula do aluno (opcional)</li>
                    <li><strong>nome_responsavel</strong> - Nome do responsável</li>
                    <li><strong>cep</strong> - CEP</li>
                    <li><strong>canal</strong> - Canal de origem (ex: Facebook, Instagram, Site) (obrigatório)</li>
                    <li><strong>serie</strong> - Série/ano pretendido</li>
                    <li><strong>quantidade_filhos</strong> - Número de filhos</li>
                    <li><strong>nome_filhos</strong> - Nomes dos filhos (separados por vírgula)</li>
                    <li><strong>idade_filhos</strong> - Idades dos filhos (separadas por vírgula)</li>
                    <li><strong>intenção_matrícula</strong> - Nível de intenção de matrícula</li>
                    <li><strong>melhor_horario_contato</strong> - Melhor horário para contato</li>
                    <li><strong>observacoes</strong> - Observações gerais</li>
                    <li className="text-xs text-amber-600 mt-1">* É necessário fornecer pelo menos um dos campos: email_responsavel OU cpf_responsavel</li>
                  </>
                ) : (
                  <>
                    <li><strong>nome</strong> - Nome completo do lead (obrigatório)</li>
                    <li><strong>email</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Email do lead (obrigatório)</li>
                    <li><strong>telefone</strong> - Número de telefone do lead (obrigatório)</li>
                    <li><strong>cpf</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - CPF do candidato</li>
                    <li><strong>canal</strong> - Canal de origem (ex: Facebook, Instagram, Site) (obrigatório)</li>
                    <li><strong>curso</strong> - Curso de interesse (obrigatório)</li>
                    <li><strong>modalidade</strong> - Modalidade (Presencial, EAD, Híbrido)</li>
                    <li><strong>cep</strong> - CEP</li>
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
                    <li><strong>email_responsavel</strong> - Email do responsável</li>
                    <li><strong>cpf_responsavel</strong> - CPF do responsável</li>
                    <li><span className="text-amber-600 font-medium">Um destes campos é obrigatório</span></li>
                  </>
                ) : (
                  <>
                    <li><strong>email</strong> - Email do candidato</li>
                    <li><strong>cpf</strong> - CPF do candidato</li>
                    <li><span className="text-amber-600 font-medium">Um destes campos é obrigatório</span></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">Campos para Retenção de Alunos (Educação Básica)</h4>
              <p className="text-muted-foreground mb-2">
                A planilha deve estar no formato CSV ou Excel (.xlsx, .xls) com as seguintes colunas:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>nome</strong> - Nome completo do aluno (obrigatório)</li>
                <li><strong>registro</strong> <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> - Número de matrícula do aluno (RA) (obrigatório)</li>
                <li><strong>turma</strong> - Turma do aluno (ex: 9A, 8B) (obrigatório)</li>
                <li><strong>segmento</strong> - Segmento escolar (ENSINO MÉDIO, FUNDAMENTAL I, etc.) (obrigatório)</li>
                <li><strong>nota</strong> - Nota média do aluno (de 0 a 10) (opcional)</li>
                <li><strong>frequencia</strong> - Porcentagem de presença (de 0 a 100) (opcional)</li>
                <li><strong>comportamento</strong> - Avaliação de comportamento (de 0 a 10) (opcional)</li>
                <li><strong>nome_responsavel</strong> - Nome do responsável pelo aluno (opcional)</li>
                <li><strong>contato_responsavel</strong> - Número de telefone do responsável (opcional)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium flex items-center gap-1.5">
                <KeyRound className="h-4 w-4 text-amber-500" />
                Controle de importações mensais
              </h4>
              <p className="text-muted-foreground mb-2">
                O sistema utiliza o campo RA (registro do aluno) e o mês atual para controlar as importações:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Se um aluno com o mesmo RA já foi importado <strong>no mês atual</strong>, seus dados serão <strong>atualizados</strong>.</li>
                <li>Se a importação ocorrer em um <strong>novo mês</strong>, mesmo com um RA já existente, um <strong>novo registro</strong> será criado.</li>
                <li>Isso permite o acompanhamento da evolução mensal de notas, frequência e comportamento do aluno.</li>
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
            Baixar modelo de planilha {currentProduct === 'retention' ? 'para Retenção' : 
              institutionType === 'school' ? 'para Educação Básica' : 'para Ensino Superior'}
          </Button>
        </div>
        
        <div>
          <h4 className="font-medium">Processo de Upload</h4>
          <ol className="list-decimal pl-6 mt-2 space-y-1 text-sm">
            {currentProduct === 'recruitment' && (
              <li>Selecione o tipo de instituição (Educação Básica ou Ensino Superior)</li>
            )}
            <li>
              {currentProduct === 'recruitment' 
                ? 'Escolha o campo que será usado como chave única para evitar duplicações' 
                : 'Verifique que o RA (registro do aluno) será usado como chave única'}
            </li>
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
            <h4 className="font-medium">Avaliação de Risco para Retenção</h4>
            <p className="text-muted-foreground text-sm">
              Após o processamento, o sistema avaliará automaticamente os alunos com base em seus dados,
              classificando-os em níveis de risco (baixo, médio, alto) para intervenção pedagógica.
              Os casos de risco médio e alto geram alertas no sistema para acompanhamento mensal.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoTabContent;
