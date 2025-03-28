
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const UploadDocumentation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sistema de Upload</CardTitle>
          <CardDescription>Documentação do processo de upload e processamento de arquivos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Fluxo de Upload</h3>
            <p className="text-muted-foreground mt-1">
              O sistema de upload é composto por múltiplas etapas:
            </p>
            <ol className="mt-2 space-y-2 list-decimal pl-5">
              <li>Seleção do arquivo via drag-and-drop ou seletor de arquivos</li>
              <li>Validação inicial do tipo de arquivo (CSV, XLSX)</li>
              <li>Processamento do arquivo utilizando o módulo FileProcessor</li>
              <li>Validação dos cabeçalhos e dados contra um template</li>
              <li>Importação dos dados para o sistema</li>
              <li>Geração de alertas com base nos dados importados</li>
              <li>Registro do histórico de uploads</li>
            </ol>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Arquitetura do Processador de Arquivos</h3>
            <p className="text-muted-foreground mt-1">
              O processador de arquivos foi modularizado em múltiplos componentes:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><code>fileProcessing.ts</code> - Contém a lógica principal de processamento</li>
              <li><code>alertGenerator.ts</code> - Gera alertas com base nos dados processados</li>
              <li><code>mergeUtils.ts</code> - Utilitários para mesclar dados novos com existentes</li>
              <li><code>FileProcessor.tsx</code> - Ponto de exportação central</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Validação de Dados</h3>
            <p className="text-muted-foreground mt-1">
              A validação é realizada através dos seguintes módulos:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><code>headerValidator.ts</code> - Valida os cabeçalhos dos arquivos</li>
              <li><code>studentValidator.ts</code> - Valida os dados dos alunos</li>
              <li><code>templateManager.ts</code> - Gerencia os templates esperados</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Histórico de Uploads</h3>
            <p className="text-muted-foreground mt-1">
              O histórico de uploads é gerenciado pelo contexto DataContext e exibido no componente UploadHistory.
              Para testes e demonstrações, foi implementada uma funcionalidade para gerar dados de demonstração em demoUploadData.ts.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadDocumentation;
