
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { StudentData } from '@/context/DataContext';
import RiskExplanation from '../dashboard/RiskExplanation';
import { Phone, Calendar, BarChart3, User } from 'lucide-react';

interface StudentDetailProps {
  student: StudentData;
  onScheduleMeeting: (studentId: string, studentName: string) => void;
  onSendSurvey: (studentId: string) => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ 
  student, 
  onScheduleMeeting,
  onSendSurvey
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleScheduleMeeting = () => {
    onScheduleMeeting(student.id, student.name);
  };
  
  const handleSendSurvey = () => {
    onSendSurvey(student.id);
    toast({
      title: 'Pesquisa enviada',
      description: `Uma pesquisa foi enviada para ${student.parentName}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <p className="text-muted-foreground">Turma {student.class} | ID: {student.id}</p>
        </div>
        <div className="flex mt-4 sm:mt-0 space-x-2">
          <Button variant="outline" size="sm" onClick={handleSendSurvey}>
            Enviar Pesquisa
          </Button>
          <Button size="sm" onClick={handleScheduleMeeting}>
            Agendar Atendimento
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="risk">Análise de Risco</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Dados Acadêmicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nota média:</span>
                    <span className="font-medium">{student.grade.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequência:</span>
                    <span className="font-medium">{student.attendance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Comportamento:</span>
                    <span className="font-medium">{student.behavior}/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Responsável</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{student.parentName || "Não informado"}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{student.parentContact || "Não informado"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ações Necessárias</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {student.actionItems && student.actionItems.length > 0 ? (
                    student.actionItems.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{action}</span>
                      </li>
                    ))
                  ) : (
                    <li>Nenhuma ação necessária no momento</li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Próximos Atendimentos</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/schedule')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Ver todos
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  Nenhum atendimento agendado.
                </p>
                <Button variant="link" size="sm" onClick={handleScheduleMeeting}>
                  Agendar atendimento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risk">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Indicadores de Risco</CardTitle>
                <Button variant="ghost" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Ver histórico
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-2 border rounded-md">
                    <p className="text-xs text-muted-foreground">Acadêmico</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium">{student.grade < 6 ? 'Crítico' : student.grade < 7 ? 'Atenção' : 'Adequado'}</p>
                      <span className={`h-2 w-2 rounded-full ${
                        student.grade < 6 ? 'bg-red-500' : 
                        student.grade < 7 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                    </div>
                  </div>
                  
                  <div className="p-2 border rounded-md">
                    <p className="text-xs text-muted-foreground">Frequência</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium">{student.attendance < 70 ? 'Crítico' : student.attendance < 85 ? 'Atenção' : 'Adequado'}</p>
                      <span className={`h-2 w-2 rounded-full ${
                        student.attendance < 70 ? 'bg-red-500' : 
                        student.attendance < 85 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                    </div>
                  </div>
                  
                  <div className="p-2 border rounded-md">
                    <p className="text-xs text-muted-foreground">Comportamento</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium">{student.behavior <= 2 ? 'Crítico' : student.behavior <= 3 ? 'Atenção' : 'Adequado'}</p>
                      <span className={`h-2 w-2 rounded-full ${
                        student.behavior <= 2 ? 'bg-red-500' : 
                        student.behavior <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}></span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <RiskExplanation student={student} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetail;
