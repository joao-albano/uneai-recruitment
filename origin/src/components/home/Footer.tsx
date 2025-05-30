
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 px-4 md:px-6 border-t">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            U
          </div>
          <p className="text-sm font-medium">
            Une.AI EduCare &copy; {new Date().getFullYear()}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Sistema de prevenção à evasão escolar com inteligência artificial
        </p>
      </div>
    </footer>
  );
};

export default Footer;
