
import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface ChildData {
  name: string;
  age: string;
  grade: string;
}

interface EditLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
  onSave: (updatedLead: any) => void;
}

const EditLeadDialog: React.FC<EditLeadDialogProps> = ({ 
  open, 
  onOpenChange,
  lead,
  onSave
}) => {
  const [editedLead, setEditedLead] = useState<any>({});
  const [activeTab, setActiveTab] = useState('basic');
  const [children, setChildren] = useState<ChildData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Update the form when the lead changes
  useEffect(() => {
    if (lead && open) {
      // Create a deep copy to prevent accidental mutations
      const leadCopy = JSON.parse(JSON.stringify(lead));
      setEditedLead(leadCopy);
      
      // Handle children data depending on how it's structured
      if (Array.isArray(lead.children)) {
        setChildren(lead.children);
      } else if (typeof lead.children === 'number' && lead.children > 0) {
        // If we only have a count but no details, create empty children slots
        const emptyChildren = Array(lead.children).fill(0).map(() => ({
          name: "",
          age: "",
          grade: ""
        }));
        setChildren(emptyChildren);
      } else {
        setChildren([]);
      }
      
      setIsSubmitting(false);
    }
  }, [lead, open]);

  // Handle dialog clicks to prevent bubbling
  const handleDialogClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSelectChange = useCallback((name: string, value: string) => {
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Child-related functions
  const addChild = useCallback(() => {
    setChildren(prev => [...prev, { name: "", age: "", grade: "" }]);
  }, []);

  const removeChild = useCallback((index: number) => {
    setChildren(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateChild = useCallback((index: number, field: keyof ChildData, value: string) => {
    setChildren(prev => 
      prev.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    );
  }, []);

  const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!editedLead || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Create a deep copy for the save operation
      const leadToSave = JSON.parse(JSON.stringify(editedLead));
      
      // Add the children data to the lead
      leadToSave.children = children.length > 0 ? children : leadToSave.children;
      
      onSave(leadToSave);
      
      toast({
        title: "Lead atualizado",
        description: "As informações foram atualizadas com sucesso"
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [editedLead, isSubmitting, onSave, toast, onOpenChange, children]);

  // Prevent issues with null lead
  if (!lead && open) {
    onOpenChange(false);
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (isSubmitting) return;
        onOpenChange(isOpen);
      }}
    >
      <DialogContent 
        className="sm:max-w-[600px] z-50 max-h-[85vh] overflow-y-auto" 
        onClick={handleDialogClick}
      >
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
          <DialogDescription>Edite as informações do lead abaixo.</DialogDescription>
        </DialogHeader>

        {lead && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="children">Dados dos Filhos</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={editedLead.name || ''}
                    onChange={handleInputChange}
                    className="bg-white"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={editedLead.email || ''}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={editedLead.phone || ''}
                    onChange={handleInputChange}
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="course">Curso de Interesse</Label>
                  <Select
                    value={editedLead.course || ''}
                    onValueChange={(value) => handleSelectChange('course', value)}
                  >
                    <SelectTrigger id="course" className="bg-white">
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white">
                      <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                      <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                      <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                      <SelectItem value="Graduação">Graduação</SelectItem>
                      <SelectItem value="Pós-Graduação">Pós-Graduação</SelectItem>
                      <SelectItem value="MBA">MBA</SelectItem>
                      <SelectItem value="Mestrado">Mestrado</SelectItem>
                      <SelectItem value="Doutorado">Doutorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="channel">Canal</Label>
                  <Select
                    value={editedLead.channel || ''}
                    onValueChange={(value) => handleSelectChange('channel', value)}
                  >
                    <SelectTrigger id="channel" className="bg-white">
                      <SelectValue placeholder="Selecione um canal" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white">
                      <SelectItem value="Site">Site</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Indicação">Indicação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={editedLead.status || ''}
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger id="status" className="bg-white">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white">
                      <SelectItem value="Novo">Novo</SelectItem>
                      <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                      <SelectItem value="Aguardando">Aguardando</SelectItem>
                      <SelectItem value="Finalizado">Finalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Observações</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={editedLead.notes || ''}
                  onChange={handleInputChange}
                  className="bg-white"
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="children" className="space-y-4 py-2">
              {children.length === 0 ? (
                <div className="text-center p-4 bg-muted/20 rounded-md">
                  <p className="text-muted-foreground mb-4">Nenhum filho cadastrado para este lead.</p>
                  <Button type="button" onClick={addChild} className="gap-1">
                    <Plus className="h-4 w-4" />
                    Adicionar Filho
                  </Button>
                </div>
              ) : (
                <>
                  {children.map((child, index) => (
                    <div key={index} className="border rounded-md p-4 relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeChild(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h3 className="font-medium mb-3">Filho {index + 1}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`child-${index}-name`}>Nome</Label>
                          <Input
                            id={`child-${index}-name`}
                            value={child.name || ''}
                            onChange={(e) => updateChild(index, 'name', e.target.value)}
                            placeholder="Nome do filho"
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`child-${index}-age`}>Idade</Label>
                          <Input
                            id={`child-${index}-age`}
                            value={child.age || ''}
                            onChange={(e) => updateChild(index, 'age', e.target.value)}
                            placeholder="Idade"
                            className="bg-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`child-${index}-grade`}>Série</Label>
                          <Input
                            id={`child-${index}-grade`}
                            value={child.grade || ''}
                            onChange={(e) => updateChild(index, 'grade', e.target.value)}
                            placeholder="Série pretendida"
                            className="bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addChild}
                    className="w-full gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Adicionar Filho</span>
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button 
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditLeadDialog;
