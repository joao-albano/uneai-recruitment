
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { leadFormSchema, LeadFormValues } from '../types/leadForm';

export const useLeadForm = () => {
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

  // Função chamada ao submeter o formulário
  const onSubmit = (data: LeadFormValues) => {
    console.log(data);
    return data;
  };

  return { form, onSubmit };
};
