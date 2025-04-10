
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../types/leadForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Book, BookOpen, Phone, Mail, UserCircle, CreditCard, Building2, Clock } from 'lucide-react';

interface BasicInfoFormProps {
  form: UseFormReturn<LeadFormValues>;
}

// Cursos de educação básica que exigem informações de filhos
const BASIC_EDUCATION_COURSES = [
  'Ensino Fundamental',
  'Ensino Médio',
  'Educação Infantil'
];

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

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ form }) => {
  // Detectar tipo de instituição e curso selecionado
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'course') {
        const course = value.course as string;
        const isBasicEducation = BASIC_EDUCATION_COURSES.includes(course);
        
        // Atualizar tipo de instituição
        form.setValue('institutionType', isBasicEducation ? 'school' : 'university');
        
        // Atualizar requiresChildrenInfo
        form.setValue('requiresChildrenInfo', isBasicEducation);
        
        // Se não requer informações de filhos, certificar que há pelo menos um filho vazio
        // para manter a estrutura de dados consistente
        if (!isBasicEducation && (!value.children || value.children.length === 0)) {
          form.setValue('children', []);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Determinar se é educação básica ou superior baseado no curso
  const institutionType = form.watch('institutionType');
  const selectedCourse = form.watch('course');
  const isBasicEducation = institutionType === 'school';

  return (
    <div className="space-y-4 overflow-hidden">
      {/* Tipo de Instituição */}
      <Card className="overflow-hidden">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <Building2 className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Tipo de Instituição
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <RadioGroup
            value={institutionType}
            onValueChange={(value) => {
              form.setValue('institutionType', value as 'school' | 'university');
              // Resetar curso quando muda o tipo de instituição
              form.setValue('course', '');
            }}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="school" id="school" />
              <FormLabel htmlFor="school" className="font-normal text-sm">Educação Básica</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="university" id="university" />
              <FormLabel htmlFor="university" className="font-normal text-sm">Ensino Superior</FormLabel>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Informações Pessoais */}
      <Card className="overflow-hidden">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <UserCircle className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Informações Pessoais
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 space-y-4">
          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{isBasicEducation ? 'Nome do Responsável' : 'Nome do Interessado'}</FormLabel>
                <FormControl>
                  <Input placeholder={isBasicEducation ? "Nome do responsável" : "Nome do interessado"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {isBasicEducation && (
            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Aluno</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do aluno" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    E-mail {isBasicEducation ? 'do Responsável' : ''}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="email@exemplo.com" {...field} />
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
                  <FormLabel className="flex items-center gap-1">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Telefone {isBasicEducation ? 'do Responsável' : ''}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name={isBasicEducation ? "parentCPF" : "cpf"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  CPF {isBasicEducation ? 'do Responsável' : ''}
                </FormLabel>
                <FormControl>
                  <Input placeholder="000.000.000-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {isBasicEducation && (
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="00000-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          {!isBasicEducation && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="studentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Telefone Alternativo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      E-mail Alternativo
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="email.alternativo@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Informações Acadêmicas */}
      <Card className="overflow-hidden">
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-base md:text-lg flex items-center gap-2">
            <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-primary" />
            Informações Acadêmicas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Book className="h-4 w-4 text-muted-foreground" />
                    Curso de Interesse
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um curso" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="channel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canal</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um canal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" className="bg-white">
                      <SelectItem value="Site">Site</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Indicação">Indicação</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="campus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  Unidade/Campus
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="bg-white">
                    {CAMPI.map((campus) => (
                      <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="modality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modalidade</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma modalidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" className="bg-white">
                      {MODALITIES.map((modality) => (
                        <SelectItem key={modality} value={modality}>{modality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    Período
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um período" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper" className="bg-white">
                      {PERIODS.map((period) => (
                        <SelectItem key={period} value={period}>{period}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicInfoForm;
