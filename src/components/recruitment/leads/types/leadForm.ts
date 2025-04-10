
import { z } from 'zod';

// Schema de validação para o formulário de lead
export const leadFormSchema = z.object({
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
  
  // Campos adicionais para controle de importação
  campus: z.string().optional(),
  modality: z.string().optional(),
  period: z.string().optional(),
  cpf: z.string().optional(),
  
  // Separar campos de aluno e responsável para maior claridade
  studentName: z.string().optional(), // Nome do aluno (para educação básica)
  studentPhone: z.string().optional(), // Telefone do aluno (para ensino superior)
  studentEmail: z.string().optional(), // Email do aluno (para ensino superior)
  parentCPF: z.string().optional(), // CPF do responsável (para educação básica)
  parentEmail: z.string().optional(), // Email alternativo do responsável

  // Campos existentes
  children: z.array(
    z.object({
      name: z.string().min(1, { message: "Nome do filho é obrigatório" }),
      age: z.string().min(1, { message: "Idade é obrigatória" }),
      grade: z.string().min(1, { message: "Série pretendida é obrigatória" }),
    })
  ).optional().default([]),
  observations: z.string().optional(),
  enrollmentIntention: z.string().optional(),
  contactTime: z.string().optional(),
  requiresChildrenInfo: z.boolean().default(false),
  
  // Campo para indicar o tipo de instituição
  institutionType: z.enum(['school', 'university']).default('school'),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export type Child = {
  name: string;
  age: string;
  grade: string;
};
