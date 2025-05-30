
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RecruitmentFiltersPanelProps {
  selectedCampus: string;
  setSelectedCampus: (value: string) => void;
  selectedUser: string;
  setSelectedUser: (value: string) => void;
  viewMode: string;
  setViewMode: (value: string) => void;
}

const RecruitmentFiltersPanel: React.FC<RecruitmentFiltersPanelProps> = ({
  selectedCampus,
  setSelectedCampus,
  selectedUser,
  setSelectedUser,
  viewMode,
  setViewMode
}) => {
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

  return (
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
  );
};

export default RecruitmentFiltersPanel;
