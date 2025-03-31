
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { leadFormSchema, LeadFormValues } from '../types/leadForm';
import { useEffect } from 'react';

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
      observations: "",
      enrollmentIntention: "",
      contactTime: "",
    },
  });

  // Asseguramos de resetar o formulário quando for aberto
  useEffect(() => {
    form.reset({
      parentName: "",
      email: "",
      phone: "",
      channel: "",
      course: "",
      status: "Novo",
      children: [
        { name: "", age: "", grade: "" }
      ],
      observations: "",
      enrollmentIntention: "",
      contactTime: "",
    });
  }, [form.reset]);

  // Função chamada ao submeter o formulário
  const onSubmit = (data: LeadFormValues) => {
    console.log('Dados do formulário submetidos:', data);
    // Aqui iríamos enviar os dados para a API em uma implementação real
    
    // Retornar os dados processados
    return {
      ...data,
      id: Math.floor(Math.random() * 10000), // Simula ID gerado
      createdAt: new Date().toISOString(),
    };
  };

  return { form, onSubmit };
};
