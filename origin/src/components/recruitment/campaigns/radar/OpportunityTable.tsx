
import React from 'react';
import OpportunityItem from './OpportunityItem';
import { Button } from '@/components/ui/button';
import { 
  Filter,
  Download, 
  BarChart,
  Target 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { OpportunityItem as OpportunityItemType } from '@/types/recruitment';

interface OpportunityTableProps {
  opportunities: OpportunityItemType[];
  filteredOpportunities: OpportunityItemType[];
  filter: 'all' | 'course' | 'location' | 'interest';
  setFilter: (filter: 'all' | 'course' | 'location' | 'interest') => void;
  onCreateCampaign: (item: OpportunityItemType) => void;
  onDetailedAnalysis: () => void;
}

const OpportunityTable: React.FC<OpportunityTableProps> = ({
  opportunities,
  filteredOpportunities,
  filter,
  setFilter,
  onCreateCampaign,
  onDetailedAnalysis
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" /> Radar de Oportunidades Acadêmicas
            </CardTitle>
            <CardDescription>
              Análise de intenções não atendidas e oportunidades de captação
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filtrar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Tipo de Oportunidade</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  Todas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('course')}>
                  Cursos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('location')}>
                  Localidades
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('interest')}>
                  Interesses
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              <span>Exportar</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr className="text-sm">
                <th className="font-medium text-left px-4 py-3">Oportunidade</th>
                <th className="font-medium text-left px-4 py-3">Tipo</th>
                <th className="font-medium text-left px-4 py-3">Leads</th>
                <th className="font-medium text-left px-4 py-3">Tendência</th>
                <th className="font-medium text-left px-4 py-3">Urgência</th>
                <th className="font-medium text-right px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredOpportunities.map(item => (
                <OpportunityItem 
                  key={item.id}
                  item={item}
                  onCreateCampaign={onCreateCampaign}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between px-6 py-4 border-t">
        <p className="text-sm text-muted-foreground">
          Exibindo {filteredOpportunities.length} de {opportunities.length} oportunidades
        </p>
        
        <Button variant="link" size="sm" className="gap-1" onClick={onDetailedAnalysis}>
          <BarChart className="h-3.5 w-3.5" />
          <span>Ver Análise Detalhada</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpportunityTable;
