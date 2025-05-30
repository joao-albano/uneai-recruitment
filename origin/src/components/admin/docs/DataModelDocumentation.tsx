
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const DataModelDocumentation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Modelo de Dados</CardTitle>
          <CardDescription>Documentação das estruturas de dados principais do sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Entidades Principais</h3>
            <ul className="mt-2 space-y-4 list-none">
              <li>
                <div className="font-medium">Estudantes (StudentData)</div>
                <p className="text-muted-foreground mt-1">
                  Armazena informações dos alunos, incluindo dados acadêmicos e perfil de risco.
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-auto">
                  {`interface StudentData {
  id: string;
  name: string;
  class: string;
  attendance: number;
  grades: number;
  riskLevel: 'low' | 'medium' | 'high';
  contactInfo: ContactInfo;
  academicHistory: AcademicRecord[];
}`}
                </pre>
              </li>
              
              <li>
                <div className="font-medium">Organizações</div>
                <p className="text-muted-foreground mt-1">
                  Representa as instituições que utilizam o sistema, com seus planos e configurações.
                </p>
              </li>

              <li>
                <div className="font-medium">Usuários</div>
                <p className="text-muted-foreground mt-1">
                  Representa os usuários do sistema, com seus perfis e permissões.
                </p>
              </li>
              
              <li>
                <div className="font-medium">Alertas (AlertItem)</div>
                <p className="text-muted-foreground mt-1">
                  Notificações e avisos relacionados a estudantes e eventos do sistema.
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-auto">
                  {`interface AlertItem {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  type: string;
  message: string;
  createdAt: Date;
  read: boolean;
  actionTaken: boolean;
}`}
                </pre>
              </li>
              
              <li>
                <div className="font-medium">Upload Records</div>
                <p className="text-muted-foreground mt-1">
                  Registro de históricos de uploads realizados no sistema.
                </p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-xs overflow-auto">
                  {`interface UploadRecord {
  id: string;
  filename: string;
  uploadDate: Date;
  recordCount: number;
  status: 'success' | 'error';
  newCount?: number;
  updatedCount?: number;
  errorCount?: number;
}`}
                </pre>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Relacionamentos</h3>
            <p className="text-muted-foreground mt-1">
              Os principais relacionamentos entre entidades:
            </p>
            <ul className="mt-2 space-y-2 list-disc pl-5">
              <li>Uma <strong>Organização</strong> possui vários <strong>Usuários</strong></li>
              <li>Uma <strong>Organização</strong> possui vários <strong>Estudantes</strong></li>
              <li><strong>Estudantes</strong> podem gerar vários <strong>Alertas</strong></li>
              <li>Um <strong>Upload</strong> pode criar/atualizar vários <strong>Estudantes</strong> e gerar <strong>Alertas</strong></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Armazenamento de Dados</h3>
            <p className="text-muted-foreground mt-1">
              Os dados são armazenados utilizando uma combinação de:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Banco de dados PostgreSQL (via Supabase)</li>
              <li>Contextos React para estado em memória durante a sessão</li>
              <li>LocalStorage para persistência de configurações de usuário</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataModelDocumentation;
