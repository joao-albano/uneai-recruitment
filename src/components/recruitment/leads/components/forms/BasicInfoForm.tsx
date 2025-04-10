
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2">
        <div className="space-y-2">
          <span className="text-sm font-medium">Tipo de Instituição</span>
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
              <FormLabel htmlFor="school" className="font-normal">Educação Básica</FormLabel>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="university" id="university" />
              <FormLabel htmlFor="university" className="font-normal">Ensino Superior</FormLabel>
            </div>
          </RadioGroup>
        </div>
      </div>

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
              <FormLabel>E-mail {isBasicEducation ? 'do Responsável' : 'do Interessado'}</FormLabel>
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
              <FormLabel>Telefone {isBasicEducation ? 'do Responsável' : 'do Interessado'}</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {!isBasicEducation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input placeholder="000.000.000-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      
      {isBasicEducation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="parentCPF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF do Responsável</FormLabel>
                <FormControl>
                  <Input placeholder="000.000.000-00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="parentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail Alternativo</FormLabel>
                <FormControl>
                  <Input placeholder="email.alternativo@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      
      {!isBasicEducation && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="studentPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone Alternativo</FormLabel>
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
                <FormLabel>E-mail Alternativo</FormLabel>
                <FormControl>
                  <Input placeholder="email.alternativo@exemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso de Interesse</FormLabel>
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
                <SelectContent>
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
                <SelectContent>
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
            <FormLabel>Unidade/Campus</FormLabel>
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
              <SelectContent>
                {CAMPI.map((campus) => (
                  <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {!isBasicEducation && (
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
                  <SelectContent>
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
                <FormLabel>Período</FormLabel>
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
                  <SelectContent>
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
      )}
    </div>
  );
};

export default BasicInfoForm;
