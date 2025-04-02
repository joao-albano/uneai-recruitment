
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { leadFormSchema, LeadFormValues } from '../types/leadForm';
import { useEffect } from 'react';
import { mockLeadsData } from '../data/mockLeadsData';
import { format } from 'date-fns';

const defaultValues = {
  parentName: "",
  email: "",
  phone: "",
  channel: "",
  course: "",
  status: "Novo",
  children: [],
  observations: "",
  enrollmentIntention: "",
  contactTime: "",
  requiresChildrenInfo: false,
};

export const useLeadForm = () => {
  // Configure form with react-hook-form
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  });

  // Reset the form when opened
  useEffect(() => {
    form.reset(defaultValues);
  }, [form.reset]);

  // Handle form submission
  const onSubmit = (data: LeadFormValues) => {
    console.log('Dados do formulário submetidos:', data);
    
    // Here we would send data to the API in a real implementation
    
    // Create current date in ISO format but formatted properly for display
    const now = new Date();
    const createdAt = now.toISOString();
    
    // Return processed data with mock ID and timestamp
    const result = {
      ...data,
      id: Math.floor(Math.random() * 10000), // Simulate generated ID
      createdAt: createdAt,
    };
    
    // Update the mock data array - fixing by adding the missing required properties
    mockLeadsData.push({
      id: result.id,
      name: result.parentName,
      email: result.email,
      phone: result.phone,
      course: result.course,
      children: result.children?.length || 0,
      channel: result.channel,
      stage: "Contato Inicial",
      status: "Novo",
      createdAt: createdAt, // Use consistent ISO format for dates
      notes: result.observations || ""
    });
    
    console.log('Lead salvo com sucesso:', result);
    return result;
  };

  return { form, onSubmit };
};
