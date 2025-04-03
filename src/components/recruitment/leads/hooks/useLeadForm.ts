
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { leadFormSchema, LeadFormValues } from '../types/leadForm';
import { useCallback } from 'react';
import { mockLeadsData } from '../data/mockLeadsData';

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
      name: child.name || '',   // Ensure required properties have default values
      age: child.age || '',
      grade: child.grade || '',
    })) || [];
    
    // Update the mock data array - fixing by adding the missing required properties
    const newLead = {
      id: result.id,
      name: result.parentName,
      email: result.email,
      phone: result.phone,
      course: result.course,
      children: childrenData.length || 0,
      _childrenData: childrenData, // Now properly typed with required fields
      channel: result.channel,
      stage: "Contato Inicial",
      status: "Novo",
      createdAt: createdAt, // Use consistent ISO format for dates
      notes: result.observations || "",
      enrollmentIntention: result.enrollmentIntention || "",
      contactTime: result.contactTime || ""
    };
    
    // Add to mock data
    mockLeadsData.push(newLead);
    
    console.log('Lead salvo com sucesso:', result);
    return newLead;
  };

  return { form, onSubmit, resetForm };
};
