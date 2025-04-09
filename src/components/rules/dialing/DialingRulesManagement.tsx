
import React, { useState } from 'react';
import { Plus, Phone, Edit, Trash2, MoreHorizontal, Power, PowerOff } from 'lucide-react';
import { useDialingRules } from '@/hooks/useDialingRules';
import { DialingRule } from '@/types/voicecall';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import DialingRuleForm from './DialingRuleForm';
import { useIsMobile } from '@/hooks/use-mobile';
import DeleteRuleDialog from './DeleteRuleDialog';

const DialingRulesManagement: React.FC = () => {
  const { rules, loading, addRule, updateRule, deleteRule, toggleRuleStatus, defaultRedialIntervals } = useDialingRules();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<DialingRule | null>(null);
  const isMobile = useIsMobile();

  const handleAddRule = (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    const success = addRule(rule);
    if (success) {
      setIsAddDialogOpen(false);
    }
  };

  const handleEditRule = (rule: Omit<DialingRule, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedRule) {
      const success = updateRule(selectedRule.id, rule);
      if (success) {
        setIsEditDialogOpen(false);
        setSelectedRule(null);
      }
    }
  };

  const handleDeleteRule = () => {
    if (selectedRule) {
      const success = deleteRule(selectedRule.id);
      if (success) {
        setIsDeleteDialogOpen(false);
        setSelectedRule(null);
      }
    }
  };

  const openEditDialog = (rule: DialingRule) => {
    setSelectedRule(rule);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (rule: DialingRule) => {
    setSelectedRule(rule);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleStatus = (rule: DialingRule) => {
    toggleRuleStatus(rule.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Regras de Discagem</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Regra
        </Button>
      </div>

      {rules.length === 0 ? (
        <Card className="w-full">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <Phone className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma regra de discagem</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Configure regras para automatizar suas campanhas de discagem.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeira Regra
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <ScrollArea className={isMobile ? "h-[450px]" : "max-h-[600px]"}>
            <CardContent className="p-0">
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
                      <TableCell className="font-medium">{rule.name}</TableCell>
                      <TableCell>
                        <Badge variant={rule.enabled ? "success" : "secondary"}>
                          {rule.enabled ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>{rule.simultaneousChannels}</TableCell>
                      <TableCell>{`${rule.startTime} - ${rule.endTime}`}</TableCell>
                      <TableCell>{format(new Date(rule.createdAt), 'dd/MM/yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Ações</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(rule)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleToggleStatus(rule)}>
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
                            <DropdownMenuItem onClick={() => openDeleteDialog(rule)} className="text-destructive">
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
            </CardContent>
          </ScrollArea>
        </Card>
      )}

      <Alert>
        <AlertDescription>
          As regras de discagem controlam quando e como as ligações automáticas são realizadas. 
          Você pode configurar o número de canais simultâneos, horários permitidos e intervalos 
          de rediscagem para diferentes situações de falha.
        </AlertDescription>
      </Alert>

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className={`${isMobile ? 'w-[95%] max-h-[90vh] overflow-y-auto' : 'max-w-3xl max-h-[90vh] overflow-y-auto'}`}>
          <DialogHeader>
            <DialogTitle>Nova Regra de Discagem</DialogTitle>
            <DialogDescription>
              Configure os parâmetros da nova regra de discagem automática.
            </DialogDescription>
          </DialogHeader>
          <DialingRuleForm 
            onSubmit={handleAddRule} 
            onCancel={() => setIsAddDialogOpen(false)}
            defaultRedialIntervals={defaultRedialIntervals}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className={`${isMobile ? 'w-[95%] max-h-[90vh] overflow-y-auto' : 'max-w-3xl max-h-[90vh] overflow-y-auto'}`}>
          <DialogHeader>
            <DialogTitle>Editar Regra de Discagem</DialogTitle>
            <DialogDescription>
              Atualize os parâmetros da regra de discagem.
            </DialogDescription>
          </DialogHeader>
          {selectedRule && (
            <DialingRuleForm 
              initialData={selectedRule}
              onSubmit={handleEditRule} 
              onCancel={() => setIsEditDialogOpen(false)}
              defaultRedialIntervals={defaultRedialIntervals}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteRuleDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteRule}
        ruleName={selectedRule?.name || ''}
      />
    </div>
  );
};

export default DialingRulesManagement;
