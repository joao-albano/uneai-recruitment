
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Campaign, ChannelType } from '@/types/recruitment';
import { toast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CampaignEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign;
  onSave: (campaign: Campaign) => void;
}

type CampaignFormValues = {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  budget?: number;
  channels: ChannelType[];
  audience?: string;
  location?: string;
  courses?: string[];
  isAutomated?: boolean;
};

const CampaignEditDialog: React.FC<CampaignEditDialogProps> = ({
  open,
  onOpenChange,
  campaign,
  onSave
}) => {
  const [selectedChannels, setSelectedChannels] = useState<ChannelType[]>(campaign.channel || []);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(campaign.target?.courses || []);
  
  const form = useForm<CampaignFormValues>({
    defaultValues: {
      name: campaign.name,
      description: campaign.description || '',
      startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
      endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
      budget: campaign.budget,
      channels: campaign.channel,
      audience: campaign.target?.audience || '',
      location: campaign.target?.location || '',
      courses: campaign.target?.courses || [],
      isAutomated: campaign.isAutomated || false
    }
  });

  const toggleChannel = (channel: ChannelType) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter(c => c !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const toggleCourse = (course: string) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter(c => c !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  const handleSave = (data: CampaignFormValues) => {
    const updatedCampaign: Campaign = {
      ...campaign,
      name: data.name,
      description: data.description,
      startDate: data.startDate ? new Date(data.startDate) : new Date(),
      endDate: data.endDate ? new Date(data.endDate) : undefined,
      budget: data.budget,
      channel: selectedChannels,
      target: {
        audience: data.audience,
        location: data.location,
        courses: selectedCourses
      },
      isAutomated: data.isAutomated
    };

    onSave(updatedCampaign);
    onOpenChange(false);
    
    toast({
      title: 'Campanha atualizada',
      description: 'A campanha foi atualizada com sucesso.'
    });
  };

  // Opções de cursos para seleção
  const availableCourses = [
    'Administração', 'Direito', 'Engenharia Civil', 'Medicina', 'Pedagogia', 
    'Ciência da Computação', 'Psicologia', 'Enfermagem', 'Arquitetura'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Editar Campanha</DialogTitle>
          <DialogDescription>
            Atualize as informações da campanha "{campaign.name}"
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                <TabsTrigger value="channels">Canais</TabsTrigger>
                <TabsTrigger value="targeting">Segmentação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Campanha</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Início</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Término (opcional)</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orçamento (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          value={field.value || ""} 
                          onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isAutomated"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Campanha Automática</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Habilite para campanhas que não precisam de intervenção manual
                        </p>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="channels" className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Canais de Comunicação</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecione quais canais serão utilizados nesta campanha
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={selectedChannels.includes('mail') ? "default" : "outline"} 
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => toggleChannel('mail')}
                    >
                      <Mail className="h-3 w-3" />
                      <span>Email</span>
                    </Badge>
                    
                    <Badge 
                      variant={selectedChannels.includes('whatsapp') ? "default" : "outline"} 
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => toggleChannel('whatsapp')}
                    >
                      <MessageSquare className="h-3 w-3" />
                      <span>WhatsApp</span>
                    </Badge>
                    
                    <Badge 
                      variant={selectedChannels.includes('voice') ? "default" : "outline"} 
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => toggleChannel('voice')}
                    >
                      <Phone className="h-3 w-3" />
                      <span>Ligação de IA (Voz)</span>
                    </Badge>
                    
                    <Badge 
                      variant={selectedChannels.includes('sms') ? "default" : "outline"} 
                      className="cursor-pointer flex items-center gap-1"
                      onClick={() => toggleChannel('sms')}
                    >
                      <Send className="h-3 w-3" />
                      <span>SMS</span>
                    </Badge>
                  </div>
                  
                  {selectedChannels.length === 0 && (
                    <p className="text-sm text-red-500 mt-2">
                      Selecione pelo menos um canal de comunicação
                    </p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="targeting" className="space-y-4">
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Público-alvo</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Localização</FormLabel>
                      <FormControl>
                        <Input {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Cursos</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {availableCourses.map(course => (
                      <Badge 
                        key={course}
                        variant={selectedCourses.includes(course) ? "default" : "outline"} 
                        className="cursor-pointer"
                        onClick={() => toggleCourse(course)}
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Clique nos cursos para selecionar ou remover
                  </p>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignEditDialog;
