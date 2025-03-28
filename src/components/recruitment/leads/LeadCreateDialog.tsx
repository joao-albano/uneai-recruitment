
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { ChannelType, LeadStatus } from '@/types/recruitment';

interface LeadCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LeadCreateDialog: React.FC<LeadCreateDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('manual');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    channel: '' as ChannelType,
    course: '',
    children: '',
    location: '',
    notes: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    
    // Aqui faria a integração com a API para criar o lead
    console.log('Criando lead:', formData);
    
    toast({
      title: "Lead criado com sucesso!",
      description: `${formData.name} foi adicionado ao sistema.`,
    });
    
    // Resetar formulário e fechar diálogo
    setFormData({
      name: '',
      email: '',
      phone: '',
      channel: '' as ChannelType,
      course: '',
      children: '',
      location: '',
      notes: '',
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Lead</DialogTitle>
          <DialogDescription>
            Cadastre um novo contato interessado na instituição.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Cadastro Manual</TabsTrigger>
            <TabsTrigger value="import">Importação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nome do lead"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@exemplo.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="channel">Canal de Origem *</Label>
                    <Select 
                      value={formData.channel} 
                      onValueChange={(value) => handleSelectChange('channel', value)}
                    >
                      <SelectTrigger id="channel">
                        <SelectValue placeholder="Selecione um canal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="site">Site</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="indicacao">Indicação</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="eventos">Eventos</SelectItem>
                        <SelectItem value="presencial">Presencial</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="course">Curso de Interesse</Label>
                    <Select 
                      value={formData.course} 
                      onValueChange={(value) => handleSelectChange('course', value)}
                    >
                      <SelectTrigger id="course">
                        <SelectValue placeholder="Selecione um curso" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educacao-infantil">Educação Infantil</SelectItem>
                        <SelectItem value="ensino-fundamental-1">Ensino Fundamental I</SelectItem>
                        <SelectItem value="ensino-fundamental-2">Ensino Fundamental II</SelectItem>
                        <SelectItem value="ensino-medio">Ensino Médio</SelectItem>
                        <SelectItem value="ensino-tecnico">Ensino Técnico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="children">Número de Filhos</Label>
                    <Input
                      id="children"
                      name="children"
                      type="number"
                      value={formData.children}
                      onChange={handleInputChange}
                      placeholder="Qtd. de filhos"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Localização/Região</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Ex: Zona Sul, Centro, etc."
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Informações adicionais relevantes"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar Lead</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="import">
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="mx-auto w-full max-w-sm">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Arraste um arquivo CSV ou Excel
                    </p>
                    <Button variant="outline" size="sm">Selecionar Arquivo</Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    O arquivo deve conter as colunas: nome, email, telefone e canal (obrigatórias).
                    Outras colunas opcionais: curso, filhos, localização, observações.
                  </p>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    Baixar Modelo
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button disabled>Processar Importação</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCreateDialog;
