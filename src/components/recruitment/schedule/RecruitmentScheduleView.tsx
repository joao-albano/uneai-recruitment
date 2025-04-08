
import React, { useEffect, useState } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useToast } from '@/hooks/use-toast';
import { useProduct } from '@/context/product';
import { generateDemoSchedules } from '@/data/demoData';
import ScheduleView from '@/components/scheduling/ScheduleView';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Schedule } from '@/types/schedule';
import { ProductType } from '@/context/product/types';

interface RecruitmentScheduleViewProps {
  showAddDialog?: boolean;
  setShowAddDialog?: (show: boolean) => void;
  leadId?: string | null;
}

const RecruitmentScheduleView: React.FC<RecruitmentScheduleViewProps> = ({
  showAddDialog,
  setShowAddDialog,
  leadId
}) => {
  const { schedules, setSchedules, visibleSchedules } = useSchedules();
  const { toast } = useToast();
  const { currentProduct } = useProduct();
  const [selectedCampus, setSelectedCampus] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("month");
  
  // Demo campuses and users for filtering
  const campuses = [
    { id: "all", name: "Todas as unidades" },
    { id: "campus-1", name: "Unidade Central" },
    { id: "campus-2", name: "Unidade Norte" },
    { id: "campus-3", name: "Unidade Sul" }
  ];
  
  const users = [
    { id: "all", name: "Todos os usuários" },
    { id: "user-1", name: "Coord. Mariana" },
    { id: "user-2", name: "Prof. Ricardo" },
    { id: "user-3", name: "Prof. Juliana" }
  ];
  
  useEffect(() => {
    // Load demo data if no schedules exist
    if (schedules.length === 0) {
      const demoSchedules = generateDemoSchedules();
      
      // Add some recruitment-specific schedules for demonstration
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const recruitmentSchedules: Schedule[] = [
        {
          id: `schedule-recruit-1`,
          studentId: 'lead-101',
          studentName: 'Lead Maria Silva',
          date: today,
          agentName: 'Coord. Renata',
          status: 'scheduled' as const,
          notes: 'Interesse em matrícula para o próximo semestre',
          productContext: 'recruitment' as ProductType,
          educationType: 'higher',
          studentPhone: '(11) 98765-4321',
          studentEmail: 'maria.silva@email.com',
          course: 'Administração'
        },
        {
          id: `schedule-recruit-2`,
          studentId: 'lead-102',
          studentName: 'Lead João Santos',
          date: tomorrow,
          agentName: 'Prof. Ricardo',
          status: 'scheduled' as const,
          notes: 'Pai interessado em conhecer a escola',
          productContext: 'recruitment' as ProductType,
          educationType: 'basic',
          parentName: 'Roberto Santos',
          parentPhone: '(11) 91234-5678'
        },
        {
          id: `schedule-recruit-3`,
          studentId: 'lead-103',
          studentName: 'Lead Ana Costa',
          date: nextWeek,
          agentName: 'Coord. Mariana',
          status: 'scheduled' as const,
          notes: 'Potencial transferência de outra universidade',
          productContext: 'recruitment' as ProductType,
          educationType: 'higher',
          studentPhone: '(11) 97777-8888',
          studentEmail: 'ana.costa@email.com',
          course: 'Medicina'
        }
      ];
      
      setSchedules([...demoSchedules, ...recruitmentSchedules]);
      
      toast({
        title: "Dados de demonstração carregados",
        description: "Agendamentos de exemplo foram adicionados para visualização.",
      });
    }
  }, [schedules.length, setSchedules, toast]);

  const handleNewSchedule = () => {
    if (setShowAddDialog) {
      setShowAddDialog(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 mt-4 px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agenda de Captação</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie atendimentos e acompanhamentos de leads
          </p>
        </div>
        
        <Button className="flex items-center gap-2" onClick={handleNewSchedule}>
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>
      
      <Card className="mx-6 mb-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium mb-1 block">Unidade</label>
            <Select value={selectedCampus} onValueChange={setSelectedCampus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma unidade" />
              </SelectTrigger>
              <SelectContent>
                {campuses.map(campus => (
                  <SelectItem key={campus.id} value={campus.id}>
                    {campus.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium mb-1 block">Usuário</label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um usuário" />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-1/3">
            <label className="text-sm font-medium mb-1 block">Visualização</label>
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">Dia</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mês</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      <main className="flex-1 overflow-y-auto p-6 pointer-events-auto">
        <ScheduleView 
          productContext="recruitment" 
          showAddDialog={showAddDialog}
          setShowAddDialog={setShowAddDialog}
          leadId={leadId}
          viewMode={viewMode}
        />
      </main>
    </div>
  );
};

export default RecruitmentScheduleView;
