
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useData, DataProvider } from '@/context/DataContext';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CallToAction from '@/components/home/CallToAction';
import Footer from '@/components/home/Footer';

const IndexContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  const { toast } = useToast();
  
  useEffect(() => {
    if (students.length === 0) {
      toast({
        title: 'Bem-vindo ao Une.AI EduCare',
        description: 'Sistema de prevenção à evasão escolar com inteligência artificial.',
      });
    }
  }, [students.length, toast]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      <HeroSection generateDemoData={generateDemoData} />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <DataProvider>
      <IndexContent />
    </DataProvider>
  );
};

export default Index;
