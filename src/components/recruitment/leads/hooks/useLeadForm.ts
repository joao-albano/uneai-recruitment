
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { leadFormSchema, LeadFormValues } from '../types/leadForm';
import { useCallback } from 'react';
import { mockLeadsData } from '../data/mockLeadsData';

const defaultValues: LeadFormValues = {
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
  institutionType: "school",
  
  // Novos campos
  studentName: "",
  studentPhone: "",
  studentEmail: "",
  parentCPF: "",
  parentEmail: "",
  cpf: "",
  campus: "",
  modality: "",
  period: "",
  cep: "", // Adicionando valor padrão para o campo CEP
};

export const useLeadForm = () => {
  // Configure form with react-hook-form
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues,
  });

  // Reset form function
  const resetForm = useCallback(() => {
    form.reset(defaultValues);
  }, [form]);

  // Handle form submission
  const onSubmit = (data: LeadFormValues) => {
    console.log('Dados do formulário submetidos:', data);
    
    // Create current date in ISO format
    const now = new Date();
    const createdAt = now.toISOString();
    
    // Return processed data with mock ID and timestamp
    const result = {
      ...data,
      id: Math.floor(Math.random() * 10000), // Simulate generated ID
      createdAt: createdAt,
    };
    
    // Make sure each child has all required properties
    const childrenData = data.children?.map(child => ({
      name: child.name || '',
      age: child.age || '',
      grade: child.grade || '',
    })) || [];
    
    // Determine which name field to use
    const displayName = data.institutionType === 'school' 
      ? (data.studentName || data.parentName) // For school: student name or parent name
      : data.parentName; // For university: parent name (which is the interested person)
    
    // Update the mock data array - fixing by adding the missing required properties
    const newLead = {
      id: result.id,
      name: displayName,
      email: data.email,
      phone: data.phone,
      course: data.course,
      children: childrenData.length || 0,
      _childrenData: childrenData,
      channel: data.channel,
      stage: "Contato Inicial",
      status: "Novo",
      createdAt: createdAt,
      notes: data.observations || "",
      enrollmentIntention: data.enrollmentIntention || "",
      contactTime: data.contactTime || "",
      
      // Novos campos para upload
      institutionType: data.institutionType,
      studentName: data.studentName || "",
      studentPhone: data.studentPhone || "",
      studentEmail: data.studentEmail || "",
      parentCPF: data.parentCPF || "",
      parentEmail: data.parentEmail || "",
      cpf: data.cpf || "",
      campus: data.campus || "",
      modality: data.modality || "",
      period: data.period || "",
      cep: data.cep || "", // Adicionando o campo CEP para salvar
    };
    
    // Add to mock data
    mockLeadsData.push(newLead);
    
    console.log('Lead salvo com sucesso:', result);
    return newLead;
  };

  return { form, onSubmit, resetForm };
};
