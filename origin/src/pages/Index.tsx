
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useData, DataProvider } from '@/context/DataContext';
import { useProduct } from '@/context/product';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CallToAction from '@/components/home/CallToAction';

const IndexContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  const { toast } = useToast();
  const { setCurrentProduct } = useProduct();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  // Set current product to retention
  useEffect(() => {
    setCurrentProduct('retention');
  }, [setCurrentProduct]);
  
  useEffect(() => {
    if (students.length === 0) {
      toast({
        title: 'Bem-vindo ao Une.AI EduCare',
        description: 'Sistema de prevenção à evasão escolar com inteligência artificial.',
      });
    }
  }, [students.length, toast]);

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="w-full">
        <HeroSection generateDemoData={generateDemoData} />
        <FeaturesSection />
        <CallToAction />
      </div>
    </Layout>
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
