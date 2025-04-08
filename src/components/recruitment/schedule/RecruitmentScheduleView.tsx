
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import { useScheduleData } from '@/hooks/useScheduleData';

// Mock data para campus/unidades
const campusOptions = [
  { id: '1', name: 'Unidade A' },
  { id: '2', name: 'Unidade B' },
  { id: '3', name: 'Unidade C' }
];

// Mock data para usuários/profissionais
const userOptions = [
  { id: '1', name: 'Prof. João Silva' },
  { id: '2', name: 'Prof. Maria Santos' },
  { id: '3', name: 'Coord. Ana Oliveira' }
];

const RecruitmentScheduleView: React.FC = () => {
  // Estados para filtros e visualização
  const [selectedCampus, setSelectedCampus] = useState<string>(campusOptions[0].id);
  const [selectedUser, setSelectedUser] = useState<string>(userOptions[0].id);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  
  // Usando o hook de dados de agendamento
  const scheduleData = useScheduleData();
  
  // Função para filtrar agendamentos baseados nos filtros selecionados
  const getFilteredSchedules = () => {
    let filtered = [...scheduleData.visibleSchedules];
    
    // Adicionar lógica de filtro por unidade e usuário quando os dados reais estiverem disponíveis
    // Este é um placeholder para a lógica que será implementada
    
    return filtered;
  };
  
  // Agendamentos filtrados
  const filteredSchedules = getFilteredSchedules();
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agenda de Captação</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="w-full md:w-64">
          <label className="block text-sm font-medium mb-1">Unidade</label>
          <Select value={selectedCampus} onValueChange={setSelectedCampus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione a unidade" />
            </SelectTrigger>
            <SelectContent>
              {campusOptions.map(campus => (
                <SelectItem key={campus.id} value={campus.id}>
                  {campus.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-64">
          <label className="block text-sm font-medium mb-1">Profissional</label>
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o profissional" />
            </SelectTrigger>
            <SelectContent>
              {userOptions.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'day' | 'week' | 'month')}>
            <TabsList className="mb-4">
              <TabsTrigger value="day">Dia</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mês</TabsTrigger>
            </TabsList>
            
            <TabsContent value="day">
              <DayView 
                schedules={filteredSchedules} 
                selectedCampus={selectedCampus}
                selectedUser={selectedUser}
              />
            </TabsContent>
            
            <TabsContent value="week">
              <WeekView 
                schedules={filteredSchedules} 
                selectedCampus={selectedCampus}
                selectedUser={selectedUser}
              />
            </TabsContent>
            
            <TabsContent value="month">
              <MonthView 
                schedules={filteredSchedules} 
                selectedCampus={selectedCampus}
                selectedUser={selectedUser}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentScheduleView;
