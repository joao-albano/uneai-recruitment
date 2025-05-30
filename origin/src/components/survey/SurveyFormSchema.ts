
import { z } from 'zod';

export const formSchema = z.object({
  studentId: z.string().min(1, { message: 'Selecione um aluno' }),
  studentName: z.string().min(1, { message: 'Nome do aluno é obrigatório' }),
  parentName: z.string().min(1, { message: 'Nome do responsável é obrigatório' }),
  parentContact: z.string().min(1, { message: 'Contato do responsável é obrigatório' }),
  movedRecently: z.boolean().default(false),
  bullyingConcerns: z.boolean().default(false),
  socialIntegration: z.number().min(1).max(5),
  transportationIssues: z.enum(['none', 'sometimes', 'frequent']),
  additionalNotes: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
