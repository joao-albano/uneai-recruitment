
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { StudentData } from '@/context/DataContext';
import StudentHeader from './detail/StudentHeader';
import StudentOverviewTab from './detail/StudentOverviewTab';
import StudentRiskTab from './detail/StudentRiskTab';

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
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleSendSurvey = (studentId: string) => {
    onSendSurvey(studentId);
    toast({
      title: 'Pesquisa enviada',
      description: `Uma pesquisa foi enviada para ${student.parentName}`,
    });
  };

  return (
    <div className="space-y-6">
      <StudentHeader 
        student={student} 
        onScheduleMeeting={onScheduleMeeting}
        onSendSurvey={handleSendSurvey}
      />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="risk">Análise de Risco</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <StudentOverviewTab 
            student={student} 
            onScheduleMeeting={onScheduleMeeting} 
          />
        </TabsContent>
        
        <TabsContent value="risk">
          <StudentRiskTab student={student} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetail;
