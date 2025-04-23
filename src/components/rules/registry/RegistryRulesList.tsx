
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Edit, AlertTriangle } from 'lucide-react';
import { RegistryRule, RegistryRuleType, RegistryResultType, AddRegistryRuleParams, UpdateRegistryRuleParams } from '@/types/registry';
import { useToast } from '@/hooks/use-toast';

interface RegistryRulesListProps {
  type: RegistryRuleType;
  rules: RegistryRule[];
  isLoading: boolean;
  onAddRule: (rule: AddRegistryRuleParams) => Promise<void>;
  onUpdateRule: (id: string, updates: UpdateRegistryRuleParams) => Promise<void>;
  onDeleteRule: (id: string) => Promise<void>;
  onToggleStatus: (id: string, status: 'active' | 'inactive') => Promise<void>;
}

const RegistryRulesList: React.FC<RegistryRulesListProps> = ({
  type,
  rules,
  isLoading,
  onAddRule,
  onUpdateRule,
  onDeleteRule,
  onToggleStatus
}) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRule, setCurrentRule] = useState<RegistryRule | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<AddRegistryRuleParams>({
    code: '',
    description: '',
    type: type,
    resultType: 'neutral',
    requiresFollowUp: false,
    automaticActions: [],
    category: ''
  });

  const resetForm = () => {
    setFormData({
      code: '',
      description: '',
      type: type,
      resultType: 'neutral',
      requiresFollowUp: false,
      automaticActions: [],
      category: ''
    });
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (rule: RegistryRule) => {
    setCurrentRule(rule);
    setFormData({
      code: rule.code,
      description: rule.description,
      type: rule.type,
      resultType: rule.resultType,
      requiresFollowUp: rule.requiresFollowUp,
      automaticActions: rule.automaticActions,
      category: rule.category
    });
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (rule: RegistryRule) => {
    setCurrentRule(rule);
    setIsDeleteDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, requiresFollowUp: checked }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddRule = async () => {
    try {
      await onAddRule(formData);
      toast({
        title: "Regra adicionada",
        description: "A regra de tabulação foi adicionada com sucesso."
      });
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: "Erro ao adicionar regra",
        description: "Houve um erro ao adicionar a regra de tabulação.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateRule = async () => {
    if (!currentRule) return;
    
    try {
      await onUpdateRule(currentRule.id, formData);
      toast({
        title: "Regra atualizada",
        description: "A regra de tabulação foi atualizada com sucesso."
      });
      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao atualizar regra",
        description: "Houve um erro ao atualizar a regra de tabulação.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteRule = async () => {
    if (!currentRule) return;
    
    try {
      await onDeleteRule(currentRule.id);
      toast({
        title: "Regra excluída",
        description: "A regra de tabulação foi excluída com sucesso."
      });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast({
        title: "Erro ao excluir regra",
        description: "Houve um erro ao excluir a regra de tabulação.",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = async (rule: RegistryRule) => {
    const newStatus = rule.status === 'active' ? 'inactive' : 'active';
    try {
      await onToggleStatus(rule.id, newStatus);
      toast({
        title: `Regra ${newStatus === 'active' ? 'ativada' : 'desativada'}`,
        description: `A regra de tabulação foi ${newStatus === 'active' ? 'ativada' : 'desativada'} com sucesso.`
      });
    } catch (error) {
      toast({
        title: "Erro ao alterar status",
        description: "Houve um erro ao alterar o status da regra.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Carregando regras de tabulação...</div>;
  }

  if (rules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed p-6">
        <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium mb-2">Nenhuma regra de tabulação encontrada</h3>
        <p className="text-gray-500 mb-4 text-center">
          Não há regras de tabulação cadastradas para {type === 'human' ? 'atendimento humano' : 'atendimento IA'}.
        </p>
        <Button onClick={handleOpenAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar regra
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Regras de Tabulação para {type === 'human' ? 'Atendimento Humano' : 'Atendimento IA'}
        </h2>
        <Button onClick={handleOpenAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar regra
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Código</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo de Resultado</TableHead>
              <TableHead>Requer Acompanhamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map(rule => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.code}</TableCell>
                <TableCell>{rule.description}</TableCell>
                <TableCell>{rule.category}</TableCell>
                <TableCell>
                  <span className={
                    rule.resultType === 'positive' ? 'text-green-600' :
                    rule.resultType === 'negative' ? 'text-red-600' : 'text-gray-600'
                  }>
                    {rule.resultType === 'positive' ? 'Positivo' :
                     rule.resultType === 'negative' ? 'Negativo' : 'Neutro'}
                  </span>
                </TableCell>
                <TableCell>{rule.requiresFollowUp ? 'Sim' : 'Não'}</TableCell>
                <TableCell>
                  <Switch
                    checked={rule.status === 'active'}
                    onCheckedChange={() => handleToggleStatus(rule)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleOpenEditDialog(rule)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleOpenDeleteDialog(rule)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Rule Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Regra de Tabulação</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="code" className="text-right">
                Código
              </Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Ex: INT"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Ex: Interessado no curso"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Categoria
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Ex: Interesse"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resultType" className="text-right">
                Tipo de Resultado
              </Label>
              <Select
                value={formData.resultType}
                onValueChange={(value) => handleSelectChange('resultType', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de resultado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positivo</SelectItem>
                  <SelectItem value="negative">Negativo</SelectItem>
                  <SelectItem value="neutral">Neutro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="requiresFollowUp" className="text-right">
                Requer Acompanhamento
              </Label>
              <div className="col-span-3 flex items-center">
                <Switch
                  id="requiresFollowUp"
                  checked={formData.requiresFollowUp}
                  onCheckedChange={handleSwitchChange}
                />
                <span className="ml-2">{formData.requiresFollowUp ? 'Sim' : 'Não'}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleAddRule}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Rule Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Regra de Tabulação</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-code" className="text-right">
                Código
              </Label>
              <Input
                id="edit-code"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Descrição
              </Label>
              <Input
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Categoria
              </Label>
              <Input
                id="edit-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-resultType" className="text-right">
                Tipo de Resultado
              </Label>
              <Select
                value={formData.resultType}
                onValueChange={(value) => handleSelectChange('resultType', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo de resultado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="positive">Positivo</SelectItem>
                  <SelectItem value="negative">Negativo</SelectItem>
                  <SelectItem value="neutral">Neutro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-requiresFollowUp" className="text-right">
                Requer Acompanhamento
              </Label>
              <div className="col-span-3 flex items-center">
                <Switch
                  id="edit-requiresFollowUp"
                  checked={formData.requiresFollowUp}
                  onCheckedChange={handleSwitchChange}
                />
                <span className="ml-2">{formData.requiresFollowUp ? 'Sim' : 'Não'}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleUpdateRule}>Atualizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Rule Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Excluir Regra de Tabulação</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza que deseja excluir a regra <strong>{currentRule?.code}</strong>?</p>
            <p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteRule}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistryRulesList;
