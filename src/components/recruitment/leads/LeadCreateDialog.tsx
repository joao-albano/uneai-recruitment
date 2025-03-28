
import React from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, Trash2 } from 'lucide-react';

interface LeadCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Schema de validação para o formulário de lead
const leadFormSchema = z.object({
  parentName: z.string().min(3, {
    message: "Nome deve conter no mínimo 3 caracteres",
  }),
  email: z.string().email({
    message: "Informe um e-mail válido",
  }),
  phone: z.string().min(10, {
    message: "Informe um telefone válido",
  }),
  channel: z.string({
    required_error: "Selecione um canal",
  }),
  course: z.string({
    required_error: "Selecione um curso",
  }),
  status: z.string().default("Novo"),
  children: z.array(
    z.object({
      name: z.string().min(1, { message: "Nome do filho é obrigatório" }),
      age: z.string().min(1, { message: "Idade é obrigatória" }),
      grade: z.string().min(1, { message: "Série pretendida é obrigatória" }),
    })
  ).min(1, { message: "Adicione pelo menos um filho" }),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

const LeadCreateDialog: React.FC<LeadCreateDialogProps> = ({ open, onOpenChange }) => {
  // Configuração do formulário com react-hook-form
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      channel: "",
      course: "",
      status: "Novo",
      children: [
        { name: "", age: "", grade: "" }
      ],
    },
  });

  // Adicionar um novo filho ao formulário
  const addChild = () => {
    const currentChildren = form.getValues().children;
    form.setValue("children", [
      ...currentChildren,
      { name: "", age: "", grade: "" }
    ]);
  };

  // Remover um filho do formulário
  const removeChild = (index: number) => {
    const currentChildren = form.getValues().children;
    if (currentChildren.length > 1) {
      form.setValue("children", currentChildren.filter((_, i) => i !== index));
    }
  };

  // Função chamada ao submeter o formulário
  const onSubmit = (data: LeadFormValues) => {
    console.log(data);
    onOpenChange(false);
    // Aqui você implementaria a lógica para salvar o lead
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Lead</DialogTitle>
          <DialogDescription>
            Preencha as informações do lead para iniciar o processo de captação
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
                <TabsTrigger value="children">Filhos</TabsTrigger>
                <TabsTrigger value="additional">Informações Adicionais</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Responsável</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(00) 00000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="channel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Canal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o canal" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Site">Site</SelectItem>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="Google">Google</SelectItem>
                            <SelectItem value="Indicação">Indicação</SelectItem>
                            <SelectItem value="Outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Curso de Interesse</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o curso" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                            <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                            <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                            <SelectItem value="Técnico">Técnico</SelectItem>
                            <SelectItem value="Graduação">Graduação</SelectItem>
                            <SelectItem value="Pós-Graduação">Pós-Graduação</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="children" className="py-4">
                <div className="space-y-4">
                  {form.watch("children").map((_, index) => (
                    <div key={index} className="border rounded-md p-4 relative">
                      <div className="absolute right-2 top-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeChild(index)}
                          disabled={form.watch("children").length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <h3 className="font-medium mb-3">Filho {index + 1}</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`children.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome do filho" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`children.${index}.age`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Idade</FormLabel>
                              <FormControl>
                                <Input placeholder="Idade" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`children.${index}.grade`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Série Pretendida</FormLabel>
                              <FormControl>
                                <Input placeholder="Série pretendida" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                </div>
              </TabsContent>

              <TabsContent value="additional" className="py-4">
                <div className="space-y-4">
                  <div>
                    <Label>Observações</Label>
                    <textarea 
                      className="w-full border rounded-md p-2 mt-1 h-24 resize-y"
                      placeholder="Informações adicionais sobre o lead..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Intenção de Matrícula</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a intenção" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="alta">Alta</SelectItem>
                          <SelectItem value="media">Média</SelectItem>
                          <SelectItem value="baixa">Baixa</SelectItem>
                          <SelectItem value="indefinida">Indefinida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Melhor Horário para Contato</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manha">Manhã</SelectItem>
                          <SelectItem value="tarde">Tarde</SelectItem>
                          <SelectItem value="noite">Noite</SelectItem>
                          <SelectItem value="qualquer">Qualquer horário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">Salvar Lead</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCreateDialog;
