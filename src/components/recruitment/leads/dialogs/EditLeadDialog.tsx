
import React, { useState, useEffect } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

// Campi disponíveis
const CAMPI = [
  'Campus Centro',
  'Campus Norte',
  'Campus Sul',
  'Campus Leste',
  'Campus Oeste'
];

// Modalidades de ensino
const MODALITIES = [
  'Presencial',
  'EAD',
  'Híbrido'
];

// Períodos
const PERIODS = [
  'Matutino',
  'Vespertino',
  'Noturno',
  'Integral'
];

// Cursos de educação básica
const BASIC_EDUCATION_COURSES = [
  'Ensino Fundamental',
  'Ensino Médio',
  'Educação Infantil'
];

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
  const [institutionType, setInstitutionType] = useState<'school' | 'university'>('school');
  const { toast } = useToast();

  useEffect(() => {
    if (lead && open) {
      const leadCopy = JSON.parse(JSON.stringify(lead));
      setEditedLead(leadCopy);
      
      // Determinar o tipo de instituição baseado no curso ou no campo institutionType
      const isBasicEducation = leadCopy.institutionType === 'school' || 
                              BASIC_EDUCATION_COURSES.includes(leadCopy.course);
      setInstitutionType(isBasicEducation ? 'school' : 'university');
      
      if (Array.isArray(lead.children)) {
        setChildren(lead.children);
      } else if (typeof lead.children === 'number' && lead.children > 0) {
        // First check if there's a _childrenData field with actual data
        if (lead._childrenData && Array.isArray(lead._childrenData)) {
          setChildren(lead._childrenData);
        } else {
          const emptyChildren = Array(lead.children).fill(0).map(() => ({
            name: "",
            age: "",
            grade: ""
          }));
          setChildren(emptyChildren);
        }
      } else {
        setChildren([]);
      }
      
      setIsSubmitting(false);
    }
  }, [lead, open]);

  const handleDialogClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEditedLead(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Se o campo for curso, atualizar o tipo de instituição
    if (name === 'course') {
      const isBasicEducation = BASIC_EDUCATION_COURSES.includes(value);
      setInstitutionType(isBasicEducation ? 'school' : 'university');
    }
  };

  const handleInstitutionTypeChange = (value: 'school' | 'university') => {
    setInstitutionType(value);
    setEditedLead(prev => ({
      ...prev,
      institutionType: value
    }));
  };

  const addChild = () => {
    setChildren(prev => [...prev, { name: "", age: "", grade: "" }]);
  };

  const removeChild = (index: number) => {
    setChildren(prev => prev.filter((_, i) => i !== index));
  };

  const updateChild = (index: number, field: keyof ChildData, value: string) => {
    setChildren(prev => 
      prev.map((child, i) => 
        i === index ? { ...child, [field]: value } : child
      )
    );
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!editedLead || isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const leadToSave = JSON.parse(JSON.stringify(editedLead));
      
      // Store the children data directly
      leadToSave.children = children.length;
      leadToSave._childrenData = children;
      
      // Assegurar que o tipo de instituição está correto
      leadToSave.institutionType = institutionType;
      
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
  };

  if (!lead && open) {
    onOpenChange(false);
    return null;
  }
  
  const isBasicEducation = institutionType === 'school';
  
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen: boolean) => {
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
          <>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-2"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                <TabsTrigger value="children">Dados dos Filhos</TabsTrigger>
                <TabsTrigger value="additional">Informações Adicionais</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4 py-2">
                <div className="space-y-2 mb-4">
                  <Label>Tipo de Instituição</Label>
                  <RadioGroup 
                    value={institutionType} 
                    onValueChange={(value) => handleInstitutionTypeChange(value as 'school' | 'university')}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="school" id="edit-school" />
                      <Label htmlFor="edit-school" className="font-normal">Educação Básica</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="university" id="edit-university" />
                      <Label htmlFor="edit-university" className="font-normal">Ensino Superior</Label>
                    </div>
                  </RadioGroup>
                </div>
              
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {isBasicEducation ? 'Nome do Responsável' : 'Nome do Interessado'}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={editedLead.name || ''}
                      onChange={handleInputChange}
                      className="bg-white"
                      required
                    />
                  </div>
                  
                  {isBasicEducation && (
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Nome do Aluno</Label>
                      <Input
                        id="studentName"
                        name="studentName"
                        value={editedLead.studentName || ''}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail {isBasicEducation ? 'do Responsável' : ''}</Label>
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
                    <Label htmlFor="phone">Telefone {isBasicEducation ? 'do Responsável' : ''}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={editedLead.phone || ''}
                      onChange={handleInputChange}
                      className="bg-white"
                    />
                  </div>
                </div>
                
                {isBasicEducation ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentCPF">CPF do Responsável</Label>
                      <Input
                        id="parentCPF"
                        name="parentCPF"
                        value={editedLead.parentCPF || ''}
                        onChange={handleInputChange}
                        placeholder="000.000.000-00"
                        className="bg-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">E-mail Alternativo</Label>
                      <Input
                        id="parentEmail"
                        name="parentEmail"
                        value={editedLead.parentEmail || ''}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        name="cpf"
                        value={editedLead.cpf || ''}
                        onChange={handleInputChange}
                        placeholder="000.000.000-00"
                        className="bg-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="studentEmail">E-mail Alternativo</Label>
                      <Input
                        id="studentEmail"
                        name="studentEmail"
                        value={editedLead.studentEmail || ''}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                  </div>
                )}
                
                {!isBasicEducation && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentPhone">Telefone Alternativo</Label>
                      <Input
                        id="studentPhone"
                        name="studentPhone"
                        value={editedLead.studentPhone || ''}
                        onChange={handleInputChange}
                        className="bg-white"
                      />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
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
                        {isBasicEducation ? (
                          <>
                            <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                            <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                            <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="Administração">Administração</SelectItem>
                            <SelectItem value="Direito">Direito</SelectItem>
                            <SelectItem value="Engenharia">Engenharia</SelectItem>
                            <SelectItem value="Medicina">Medicina</SelectItem>
                            <SelectItem value="Pedagogia">Pedagogia</SelectItem>
                            <SelectItem value="Psicologia">Psicologia</SelectItem>
                            <SelectItem value="Ciência da Computação">Ciência da Computação</SelectItem>
                            <SelectItem value="MBA">MBA</SelectItem>
                            <SelectItem value="Mestrado">Mestrado</SelectItem>
                            <SelectItem value="Doutorado">Doutorado</SelectItem>
                          </>
                        )}
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campus">Unidade/Campus</Label>
                  <Select
                    value={editedLead.campus || ''}
                    onValueChange={(value) => handleSelectChange('campus', value)}
                  >
                    <SelectTrigger id="campus" className="bg-white">
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white">
                      {CAMPI.map(campus => (
                        <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {!isBasicEducation && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="modality">Modalidade</Label>
                      <Select
                        value={editedLead.modality || ''}
                        onValueChange={(value) => handleSelectChange('modality', value)}
                      >
                        <SelectTrigger id="modality" className="bg-white">
                          <SelectValue placeholder="Selecione uma modalidade" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-white">
                          {MODALITIES.map(modality => (
                            <SelectItem key={modality} value={modality}>{modality}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="period">Período</Label>
                      <Select
                        value={editedLead.period || ''}
                        onValueChange={(value) => handleSelectChange('period', value)}
                      >
                        <SelectTrigger id="period" className="bg-white">
                          <SelectValue placeholder="Selecione um período" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-white">
                          {PERIODS.map(period => (
                            <SelectItem key={period} value={period}>{period}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
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
                {!isBasicEducation ? (
                  <div className="text-center p-6 bg-muted/10 rounded-md">
                    <p className="text-muted-foreground">
                      Informações sobre filhos são relevantes apenas para Educação Básica.
                    </p>
                  </div>
                ) : children.length === 0 ? (
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
                        
                        <h3 className="font-medium mb-3">{`Filho ${index + 1}`}</h3>
                        
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
              
              <TabsContent value="additional" className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="enrollmentIntention">Intenção de Matrícula</Label>
                    <Select
                      value={editedLead.enrollmentIntention || ''}
                      onValueChange={(value) => handleSelectChange('enrollmentIntention', value)}
                    >
                      <SelectTrigger id="enrollmentIntention" className="bg-white">
                        <SelectValue placeholder="Selecione uma intenção" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="indefinida">Indefinida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactTime">Melhor Horário para Contato</Label>
                    <Select
                      value={editedLead.contactTime || ''}
                      onValueChange={(value) => handleSelectChange('contactTime', value)}
                    >
                      <SelectTrigger id="contactTime" className="bg-white">
                        <SelectValue placeholder="Selecione um horário" />
                      </SelectTrigger>
                      <SelectContent position="popper" className="bg-white">
                        <SelectItem value="manha">Manhã</SelectItem>
                        <SelectItem value="tarde">Tarde</SelectItem>
                        <SelectItem value="noite">Noite</SelectItem>
                        <SelectItem value="qualquer">Qualquer horário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EditLeadDialog;
