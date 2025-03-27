
import { z } from 'zod';
import { isValidCNPJ } from '@/utils/formatters';

// Schema for user and company data (first step)
export const userDataSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  companyName: z.string().min(3, 'O nome da empresa deve ter pelo menos 3 caracteres'),
  cnpj: z.string()
    .min(14, 'CNPJ inválido')
    .max(18, 'CNPJ inválido')
    .refine(val => isValidCNPJ(val), 'CNPJ em formato inválido'),
  address: z.string().min(5, 'Endereço muito curto'),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().length(2, 'Use a sigla do estado (2 letras)'),
  postalCode: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'),
  contactPhone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  marketSegment: z.string().min(1, 'Selecione um segmento'),
  customSegment: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
}).refine(
  (data) => data.marketSegment !== 'other' || (data.marketSegment === 'other' && data.customSegment && data.customSegment.length >= 3),
  {
    message: "Especifique o segmento com pelo menos 3 caracteres",
    path: ["customSegment"],
  }
);

// Schema for product selection (second step)
export const planSelectionSchema = z.object({
  selectedProducts: z.array(z.string()).min(1, 'Selecione pelo menos um produto')
});

export type UserDataFormValues = z.infer<typeof userDataSchema>;
export type PlanSelectionFormValues = z.infer<typeof planSelectionSchema>;
