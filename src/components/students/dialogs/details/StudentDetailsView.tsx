
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Student } from '@/types/data';

interface StudentDetailsViewProps {
  student: Student;
}

const StudentDetailsView: React.FC<StudentDetailsViewProps> = ({ student }) => {
  return (
    <Tabs defaultValue="info">
      <TabsList>
        <TabsTrigger value="info">Informações</TabsTrigger>
        <TabsTrigger value="attendance">Frequência</TabsTrigger>
        <TabsTrigger value="behavior">Comportamento</TabsTrigger>
      </TabsList>
      
      <TabsContent value="info" className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium">Segmento</h4>
            <p>{student.segment}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Série/Ano</h4>
            <p>{student.grade}º ano</p>
          </div>
          {student.parentName && (
            <div>
              <h4 className="text-sm font-medium">Responsável</h4>
              <p>{student.parentName}</p>
            </div>
          )}
          {student.parentContact && (
            <div>
              <h4 className="text-sm font-medium">Contato</h4>
              <p>{student.parentContact}</p>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="attendance" className="py-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Frequência</h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${
                student.attendance >= 90 ? 'bg-green-500' :
                student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
              style={{ width: `${student.attendance}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm">{student.attendance}% de presença</p>
        </div>
      </TabsContent>
      
      <TabsContent value="behavior" className="py-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Comportamento</h4>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${
                student.behavior >= 90 ? 'bg-green-500' :
                student.behavior >= 75 ? 'bg-yellow-500' : 'bg-red-500'
              }`} 
              style={{ width: `${student.behavior}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm">Pontuação: {student.behavior}/100</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default StudentDetailsView;
