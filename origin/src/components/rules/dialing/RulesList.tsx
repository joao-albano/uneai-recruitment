
import React from 'react';
import { Edit, Trash2, MoreHorizontal, Power, PowerOff, Loader2, Layers } from 'lucide-react';
import { DialingRule } from '@/types/voicecall';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface RulesListProps {
  rules: DialingRule[];
  isMobile: boolean;
  onEditRule: (rule: DialingRule) => void;
  onDeleteRule: (rule: DialingRule) => void;
  onToggleStatus: (rule: DialingRule) => void;
  isLoading?: boolean;
}

const RulesList: React.FC<RulesListProps> = ({
  rules,
  isMobile,
  onEditRule,
  onDeleteRule,
  onToggleStatus,
  isLoading = false
}) => {
  // Função para renderizar o ícone de segmentação e tooltip
  const renderSegmentationBadge = (rule: DialingRule) => {
    const hasSegmentation = rule.segmentation && (
      (rule.segmentation.courseIds && rule.segmentation.courseIds.length > 0) ||
      (rule.segmentation.funnelIds && rule.segmentation.funnelIds.length > 0) ||
      (rule.segmentation.funnelStageIds && rule.segmentation.funnelStageIds.length > 0)
    );

    if (!hasSegmentation) return null;

    // Contar itens de segmentação para o badge
    const coursesCount = rule.segmentation?.courseIds?.length || 0;
    const funnelsCount = rule.segmentation?.funnelIds?.length || 0;
    const stagesCount = rule.segmentation?.funnelStageIds?.length || 0;
    
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="ml-2 cursor-help">
              <Layers className="h-3 w-3 mr-1" />
              <span>Segmentada</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs">
              {coursesCount > 0 && (
                <div>Cursos: {coursesCount}</div>
              )}
              {funnelsCount > 0 && (
                <div>Funis: {funnelsCount}</div>
              )}
              {stagesCount > 0 && (
                <div>Etapas: {stagesCount}</div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="relative">
      <ScrollArea className={isMobile ? "h-[450px]" : "max-h-[600px]"}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Nome</TableHead>
              <TableHead className="w-1/6">Status</TableHead>
              <TableHead className="w-1/6">Canais</TableHead>
              <TableHead className="w-1/6">Horário</TableHead>
              <TableHead className="w-1/6">Criação</TableHead>
              <TableHead className="w-1/12 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {rule.name}
                    {renderSegmentationBadge(rule)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={rule.enabled ? "secondary" : "outline"} className={rule.enabled ? "bg-green-500 hover:bg-green-600 text-white" : ""}>
                    {rule.enabled ? 'Ativo' : 'Inativo'}
                  </Badge>
                </TableCell>
                <TableCell>{rule.simultaneousChannels}</TableCell>
                <TableCell>{`${rule.startTime} - ${rule.endTime}`}</TableCell>
                <TableCell>{format(new Date(rule.createdAt), 'dd/MM/yyyy')}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild disabled={isLoading}>
                      <Button variant="ghost" size="icon" className={isLoading ? "cursor-not-allowed opacity-50" : ""}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Ações</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditRule(rule)} disabled={isLoading}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onToggleStatus(rule)} disabled={isLoading}>
                        {rule.enabled ? (
                          <>
                            <PowerOff className="mr-2 h-4 w-4" />
                            Desativar
                          </>
                        ) : (
                          <>
                            <Power className="mr-2 h-4 w-4" />
                            Ativar
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteRule(rule)} className="text-destructive" disabled={isLoading}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      
      {isLoading && (
        <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span>Processando...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesList;
