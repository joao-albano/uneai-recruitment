
import React, { useState, useEffect } from 'react';
import { LeadData } from '@/types/recruitment/leads';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, Search, X } from 'lucide-react';

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

// Mock data for filters
const funnels = [
  { id: 'funnel1', name: 'Funil Principal' },
  { id: 'funnel2', name: 'Funil Secundário' },
];

const stages = [
  { id: 'stage1', name: 'Primeiro Contato', funnelId: 'funnel1' },
  { id: 'stage2', name: 'Negociação', funnelId: 'funnel1' },
  { id: 'stage3', name: 'Matrícula', funnelId: 'funnel2' },
];

const subStages = [
  { id: 'sub1', name: 'Interesse Inicial', stageId: 'stage1' },
  { id: 'sub2', name: 'Agendamento', stageId: 'stage1' },
  { id: 'sub3', name: 'Documentação', stageId: 'stage2' },
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
  const [selectedFunnel, setSelectedFunnel] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<string>('');
  const [selectedSubStage, setSelectedSubStage] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedModality, setSelectedModality] = useState<string>('');
  
  const uniqueCourses = Array.from(new Set(mockLeads.map(lead => lead.course))).filter(Boolean) as string[];
  const regions = ['Norte', 'Sul', 'Leste', 'Oeste', 'Centro'];
  const modalities = ['Presencial', 'EAD', 'Híbrido'];
  
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
    
    if (selectedFunnel) {
      // Aplicar filtro de funil (simulado)
      filteredLeads = filteredLeads.filter(lead => true);
    }
    
    if (selectedStage) {
      // Aplicar filtro de etapa (simulado)
      filteredLeads = filteredLeads.filter(lead => true);
    }
    
    if (selectedSubStage) {
      // Aplicar filtro de sub-etapa (simulado)
      filteredLeads = filteredLeads.filter(lead => true);
    }
    
    if (selectedCourse) {
      filteredLeads = filteredLeads.filter(lead => lead.course === selectedCourse);
    }
    
    if (selectedRegion) {
      // Aplicar filtro de região (simulado)
      filteredLeads = filteredLeads.filter(lead => true);
    }
    
    if (selectedModality) {
      // Aplicar filtro de modalidade (simulado)
      filteredLeads = filteredLeads.filter(lead => true);
    }
    
    setLeads(filteredLeads);
  }, [searchTerm, selectedFunnel, selectedStage, selectedSubStage, selectedCourse, selectedRegion, selectedModality]);
  
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
    setSelectedFunnel('');
    setSelectedStage('');
    setSelectedSubStage('');
    setSelectedCourse('');
    setSelectedRegion('');
    setSelectedModality('');
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
      
      <div className="grid grid-cols-1 gap-2">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              placeholder="Buscar por nome, email ou telefone"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
          </div>
          {Object.values([searchTerm, selectedFunnel, selectedStage, selectedSubStage, selectedCourse, selectedRegion, selectedModality]).some(Boolean) && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleClearFilters}
            >
              <X className="h-4 w-4 mr-2" />
              Limpar Filtros
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Select
            value={selectedFunnel}
            onValueChange={setSelectedFunnel}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Funil" />
            </SelectTrigger>
            <SelectContent>
              {funnels.map((funnel) => (
                <SelectItem key={funnel.id} value={funnel.id}>
                  {funnel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedStage}
            onValueChange={setSelectedStage}
            disabled={!selectedFunnel}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Etapa" />
            </SelectTrigger>
            <SelectContent>
              {stages
                .filter(stage => stage.funnelId === selectedFunnel)
                .map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>
                    {stage.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedSubStage}
            onValueChange={setSelectedSubStage}
            disabled={!selectedStage}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Sub-etapa" />
            </SelectTrigger>
            <SelectContent>
              {subStages
                .filter(subStage => subStage.stageId === selectedStage)
                .map((subStage) => (
                  <SelectItem key={subStage.id} value={subStage.id}>
                    {subStage.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Select
            value={selectedCourse}
            onValueChange={setSelectedCourse}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Curso" />
            </SelectTrigger>
            <SelectContent>
              {uniqueCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedRegion}
            onValueChange={setSelectedRegion}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Região" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={selectedModality}
            onValueChange={setSelectedModality}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Modalidade" />
            </SelectTrigger>
            <SelectContent>
              {modalities.map((modality) => (
                <SelectItem key={modality} value={modality}>
                  {modality}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
