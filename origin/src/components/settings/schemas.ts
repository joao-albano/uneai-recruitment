
import { z } from 'zod';

export const openAiFormSchema = z.object({
  apiKey: z.string().min(1, { message: 'API Key é obrigatória' }),
  model: z.string().min(1, { message: 'Modelo é obrigatório' }),
});

export const webhookFormSchema = z.object({
  url: z.string().url({ message: 'URL inválida' }),
  description: z.string().optional(),
  enabled: z.boolean().default(true),
});

export type WebhookType = {
  id: string;
  url: string;
  description: string;
  enabled: boolean;
};
