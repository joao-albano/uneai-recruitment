
import React, { useState, useEffect } from 'react';
import { LeadData } from '@/types/recruitment/leads';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// Dados mockados para demonstração
const mockLeads: LeadData[] = [
  { id: 'lead1', name: 'João Silva', email: 'joao@example.com', phone: '(11) 98765-4321', channel: 'site', status: 'novo', course: 'Engenharia', createdAt: new Date(), updatedAt: new Date() },
  { id: 'lead2', name: 'Maria Oliveira', email: 'maria@example.com', phone: '(11) 97654-3210', channel: 'whatsapp', status: 'interessado', course: 'Medicina', createdAt: new Date(), updatedAt: new Date() },
  { id: 'lead3', name: 'Pedro Santos', email: 'pedro@example.com', phone: '(11) 96543-2109', channel: 'instagram', status: 'quente', course: 'Direito', createdAt: new Date(), updatedAt: new Date() },
  { id: 'lead4', name: 'Ana Souza', email: 'ana@example.com', phone: '(11) 95432-1098', channel: 'facebook', status: 'convertido', course: 'Psicologia', createdAt: new Date(), updatedAt: new Date() },
  { id: 'lead5', name: 'Carlos Ferreira', email: 'carlos@example.com', phone: '(11) 94321-0987', channel: 'site', status: 'novo', course: 'Administração', createdAt: new Date(), updatedAt: new Date() },
  { id: 'lead6', name: 'Fernanda Lima', email: 'fernanda@example.com', phone: '(11) 93210-9876', channel: 'whatsapp', status: 'interessado', course: 'Contabilidade', createdAt: new Date(), updatedAt: new Date() },
  { id: 'lead7', name: 'Rafael Gomes', email: 'rafael@example.com', phone: '(11) 92109-8765', channel: 'instagram', status: 'quente', course: 'Marketing', createdAt: new Date(), updatedAt: new Date() },
  { id: 'lead8', name: 'Juliana Costa', email: 'juliana@example.com', phone: '(11) 91098-7654', channel: 'facebook', status: 'perdido', course: 'Pedagogia', createdAt: new Date(), updatedAt: new Date() },
];

interface LeadSelectionFormProps {
  selectedLeadIds: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

const LeadSelectionForm: React.FC<LeadSelectionFormProps> = ({
  selectedLeadIds,
  onSelectionChange
}) => {
  const [leads, setLeads] = useState<LeadData[]>(mockLeads);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  // Extrair cursos e status únicos para os filtros
  const uniqueCourses = Array.from(new Set(mockLeads.map(lead => lead.course))).filter(Boolean) as string[];
  const uniqueStatuses = Array.from(new Set(mockLeads.map(lead => lead.status))).filter(Boolean) as string[];
  
  // Filtrar leads com base nos critérios
  useEffect(() => {
    let filteredLeads = [...mockLeads];
    
    if (searchTerm) {
      filteredLeads = filteredLeads.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }
    
    if (courseFilter) {
      filteredLeads = filteredLeads.filter(lead => lead.course === courseFilter);
    }
    
    if (statusFilter) {
      filteredLeads = filteredLeads.filter(lead => lead.status === statusFilter);
    }
    
    setLeads(filteredLeads);
  }, [searchTerm, courseFilter, statusFilter]);
  
  // Manipular a seleção de leads
  const handleLeadToggle = (leadId: string) => {
    if (selectedLeadIds.includes(leadId)) {
      onSelectionChange(selectedLeadIds.filter(id => id !== leadId));
    } else {
      onSelectionChange([...selectedLeadIds, leadId]);
    }
  };
  
  // Selecionar/desselecionar todos
  const handleSelectAll = () => {
    if (selectedLeadIds.length === leads.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(leads.map(lead => lead.id));
    }
  };
  
  // Limpar filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setCourseFilter('');
    setStatusFilter('');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Selecionar Leads</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSelectAll}
        >
          {selectedLeadIds.length === leads.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <Input
            placeholder="Buscar por nome, email ou telefone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <Select
            value={courseFilter}
            onValueChange={setCourseFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os cursos</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os status</SelectItem>
              {uniqueStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleClearFilters}
        >
          Limpar Filtros
        </Button>
      </div>
      
      <ScrollArea className="h-[300px] border rounded-md p-2">
        <div className="space-y-2">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={`lead-${lead.id}`} 
                    checked={selectedLeadIds.includes(lead.id)}
                    onCheckedChange={() => handleLeadToggle(lead.id)}
                  />
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.course} • {lead.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100">
                    {lead.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum lead encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          {selectedLeadIds.length} lead(s) selecionado(s) de {leads.length}
        </p>
      </div>
    </div>
  );
};

export default LeadSelectionForm;
