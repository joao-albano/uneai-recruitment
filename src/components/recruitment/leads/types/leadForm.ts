
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
  children: z.array(
    z.object({
      name: z.string().min(1, { message: "Nome do filho é obrigatório" }),
      age: z.string().min(1, { message: "Idade é obrigatória" }),
      grade: z.string().min(1, { message: "Série pretendida é obrigatória" }),
    })
  ).optional().default([]),
  // Campos adicionais
  observations: z.string().optional(),
  enrollmentIntention: z.string().optional(),
  contactTime: z.string().optional(),
  // Novo campo para indicar se o curso requer informações de filhos
  requiresChildrenInfo: z.boolean().default(false),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export type Child = {
  name: string;
  age: string;
  grade: string;
};
