
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ConversationFiltersDialogProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const ConversationFiltersDialog: React.FC<ConversationFiltersDialogProps> = ({
  open,
  onClose,
  onApplyFilters
}) => {
  const [filters, setFilters] = useState({
    status: [] as string[],
    courses: [] as string[],
    dateRange: {
      start: '',
      end: ''
    },
    assignedTo: '',
    emotions: [] as string[],
    intents: [] as string[],
    objections: [] as string[],
    hasUnread: false
  });

  const handleCheckboxChange = (group: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[group as keyof typeof prev] as string[];
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [group]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [group]: [...currentValues, value]
        };
      }
    });
  };

  const removeFilter = (group: string, value: string) => {
    setFilters(prev => {
      const currentValues = prev[group as keyof typeof prev] as string[];
      return {
        ...prev,
        [group]: currentValues.filter(v => v !== value)
      };
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      status: [],
      courses: [],
      dateRange: {
        start: '',
        end: ''
      },
      assignedTo: '',
      emotions: [],
      intents: [],
      objections: [],
      hasUnread: false
    });
  };

  // Count active filters
  const activeFiltersCount = [
    filters.status.length,
    filters.courses.length,
    filters.emotions.length,
    filters.intents.length,
    filters.objections.length,
    filters.assignedTo ? 1 : 0,
    filters.hasUnread ? 1 : 0,
    filters.dateRange.start || filters.dateRange.end ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filtros de Conversas</DialogTitle>
          <DialogDescription>
            Filtre as conversas por diversos critérios
          </DialogDescription>
        </DialogHeader>

        {activeFiltersCount > 0 && (
          <div className="mb-4">
            <Label className="text-sm mb-2 block">Filtros ativos</Label>
            <div className="flex flex-wrap gap-2">
              {filters.status.map(status => (
                <Badge key={status} variant="outline" className="px-2 py-1">
                  {status}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => removeFilter('status', status)}
                  />
                </Badge>
              ))}
              {filters.courses.map(course => (
                <Badge key={course} variant="outline" className="px-2 py-1">
                  Curso: {course}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => removeFilter('courses', course)}
                  />
                </Badge>
              ))}
              {/* Add more filter badges here */}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm mb-2 block">Status</Label>
            <div className="space-y-2">
              {['active', 'waiting', 'closed'].map(status => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`status-${status}`} 
                    checked={filters.status.includes(status)}
                    onCheckedChange={(checked) => {
                      if (checked) handleCheckboxChange('status', status);
                      else removeFilter('status', status);
                    }}
                  />
                  <Label htmlFor={`status-${status}`} className="capitalize">
                    {status === 'active' ? 'Ativo' : 
                     status === 'waiting' ? 'Aguardando' : 'Encerrado'}
                  </Label>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <Label className="text-sm mb-2 block">Cursos</Label>
            <div className="space-y-2">
              {['Psicologia', 'Administração', 'Direito', 'Medicina', 'Engenharia'].map(course => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`course-${course}`} 
                    checked={filters.courses.includes(course)}
                    onCheckedChange={(checked) => {
                      if (checked) handleCheckboxChange('courses', course);
                      else removeFilter('courses', course);
                    }}
                  />
                  <Label htmlFor={`course-${course}`}>{course}</Label>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <Label className="text-sm mb-2 block">Período</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="date-start" className="text-xs">De</Label>
                <Input 
                  id="date-start" 
                  type="date" 
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange,
                      start: e.target.value
                    }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="date-end" className="text-xs">Até</Label>
                <Input 
                  id="date-end" 
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange,
                      end: e.target.value
                    }
                  }))}
                />
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm mb-2 block">Atendente</Label>
            <Select 
              value={filters.assignedTo} 
              onValueChange={(value) => setFilters(prev => ({
                ...prev,
                assignedTo: value
              }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um atendente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="juliana">Juliana Oliveira</SelectItem>
                <SelectItem value="roberto">Roberto Santos</SelectItem>
                <SelectItem value="amanda">Amanda Costa</SelectItem>
                <SelectItem value="ai">Atendimento IA</SelectItem>
              </SelectContent>
            </Select>

            <Separator className="my-4" />

            <Label className="text-sm mb-2 block">Emoções</Label>
            <div className="space-y-2">
              {['positivo', 'negativo', 'interessado', 'confuso', 'hesitante', 'entusiasmado'].map(emotion => (
                <div key={emotion} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`emotion-${emotion}`} 
                    checked={filters.emotions.includes(emotion)}
                    onCheckedChange={(checked) => {
                      if (checked) handleCheckboxChange('emotions', emotion);
                      else removeFilter('emotions', emotion);
                    }}
                  />
                  <Label htmlFor={`emotion-${emotion}`} className="capitalize">{emotion}</Label>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex items-center space-x-2 mt-4">
              <Checkbox 
                id="has-unread" 
                checked={filters.hasUnread}
                onCheckedChange={(checked) => setFilters(prev => ({
                  ...prev,
                  hasUnread: !!checked
                }))}
              />
              <Label htmlFor="has-unread">Apenas conversas não lidas</Label>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleReset}>Limpar filtros</Button>
          <Button onClick={handleApply}>Aplicar filtros</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConversationFiltersDialog;
