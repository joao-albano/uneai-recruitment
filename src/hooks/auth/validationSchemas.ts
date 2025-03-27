
import { z } from 'zod';

// Schema for user data (step 1)
export const userDataSchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório (mínimo 3 caracteres)'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
  companyName: z.string().min(2, 'Nome da empresa é obrigatório'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  address: z.string().min(5, 'Endereço é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado é obrigatório'),
  postalCode: z.string().min(8, 'CEP inválido'),
  contactPhone: z.string().min(10, 'Telefone inválido'),
  marketSegment: z.string().min(1, 'Segmento é obrigatório'),
  customSegment: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Schema for plan selection (step 2)
export const planSelectionSchema = z.object({
  selectedProducts: z.array(z.string()).min(1, 'Selecione pelo menos um produto'),
  marketSegment: z.string().optional(),
  customSegment: z.string().optional(),
});

// Types based on schemas
export type UserDataFormValues = z.infer<typeof userDataSchema>;
export type PlanSelectionFormValues = z.infer<typeof planSelectionSchema>;
