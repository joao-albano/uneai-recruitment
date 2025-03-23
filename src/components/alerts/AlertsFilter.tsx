
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';

interface AlertsFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterTypes: Record<string, boolean>;
  setFilterTypes: (value: Record<string, boolean>) => void;
}

const AlertsFilter: React.FC<AlertsFilterProps> = ({ 
  searchTerm, 
  setSearchTerm, 
  filterTypes, 
  setFilterTypes 
}) => {
  // Helper function to update a single filter type
  const updateFilterType = (key: string, checked: boolean) => {
    const newFilterTypes = { ...filterTypes, [key]: checked };
    setFilterTypes(newFilterTypes);
  };

  return (
    <Card className="shadow-md mb-8">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por aluno ou conteúdo do alerta..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Tipo de Alerta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterTypes['high-risk']}
                onCheckedChange={(checked) => 
                  updateFilterType('high-risk', checked as boolean)
                }
              >
                Alto Risco
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterTypes['medium-risk']}
                onCheckedChange={(checked) => 
                  updateFilterType('medium-risk', checked as boolean)
                }
              >
                Médio Risco
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterTypes['low-risk']}
                onCheckedChange={(checked) => 
                  updateFilterType('low-risk', checked as boolean)
                }
              >
                Baixo Risco
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterTypes['survey-requested']}
                onCheckedChange={(checked) => 
                  updateFilterType('survey-requested', checked as boolean)
                }
              >
                Pesquisa Solicitada
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterTypes['meeting-scheduled']}
                onCheckedChange={(checked) => 
                  updateFilterType('meeting-scheduled', checked as boolean)
                }
              >
                Atendimento Agendado
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsFilter;
