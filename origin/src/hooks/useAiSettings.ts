
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { openAiFormSchema } from '@/components/settings/schemas';
import { RiskAlgorithmValues, defaultThresholds } from '@/components/settings/algorithm/RiskAlgorithmForm';
import { z } from 'zod';

export type OpenAiFormValues = z.infer<typeof openAiFormSchema>;

export const useAiSettings = () => {
  const { toast } = useToast();
  const [savedRiskValues, setSavedRiskValues] = useState<RiskAlgorithmValues | null>(null);
  const [savedOpenAiValues, setSavedOpenAiValues] = useState<OpenAiFormValues | null>(null);
  
  // Load saved settings
  useEffect(() => {
    // Load Risk Algorithm settings
    const savedRiskSettings = localStorage.getItem('riskAlgorithmSettings');
    if (savedRiskSettings) {
      try {
        const parsed = JSON.parse(savedRiskSettings);
        setSavedRiskValues(parsed);
      } catch (error) {
        console.error('Error parsing saved risk settings:', error);
      }
    }
    
    // Load OpenAI settings
    const savedOpenAi = localStorage.getItem('openAiSettings');
    if (savedOpenAi) {
      try {
        const parsed = JSON.parse(savedOpenAi);
        setSavedOpenAiValues(parsed);
      } catch (error) {
        console.error('Error parsing saved OpenAI settings:', error);
      }
    }
  }, []);
  
  // Save Risk Algorithm settings
  const saveRiskSettings = (values: RiskAlgorithmValues) => {
    localStorage.setItem('riskAlgorithmSettings', JSON.stringify(values));
    setSavedRiskValues(values);
    
    toast({
      title: 'Algorithm settings saved',
      description: 'Risk algorithm parameters have been successfully updated',
    });
    console.log('Updated algorithm parameters:', values);
  };
  
  // Save OpenAI settings
  const saveOpenAiSettings = (values: OpenAiFormValues) => {
    localStorage.setItem('openAiSettings', JSON.stringify(values));
    setSavedOpenAiValues(values);
    
    toast({
      title: 'OpenAI settings saved',
      description: 'OpenAI API settings have been successfully updated',
    });
    console.log('Updated OpenAI settings:', values);
  };
  
  return {
    savedRiskValues,
    savedOpenAiValues,
    saveRiskSettings,
    saveOpenAiSettings,
    defaultThresholds,
  };
};
