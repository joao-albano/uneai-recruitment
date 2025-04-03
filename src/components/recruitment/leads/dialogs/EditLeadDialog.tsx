import React, { useState, useEffect, useCallback } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

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

function EditLeadDialog({ 
  open, 
  onOpenChange,
  lead,
  onSave
}: EditLeadDialogProps) {
  const [editedLead, setEditedLead] = useState<any>({});
  const [activeTab, setActiveTab] = useState('basic');
  const [children, setChildren] = useState<ChildData[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (lead && open) {
      const leadCopy = JSON.parse(JSON.stringify(lead));
      setEditedLead(leadCopy);
      
      if (Array.isArray(lead.children)) {
        setChildren(lead.children);
      } else if (typeof lead.children === 'number' && lead.children > 0) {
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
      const leadToSave = JSON.parse(JSON.stringify(editedLead));
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

  if (!lead && open) {
    onOpenChange(false);
    return null;
  }

  return React.createElement(
    Dialog,
    {
      open: open,
      onOpenChange: (isOpen: boolean) => {
        if (isSubmitting) return;
        onOpenChange(isOpen);
      }
    },
    React.createElement(
      DialogContent,
      {
        className: "sm:max-w-[600px] z-50 max-h-[85vh] overflow-y-auto",
        onClick: handleDialogClick
      },
      React.createElement(
        DialogHeader,
        null,
        React.createElement(DialogTitle, null, "Editar Lead"),
        React.createElement(DialogDescription, null, "Edite as informações do lead abaixo.")
      ),
      
      lead && React.createElement(
        React.Fragment,
        null,
        React.createElement(
          Tabs,
          {
            value: activeTab,
            onValueChange: setActiveTab,
            className: "mt-2"
          },
          React.createElement(
            TabsList,
            { className: "grid grid-cols-2 mb-4" },
            React.createElement(TabsTrigger, { value: "basic" }, "Informações Básicas"),
            React.createElement(TabsTrigger, { value: "children" }, "Dados dos Filhos")
          ),
          
          React.createElement(
            TabsContent,
            { value: "basic", className: "space-y-4 py-2" },
            React.createElement("div", { className: "grid grid-cols-2 gap-4" },
              React.createElement("div", { className: "space-y-2" },
                React.createElement(Label, { htmlFor: "name" }, "Nome"),
                React.createElement(Input, {
                  id: "name",
                  name: "name",
                  value: editedLead.name || '',
                  onChange: handleInputChange,
                  className: "bg-white",
                  required: true
                })
              ),
              
              React.createElement("div", { className: "space-y-2" },
                React.createElement(Label, { htmlFor: "email" }, "E-mail"),
                React.createElement(Input, {
                  id: "email",
                  name: "email",
                  type: "email",
                  value: editedLead.email || '',
                  onChange: handleInputChange,
                  className: "bg-white"
                })
              ),
              
              React.createElement("div", { className: "space-y-2" },
                React.createElement(Label, { htmlFor: "phone" }, "Telefone"),
                React.createElement(Input, {
                  id: "phone",
                  name: "phone",
                  value: editedLead.phone || '',
                  onChange: handleInputChange,
                  className: "bg-white"
                })
              ),
              
              React.createElement("div", { className: "space-y-2" },
                React.createElement(Label, { htmlFor: "course" }, "Curso de Interesse"),
                React.createElement(
                  Select,
                  {
                    value: editedLead.course || '',
                    onValueChange: (value) => handleSelectChange('course', value)
                  },
                  React.createElement(
                    SelectTrigger,
                    { id: "course", className: "bg-white" },
                    React.createElement(SelectValue, { placeholder: "Selecione um curso" })
                  ),
                  React.createElement(
                    SelectContent,
                    { position: "popper", className: "bg-white" },
                    React.createElement(SelectItem, { value: "Ensino Fundamental" }, "Ensino Fundamental"),
                    React.createElement(SelectItem, { value: "Ensino Médio" }, "Ensino Médio"),
                    React.createElement(SelectItem, { value: "Educação Infantil" }, "Educação Infantil"),
                    React.createElement(SelectItem, { value: "Graduação" }, "Graduação"),
                    React.createElement(SelectItem, { value: "Pós-Graduação" }, "Pós-Graduação"),
                    React.createElement(SelectItem, { value: "MBA" }, "MBA"),
                    React.createElement(SelectItem, { value: "Mestrado" }, "Mestrado"),
                    React.createElement(SelectItem, { value: "Doutorado" }, "Doutorado")
                  )
                )
              ),
              
              React.createElement("div", { className: "space-y-2" },
                React.createElement(Label, { htmlFor: "channel" }, "Canal"),
                React.createElement(
                  Select,
                  {
                    value: editedLead.channel || '',
                    onValueChange: (value) => handleSelectChange('channel', value)
                  },
                  React.createElement(
                    SelectTrigger,
                    { id: "channel", className: "bg-white" },
                    React.createElement(SelectValue, { placeholder: "Selecione um canal" })
                  ),
                  React.createElement(
                    SelectContent,
                    { position: "popper", className: "bg-white" },
                    React.createElement(SelectItem, { value: "Site" }, "Site"),
                    React.createElement(SelectItem, { value: "Facebook" }, "Facebook"),
                    React.createElement(SelectItem, { value: "Instagram" }, "Instagram"),
                    React.createElement(SelectItem, { value: "Google" }, "Google"),
                    React.createElement(SelectItem, { value: "WhatsApp" }, "WhatsApp"),
                    React.createElement(SelectItem, { value: "Indicação" }, "Indicação")
                  )
                )
              ),
              
              React.createElement("div", { className: "space-y-2" },
                React.createElement(Label, { htmlFor: "status" }, "Status"),
                React.createElement(
                  Select,
                  {
                    value: editedLead.status || '',
                    onValueChange: (value) => handleSelectChange('status', value)
                  },
                  React.createElement(
                    SelectTrigger,
                    { id: "status", className: "bg-white" },
                    React.createElement(SelectValue, { placeholder: "Selecione um status" })
                  ),
                  React.createElement(
                    SelectContent,
                    { position: "popper", className: "bg-white" },
                    React.createElement(SelectItem, { value: "Novo" }, "Novo"),
                    React.createElement(SelectItem, { value: "Em Andamento" }, "Em Andamento"),
                    React.createElement(SelectItem, { value: "Aguardando" }, "Aguardando"),
                    React.createElement(SelectItem, { value: "Finalizado" }, "Finalizado")
                  )
                )
              )
            ),
            
            React.createElement("div", { className: "space-y-2" },
              React.createElement(Label, { htmlFor: "notes" }, "Observações"),
              React.createElement(Textarea, {
                id: "notes",
                name: "notes",
                value: editedLead.notes || '',
                onChange: handleInputChange,
                className: "bg-white",
                rows: 3
              })
            )
          ),
          
          React.createElement(
            TabsContent,
            { value: "children", className: "space-y-4 py-2" },
            children.length === 0 ?
              React.createElement(
                "div",
                { className: "text-center p-4 bg-muted/20 rounded-md" },
                React.createElement("p", { className: "text-muted-foreground mb-4" }, "Nenhum filho cadastrado para este lead."),
                React.createElement(
                  Button,
                  { type: "button", onClick: addChild, className: "gap-1" },
                  React.createElement(Plus, { className: "h-4 w-4" }),
                  "Adicionar Filho"
                )
              ) :
              React.createElement(
                React.Fragment,
                null,
                children.map((child, index) => 
                  React.createElement(
                    "div",
                    { key: index, className: "border rounded-md p-4 relative" },
                    React.createElement(
                      "div",
                      { className: "absolute right-2 top-2" },
                      React.createElement(
                        Button,
                        {
                          type: "button",
                          variant: "ghost",
                          size: "icon",
                          onClick: () => removeChild(index)
                        },
                        React.createElement(Trash2, { className: "h-4 w-4" })
                      )
                    ),
                    
                    React.createElement("h3", { className: "font-medium mb-3" }, `Filho ${index + 1}`),
                    
                    React.createElement(
                      "div",
                      { className: "grid grid-cols-1 md:grid-cols-3 gap-4" },
                      React.createElement(
                        "div",
                        { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: `child-${index}-name` }, "Nome"),
                        React.createElement(Input, {
                          id: `child-${index}-name`,
                          value: child.name || '',
                          onChange: (e) => updateChild(index, 'name', e.target.value),
                          placeholder: "Nome do filho",
                          className: "bg-white"
                        })
                      ),
                      
                      React.createElement(
                        "div",
                        { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: `child-${index}-age` }, "Idade"),
                        React.createElement(Input, {
                          id: `child-${index}-age`,
                          value: child.age || '',
                          onChange: (e) => updateChild(index, 'age', e.target.value),
                          placeholder: "Idade",
                          className: "bg-white"
                        })
                      ),
                      
                      React.createElement(
                        "div",
                        { className: "space-y-2" },
                        React.createElement(Label, { htmlFor: `child-${index}-grade` }, "Série"),
                        React.createElement(Input, {
                          id: `child-${index}-grade`,
                          value: child.grade || '',
                          onChange: (e) => updateChild(index, 'grade', e.target.value),
                          placeholder: "Série pretendida",
                          className: "bg-white"
                        })
                      )
                    )
                  )
                ),
                
                React.createElement(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: addChild,
                    className: "w-full gap-2"
                  },
                  React.createElement(Plus, { className: "h-4 w-4" }),
                  React.createElement("span", null, "Adicionar Filho")
                )
              )
          )
        ),
        
        React.createElement(
          "div",
          { className: "flex justify-end gap-2 pt-4" },
          React.createElement(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: () => onOpenChange(false),
              disabled: isSubmitting
            },
            "Cancelar"
          ),
          React.createElement(
            Button,
            {
              type: "button",
              onClick: handleSubmit,
              disabled: isSubmitting,
              className: "bg-primary hover:bg-primary/90"
            },
            isSubmitting ? "Salvando..." : "Salvar Alterações"
          )
        )
      )
    )
  );
}

export default EditLeadDialog;
